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
    user.normalize();

    res.status(201).json({
        success : true,
        message : "user successully created",
        user
    })
})


module.exports = {
    registerUser
}