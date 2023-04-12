const express = require("express");
const app = express();


// import routes

const productRoutes = require("./routes/productRoutes");


// use middleware
app.use(express.json())

app.use("/api/v1", productRoutes)

module.exports = app;