const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/Error");

// import routes

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");


// use middleware
app.use(express.json())

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

// middleware for error

app.use(errorMiddleware);

module.exports = app;