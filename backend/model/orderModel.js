const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        dist: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        phoneNum: {
            type: Number,
            required: true
        },
    },
    orderInfo: [
        {
            productId: {
                type: mongoose.Schema.objectId,
                ref: "Product",
                required: true,
            },
            productName : {
                type : String,
                required : true
            },
            price : {
                type : Number,
                require : true
            },
            quantity : {
                type : Number,
                required : true
            },
            image : {
                type : String,
                required : true
            }

        }
    ],
    user : {
        type : mongoose.Schema.objectId,
        ref : "User",
        required : true
    },
    paymentInfo: {
        id: {
            type : String,
            required : true
        },
        status: {
            type : String,
            required : true
        }
    },
    paidAt : {
        type : Date,
        required : true
        
    },
    itemsPrice : {
        type : Number,
        default : 0,
        required : true
    },
    taxPrice : {
        type : Number,
        default : 0,
        required : true
    },
    shippingPrice :{
        type :Number,
        required : true,
        default : 0
    },
    totalPrice :{
        type : Number,
        required : true,
        default : 0
    },
    orderStatus : {
        type : String,
        required : true
    },
    deleveredAt : Date,
    createdAt : {
        type : Date,
        default : Date.now,
        
    }


})


module.exports = mongoose.model("Order", orderSchema)