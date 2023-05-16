const router = require("express").Router();
const { getAllProducts, updateProduct, createProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteProductReview } = require("../controller/productController");
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

// routes for create product review
router.put("/review",isAuthenticateUser, createProductReview);

// routes for get all product review
router.get("/reviews/",getAllReviews)

// routers for delete product review by logged user
router.delete("/reviews", isAuthenticateUser, deleteProductReview);




module.exports = router;