const express = require("express");
const Joi = require("joi"); // package for validation
const { required, error } = require("joi/lib/types/lazy");
const mongoose = require("mongoose");

const router = express.Router();

const categorySchema = new mongoose.Schema({
	name: { type: String, required: true, minlength: 3, maxlength: 30 },
});

const Category = mongoose.model("Category", categorySchema);

// const categories = [
// 	{ id: 1, name: "Web" },
// 	{ id: 2, name: "Blockchain" },
// 	{ id: 3, name: "Artificial Tech" },
// 	{ id: 4, name: "Photography" },
// ];

// Get all categories
router.get("/api/categories", async (req, res) => {
	let categories = await Category.find();
	res.json(categories);
});

// Get course by id
router.get("/api/categories/:id", async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) return res.status(404).send("Category not found");
		res.json(category);
	} catch (err) {
		res.status(400).send("Invalid ID format");
	}
});

// Add a new course
router.post("/api/categories", async (req, res) => {
	const { error } = validateData(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const category = new Category({
		name: req.body.name,
	});
	await category.save();
	res.send(category); // return the new category
});

// Update an existing category
router.put("/api/categories/:id", async (req, res) => {
	const { error } = validateData(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			{ name: req.body.name },
			{ new: true, runValidators: true } // returns updated doc + enforces mongoose schema rules
		);

		if (!category) return res.status(404).send("Category not found");

		res.send(category);
	} catch (err) {
		res.status(400).send("Invalid ID format");
	}
});

// delete a course
router.delete("/api/categories/:id", async (req, res) => {
	const category = await Category.findByIdAndDelete(req.params.id);
	if (!category) return res.status(404).send("Category not found");
	res.send(category);
});

function validateData(category) {
	const schema = {
		name: Joi.string().min(2).required(),
	};

	return Joi.validate(category, schema);
}

module.exports = router;
