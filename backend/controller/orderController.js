
const orderSchema = require("../model/orderModel.js");
const productSchema = require("../model/productModel.js");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeachers = require("../utils/apifeachers");
const catchAsyncError = require("./catchAsyncError");

// function for create new order
const newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    const order = await orderSchema.create({
        shippingInfo,
        orderItems,
        user: req.user._id,
        paymentInfo,
        paidAt: Date.now(),
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    })

    const orderRes = await order.save();

    res.status(201).json({
        success: true,
        message: "successfully created order!",
        orderRes
    })


})

// see all order by logged user
const getMyOrders = catchAsyncError(async (req, res, next) => {
    const orders = await orderSchema.find({ user: req.user._id })
    if (!orders) {
        return next(new ErrorHandler("No any order avaible", 404));
    }

    res.status(200).json({
        success: true,
        orders
    })
})


// see all order by admin 
const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await orderSchema.find();

    if (!orders) {
        return next(new ErrorHandler("No any order available", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount = totalAmount + order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// see single order by admin
const getOrderInfo = catchAsyncError(async (req, res, next) => {
    const order = await orderSchema.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("Order not awailable with this user", 400))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// update order status
const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await orderSchema.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("Order not found!", 404))
    }


    // if order already delivered
    if (order.orderStatus === "delevered") {
        return next(new ErrorHandler("You have allready delevered this order", 400))
    }
    
    // if order shipped
    if (req.body.status === "shipped") {
        order.orderItems.forEach(async (order) => {
            await updateStock(order.productId, order.quantity)
        })
    }

    // update the order status
    order.orderStatus = req.body.status;
    
    if (req.body.status === "delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({
        validateBeforeSave: false
    })

    res.status(200).json({
        success: true
    })
})

// external function for update the stock of products
async function updateStock(id, quantity) {
    const product = await productSchema.findById(id);
    product.stock = product.stock - quantity;

    await product.save({
        validateBeforeSave: false
    })

}



// delete order
const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await orderSchema.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("order not found!", 404));
    }
    await orderSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Order successfully deleted"
    })
})



module.exports = {
    newOrder,
    getMyOrders,
    getAllOrders,
    getOrderInfo,
    updateOrder,
    deleteOrder
}