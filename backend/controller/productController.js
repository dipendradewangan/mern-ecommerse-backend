const getAllProducts = (req, res)=>{
    console.log(req.body)
    res.status(200).json({
        success : true,
        message : "product found",
        request : "put request"
    })
}


const createProduct = (req, res)=>{
    console.log(req.body)
    res.status(200).json({
        success : true,
        message : "product found",
        request : "delete request"
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