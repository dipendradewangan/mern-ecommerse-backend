const catchAsyncError = require("./catchAsyncError");
const userSchema = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/getToken");



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

    sendToken(user, 201, res)
})


// login user

const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter email or password", 400));
    }

    const user = await userSchema.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isMatchedPassword = await user.comparePassword(password);
    if (!isMatchedPassword) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res)
})


// logut route
const logoutUser = catchAsyncError((req, res, next) => {


    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true

    })


    res.status(200).json({
        success: true,
        message: "Loged out!"
    })
})


// forget password coding start

const forgotPassword = async (req, res, next) => {

    const { email } = req.body;
    console.log(email)

    const user = await userSchema.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const token = user.getResetPasswordToken();

    const userRes = await user.save({ validateBeforeSave: false })
    
    console.log(userRes)

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword
}