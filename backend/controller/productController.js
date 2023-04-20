
const ProductSchema = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeachers = require("../utils/apifeachers");
const catchAsyncError = require("./catchAsyncError");


// controlles for fetch all product
const getAllProducts = catchAsyncError(async (req, res) => {

    // count total listing products
    const productCount = await ProductSchema.countDocuments();

    const resultPerPage = 5
    
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
        success : true,
        message : "Product successfully created!"
    })

})

// controlles for fetch update a selected product
const updateProduct =catchAsyncError( async (req, res) => {
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

module.exports = {
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct
}