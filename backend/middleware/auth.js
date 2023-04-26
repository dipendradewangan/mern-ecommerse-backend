const catchAsyncError = require("../controller/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userModel");

// user loged in then work any modules
const isAuthenticateUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login first to access this resource"), 401);
    }

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userSchema.findById(decodedData.id)
    next();
})


// user any specific roles then work any module
const authorisedRoles = (...roles)=>{

    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resourse!`, 401))
        }
        
        next();
    }
}




module.exports = {
    isAuthenticateUser,
    authorisedRoles
}; 