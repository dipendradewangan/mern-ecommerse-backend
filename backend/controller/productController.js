
const ProductSchema = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");


// controlles for fetch all product
const getAllProducts = async (req, res) => {

    const productCollection = await ProductSchema.find()
    res.status(200).json({
        success: true,
        message: "Data Found!",
        data: productCollection
    })
}

// get product details
const getProductDetails = async (req, res, next) => {
    const id = req.params.id;
    const product = await ProductSchema.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 404));
    }

    res.status(200).json({
        success : true,
        data : product
    })
}



// controlles for fetch create a product
const createProduct = async (req, res) => {
    const collection = new ProductSchema(req.body);
    try {
        const product = await collection.save();
        res.status(201).json({
            success: true,
            message: "Product created!",
            data: product
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

// controlles for fetch update a selected product
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = await ProductSchema.findById(id)

    if (!product) {

        res.status(404).json({
            success: false,
            message: "product not found",
        })
    }

    const updatedProduct = await ProductSchema.findByIdAndUpdate(id, req.body)
    res.status(200).json({
        success: true,
        message: "Product successfully updated",
        data: updatedProduct
    })

}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await ProductSchema.findById(id)

    if (!product) {

        res.status(404).json({
            success: false,
            message: "product not found",
        })
    }

    const deletedProduct = await ProductSchema.findByIdAndDelete(id, req.body)
    res.status(200).json({
        success: true,
        message: "Product successfully deleted",
        data: deletedProduct
    })

}

module.exports = {
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct
}