const mongoose = require("mongoose");


const connectDb = () => {   
    mongoose.connect(process.env.DB_URL).then((data) => {
        console.log("Database successfully connected with the server")
    })

}


module.exports = connectDb;