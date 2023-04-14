const express = require("express");
const app = express();




app.get("/", (req, res, next) => {
    next(new Error("this is custom error"))
})


app.use((err, req, res, next) => {
    res.status(400).json({
        message: err.message
    })
})


app.listen(4000, () => {
    console.log(`Server is listening`);
})