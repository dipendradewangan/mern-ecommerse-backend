const { newOrder, getMyOrders, getAllOrders } = require("../controller/orderController")
const { isAuthenticateUser, authorisedRoles } = require("../middleware/auth")

const router = require("express").Router()

// route for the create new order
router.post("/order/new", isAuthenticateUser, newOrder);

// router for the see all order by logged user 
router.get("/orders/me", isAuthenticateUser, getMyOrders);

// router for get all order by admin
router.get("/allordres", isAuthenticateUser, authorisedRoles("admin"), getAllOrders);

module.exports = router;