const server = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// env file configuration
dotenv.config({path : "backend/config/config.env"});


// connect to the database
mongoose.connect(process.env.DB_URL).then((data)=>{
    console.log("Database successfully connected with the server")
}).catch((err)=>{
    console.log(err)
})


server.listen(process.env.PORT, (req, res)=>{
    console.log(`server is listening on http://localhost:${process.env.PORT}`)
})