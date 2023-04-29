const catchAsyncError = require("./catchAsyncError");
const userSchema = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/getToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");



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

const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await userSchema.findOne({ email });

    // check user available or not
    if (!user) {
        return next(new ErrorHandler("User not found!", 404));
    }

    // external function
    const resetToken = await user.getPasswordResetToken(user);

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your Ecommerse password recovery token is :- \n\n${resetPasswordUrl}\n\nIf you are not requested this email then, ignore it.`

    try {
        sendEmail({
            email: user.email,
            subject: `Ecommerse password recovery!`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Password Recovery email sent to ${user.email}`
        })
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }

})


// reset password using token

const resetPassword = catchAsyncError(async (req, res, next) => {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userSchema.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gte: Date.now() }
    })


    if (!user) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler("Ivalid token or has been expired"))
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("password does not matched!", 400));
    }

    user.password = password;
    user.updatedAt = Date.now();
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false })

    sendToken(user, 200, res)

})


// get user info by logged user

const getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await userSchema.findById(req.user._id)

    res.status(200).json({
        success: true,
        user
    })
})



// update password by user using old password

const updatePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await userSchema.findById(req.user._id).select("+password")

    const isMatchedPassword = await user.comparePassword(oldPassword)
    if (!isMatchedPassword) {
        return next(new ErrorHandler("Old password is incorrect!", 401))
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("Password does not matched!", 400))
    }

    user.password = newPassword;

    await user.save();

    sendToken(user, 200, res);
})


// update profile by logged user

const updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        email: req.body.email,
        name: req.body.name
    }

    await userSchema.findByIdAndUpdate(req.user._id, newUserData)

    res.status(200).json({
        success: true,
        message: "Profile updated successfully!"
    })

})


const getAllUsers = catchAsyncError(async (req, res, next)=>{
    const allUsers = await userSchema.find();
    res.status(200).json({
        success : true,
        allUsers
    })
})


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile
}