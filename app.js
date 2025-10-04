const express = require("express");
const categories = require("./routes/categories");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODBURL;
mongoose
	.connect(mongoDbUrl)
	.then(() => {
		console.log("Connection successful");
	})
	.catch((e) => console.error("Couldn't connect to database", e));

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(categories);

app.listen(port, () => console.log(`Server running on port ${port}`));
