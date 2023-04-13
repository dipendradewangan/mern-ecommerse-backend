const router = require("express").Router();
const { getAllProducts, updateProduct, createProduct, deleteProduct, getProductDetails } = require("../controller/productController");


// route for get all products
router.get("/products", getAllProducts)

// route for get any product Details using product id
router.get("/product/:id", getProductDetails)

// route for creat a product
router.post("/product/new", createProduct)

// route for update to selected product
router.put("/product/:id", updateProduct)

// route for delete to selected product
router.delete("/product/:id", deleteProduct)

module.exports = router;