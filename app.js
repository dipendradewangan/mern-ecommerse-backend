const express = require("express");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/error");
const connectDb = require("./config/database");
const app = express();
connectDb();

app.use("/errorHandling", userRoutes)


app.listen(4000, () => {
    console.log(`Server is listening`);
})

app.use(errorMiddleware)