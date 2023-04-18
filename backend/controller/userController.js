const catchAsyncError = require("./catchAsyncError");
const userSchema = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
// const { response } = require("express");



// Register a user
const registerUser = catchAsyncError(async (req, res, next)=>{
    const {name, email, password} = req.body;
    const user = await userSchema.create({
        name,
        email,
        password,
        avatar : {
            public_id : "this is sample id",
            url : "profileUrl"
        }
    });
    const token = user.getUserToken();
    console.log(token)

    res.status(201).json({
        success : true,
        message : "user successully created",
        token
    })
})


module.exports = {
    registerUser
}