const catchAsyncError = require("../controller/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userModel");


const isAuthenticateUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login first to access this resource"), 401);
    }

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userSchema.findById(decodedData.id)
    next();
})

module.exports = isAuthenticateUser; 