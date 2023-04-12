const ProductSchema = require("../model/productModel");

const getAllProducts = async (req, res)=>{
    
    const productCollection = await ProductSchema.find()
    res.status(200).json({
        success : true,
        message : "Data Found!",
        data : productCollection
    })
}


const createProduct = async (req, res)=>{
    console.log(req.body)

    const collection = new ProductSchema(req.body);
    const product = await collection.save();

    res.status(200).json({
        success : true,
        message : "product created",
        data : product
    })
}

const updateProduct = (req, res)=>{
    console.log(req.body)
    res.status(200).json({
        success : true,
        message : "product found",
        request : "put request"
    })
}

const deleteProduct = (req, res)=>{
    console.log(req.body)
    res.status(200).json({
        success : true,
        message : "product found",
        request : "delete request"
    })
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}