const ErrorHandler = require("../utils/ErrorHandler");

const errorMiddleware = (err, req, res, next)=>{
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    // wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resorse not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }


    // wrong mongodb duplicate key error
    if(err.code === 11000){
        const message = `Dublicate ${Object.keys(err.keyValue)} entrered!`
        err = new ErrorHandler(message, 400);
    }

    // wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid, Try again!`
        err = new ErrorHandler(message, 400)
    }

    
    // JWT Expire error
    if(err.name === "TokenExpireError"){
        const message = `Json web token is Expire, Try again!`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}


module.exports = errorMiddleware;