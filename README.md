Express + MongoDB Categories API

A small RESTful API built with Express and MongoDB (Mongoose) that provides CRUD operations for a simple Category resource. This repository demonstrates a minimal structure for an API using express, mongoose, and joi for request validation.

## What this project is

-   A lightweight Node.js API exposing endpoints under /api/categories.
-   Uses mongoose to define a Category model (name field) and persist data to MongoDB.
-   Uses joi for basic request validation in the route handlers.
-   Entry point: app.js. Routes are defined in routes/categories.js.

## How it works (quick overview)

-   app.js loads environment variables, connects to MongoDB using MONGODBURL, sets up JSON body parsing and mounts the categories router.
-   routes/categories.js defines a Mongoose Category schema and implements CRUD routes:
    -   GET /api/categories — list all categories
    -   GET /api/categories/:id — get category by id
    -   POST /api/categories — create a new category (validates with Joi)
    -   PUT /api/categories/:id — update a category (validates with Joi)
    -   DELETE /api/categories/:id — delete a category
-   Validation errors return status 400; missing resources return 404.

## Quick setup

Prerequisites:

-   Node.js (>= 14 recommended)
-   npm
-   A running MongoDB instance (local or Atlas)

Steps:

1. Clone the repo and change into the project folder

    git clone <repo-url>
    cd project

2. Install dependencies

    npm install

3. Create a .env file in the project root with at least the MongoDB connection string

    MONGODBURL=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/mydb
    PORT=3000 # optional

4. Start the server

    # Run directly

    node app.js

    # Or, if you have nodemon installed globally/dev, use:

    npx nodemon app.js

By default the app listens on process.env.PORT or 3000.

Note: package.json currently does not include a start script — you can add one ("start": "node app.js") for convenience.

## Usage examples

List all categories

    curl -s http://localhost:3000/api/categories

Create a category

    curl -X POST http://localhost:3000/api/categories \
      -H "Content-Type: application/json" \
      -d '{"name":"Web Development"}'

Get a category by id

    curl http://localhost:3000/api/categories/<id>

Update a category

    curl -X PUT http://localhost:3000/api/categories/<id> \
      -H "Content-Type: application/json" \
      -d '{"name":"New Name"}'

Delete a category

    curl -X DELETE http://localhost:3000/api/categories/<id>

## Validation and errors

-   The route handlers use joi to validate request bodies. Validation failures return 400 and include the Joi message.
-   If an invalid MongoDB ObjectId is provided, the routes return 400 with the message Invalid ID format.
-   If the requested category is not found, the API returns 404.

## Suggestions & next steps

Here are some practical improvements you can add:

-   Add scripts in package.json:
    -   start (node app.js)
    -   dev (nodemon)
-   Add centralised error-handling middleware to reduce repeated try/catch logic.
-   Add request logging (morgan or pino) and structured logging.
-   Add CORS handling (if serving a frontend).
-   Replace deprecated Joi API usage (project currently calls Joi.validate) with newer schema.validate(value) style.
-   Add authentication/authorization (JWT, sessions) to protect write endpoints.
-   Add unit and integration tests (Jest, Supertest) for the routes and model.
-   Add pagination, filtering and sorting to the GET list endpoint.
-   Add Dockerfile and docker-compose for a reproducible dev environment with MongoDB.
-   Add OpenAPI/Swagger documentation for the API.

## Files of interest

-   app.js — application entrypoint, connects to MongoDB and mounts routes.
-   routes/categories.js — route handlers and Mongoose model.
-   package.json — project dependencies.

## License

This project has no license specified. Add a LICENSE file or include a license field in package.json if you plan to share it publicly.

---

If you want, I can also add a start script to package.json, include Docker support, or add a basic test suite — tell me which you'd like and I'll implement it.
