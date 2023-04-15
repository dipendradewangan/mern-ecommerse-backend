const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");


const newUser = catchAsyncError(async (req, res, next) => {
    const data = {
        name : "dipendra",
        email : "dipendra@gmail.com"
    }

    const user = userModel.findOne({email : data.email});

    if(user){
        return next(new ErrorHandler("User already Existed", 400))
    }

    await userModel.create(data)
    res.status(201).json({
        success : true,
        message : "User created successfully"
    })  
    
})


module.exports = {
    newUser
}