const catchAsyncError = require("./catchAsyncError");
const userSchema = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
// const { response } = require("express");



// Register a user
const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await userSchema.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is sample id",
            url: "profileUrl"
        }
    });
    const token = user.getUserToken();
    console.log(token)

    res.status(201).json({
        success: true,
        message: "user successully created",
        token
    })
})


// login user

const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter email or password", 400));
    }

    const user = await userSchema.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isMatchedPassword = await user.comparePassword(password);
    if(!isMatchedPassword){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = user.getUserToken();

    res.status(200).json({
        success : true,
        token
    })
})

module.exports = {
    registerUser,
    loginUser
}