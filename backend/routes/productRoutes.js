const router = require("express").Router();
const { getAllProducts, updateProduct, createProduct, deleteProduct, getProductDetails, createReviwe } = require("../controller/productController");
const { isAuthenticateUser, authorisedRoles } = require("../middleware/auth");


// route for get all products
router.get("/products",isAuthenticateUser, getAllProducts)

// route for get any product Details using product id
router.get("/product/:id",isAuthenticateUser, getProductDetails)

// route for create a product
router.post("/product/new", isAuthenticateUser, authorisedRoles("admin"), createProduct)

// route for update to selected product
router.put("/product/:id", isAuthenticateUser, authorisedRoles("admin"), updateProduct)

// route for delete to selected product
router.delete("/product/:id", isAuthenticateUser,authorisedRoles(), deleteProduct)

router.put("/review",isAuthenticateUser, createReviwe);

module.exports = router;