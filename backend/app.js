const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error.js");

// import routes

const productRoutes = require("./routes/productRoutes");


// use middleware
app.use(express.json())

app.use("/api/v1", productRoutes)

// middleware for error
app.use(errorMiddleware)

module.exports = app;