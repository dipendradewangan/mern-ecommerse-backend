
const ProductSchema = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeachers = require("../utils/apifeachers");
const catchAsyncError = require("./catchAsyncError");


// controlles for fetch all product
const getAllProducts = catchAsyncError(async (req, res) => {

    // count total listing products
    const productCount = await ProductSchema.countDocuments();

    const resultPerPage = 10

    const apiFeacher = new ApiFeachers(ProductSchema.find(), req.query).search().filter().pagination(resultPerPage);

    const productCollection = await apiFeacher.query;

    res.status(200).json({
        success: true,
        message: "Data Found!",
        productCount,
        productCollection
    })
})

// get product details
const getProductDetails = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const product = await ProductSchema.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 404));
    }

    res.status(200).json({
        success: true,
        data: product
    })
})



// controlles for fetch create a product
const createProduct = catchAsyncError(async (req, res, next) => {


    // insert details of product creater using logged user 
    req.body.createdBy = req.user._id

    const product = await ProductSchema.create(req.body)


    res.status(201).json({
        success: true,
        message: "Product successfully created!"
    })

})

// controlles for fetch update a selected product
const updateProduct = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const product = await ProductSchema.findById(id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    // insert name and time into the updatedBy using logged user name
    req.body.updatedAt = Date.now();
    req.body.updatedBy = req.user._id

    const updatedProduct = await ProductSchema.findByIdAndUpdate(id, req.body)
    res.status(200).json({
        success: true,
        message: "Product successfully updated",
        data: updatedProduct
    })

})

const deleteProduct = catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const product = await ProductSchema.findById(id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    const deletedProduct = await ProductSchema.findByIdAndDelete(id, req.body)
    res.status(200).json({
        success: true,
        message: "Product successfully deleted",
        data: deletedProduct
    })

})


const createReviwe = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await ProductSchema.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
    console.log(isReviewed)


    if (isReviewed) {
        console.log("product already reviewed!");

        // loop for all reviews iteration
        product.reviews.forEach((rev) => {

            // find exact reviewed user even he is already logged in
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating
                rev.comment = comment
            }
        })
    }

    else {
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length;
    }

    // calculation for rating updation 
    let totalRatings = 0;
    product.reviews.forEach((rev) => {
        totalRatings = totalRatings + rev.rating;
    });
    product.rating = totalRatings / product.reviews.length;

    // command for update review
    const updatedReview = await product.save({
        validateBeforeSave: false
    })

    res.status(200).json({
        success: true,
        message: "successfully created reviews",
        updatedReview
    })

})

module.exports = {
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    createReviwe
}