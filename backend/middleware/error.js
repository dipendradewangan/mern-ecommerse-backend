const ErrorHandler = require("../utils/ErrorHandler");

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resorse not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}


module.exports = errorMiddleware;