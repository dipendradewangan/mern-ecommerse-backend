const catchAsyncError = require("./catchAsyncError");
const userSchema = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler")



// Register a user

const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await userSchema.create({
        name,
        email,
        password,
        avatar: {
            public_id: "THis is a sample id",
            url: "avatarUrl"
        }
    })

    
    // console.log(details);
    res.status(201).json({
        success: true,
        message: "User successfully created",
        user
    })
})



module.exports = {
    registerUser
}