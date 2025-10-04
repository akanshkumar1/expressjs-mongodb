const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    age: { type: Number, min: 0 },
    grade: { type: String },
    email: { type: String }
});

const Student = mongoose.model("Student", studentSchema);

// Get all students
router.get("/api/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Get student by id
router.get("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send("Student not found");
        res.json(student);
    } catch (err) {
        res.status(400).send("Invalid ID format");
    }
});

// Add a new student
router.post("/api/students", async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,
        email: req.body.email
    });

    await student.save();
    res.send(student);
});

// Update an existing student
router.put("/api/students/:id", async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                age: req.body.age,
                grade: req.body.grade,
                email: req.body.email
            },
            { new: true, runValidators: true }
        );

        if (!student) return res.status(404).send("Student not found");
        res.send(student);
    } catch (err) {
        res.status(400).send("Invalid ID format");
    }
});

// Delete a student
router.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).send("Student not found");
        res.send(student);
    } catch (err) {
        res.status(400).send("Invalid ID format");
    }
});

function validateStudent(student) {
    const schema = {
        name: Joi.string().min(2).required(),
        age: Joi.number().min(0).optional(),
        grade: Joi.string().optional(),
        email: Joi.string().email().optional()
    };

    return Joi.validate(student, schema);
}

module.exports = router;
