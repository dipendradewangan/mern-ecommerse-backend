const router = require("express").Router();
const { getAllProducts, updateProduct, createProduct, deleteProduct, getProductDetails } = require("../controller/productController");
const { isAuthenticateUser, authorisedRoles } = require("../middleware/auth");


// route for get all products
router.get("/products", isAuthenticateUser, authorisedRoles("admin",), getAllProducts)

// route for get any product Details using product id
router.get("/product/:id", getProductDetails)

// route for creat a product
router.post("/product/new", isAuthenticateUser, authorisedRoles(), createProduct)

// route for update to selected product
router.put("/product/:id", isAuthenticateUser, authorisedRoles(), updateProduct)

// route for delete to selected product
router.delete("/product/:id", isAuthenticateUser,authorisedRoles(), deleteProduct)

module.exports = router;