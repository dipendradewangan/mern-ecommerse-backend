const app = require("./app");
const dotenv = require("dotenv");
const connectDb = require("./config/database")



// Handling uncought exception
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to uncought exception");

    process.exit(1);
    
})


// env file configuration
dotenv.config({ path: "backend/config/config.env" });


// connecting to database
connectDb();

// server listening function
const server = app.listen(process.env.PORT, (req, res) => {
    console.log(`server is listening on http://localhost:${process.env.PORT}`)
})


// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
})