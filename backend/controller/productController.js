
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


const createProductReview = catchAsyncError(async (req, res, next) => {
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


// route for get reviews of a product
const getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await ProductSchema.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    res.status(200).json({
        success: true,
        ratings: product.rating,
        numberOfReviews: product.numberOfReviews,
        reviews: product.reviews
    })
})


// route for delete product review 
const deleteProductReview = catchAsyncError(async (req, res, next) => {
    const product = await ProductSchema.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("product not found!", 404));
    }

    // check logged user review available or not
    let reviews = ""

    const reviewedUser = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
    console.log(reviewedUser);
    // if (!reviewedUser) {
    //     return next(new ErrorHandler("Not any review to delete", 404));
    // }

    reviews = product.reviews.filter((rev) => rev.user.toString() !== req.user._id.toString());

    console.log(reviews)

    // setting average ratings
    let totalRatings = 0;
    console.log("first total rating:", totalRatings)
    product.reviews.forEach((rev) => {
        totalRatings = totalRatings + rev.rating;
    })

    console.log("second total rating:", totalRatings)

    const numberOfReviews = reviews.length;
    console.log(numberOfReviews)

    let rating = 0;
    if (reviews.length !== 0) {
        rating = totalRatings / reviews.length;
    }
    console.log(rating)

    const deletedReviews = await ProductSchema.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            rating,
            numberOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )

    res.status(200).json({
        success: true,
        message: "successfully deleted review!",
        deletedReviews
    })

})


module.exports = {
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getAllReviews,
    deleteProductReview
}