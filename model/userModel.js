const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter your name"]
    },
    email : {
        type : String,
        required : [true, "Please Enter your email"],
        unique :true
    }
})


module.exports = mongoose.model("User", userSchema);