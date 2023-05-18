
const orderSchema = require("../model/orderModel.js");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeachers = require("../utils/apifeachers");
const catchAsyncError = require("./catchAsyncError");

// function for create new order
const newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo,
        orderInfo,
        user,
        paymentInfo,
        paidAt,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    const order = await orderSchema.create({
        shippingInfo,
        orderInfo,
        user: req.user._id,
        paymentInfo,
        paidAt : Date.now(),
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    })

    const orderRes = await order.save();

    res.status(201).json({
        success : true,
        message : "successfully created order!",
        orderRes
    })


})

// see all order by logged user
const getMyOrders = catchAsyncError(async (req, res, next)=>{
    const orders = await orderSchema.find({user : req.user._id})
    if(!orders){
        return next(new ErrorHandler("No any order avaible", 404));
    }

    res.status(200).json({
        success : true,
        orders
    })
})


// see all order by admin 
const getAllOrders = catchAsyncError(async (req, res, next)=>{
    const orders = await orderSchema.find();
    
    if(!orders){
        return next(new ErrorHandler("No any order available",404));
    }


    res.status(200).json({
        success : true,
        orders
    })
})

// see single order by admin


module.exports = {
    newOrder,
    getMyOrders,
    getAllOrders
}