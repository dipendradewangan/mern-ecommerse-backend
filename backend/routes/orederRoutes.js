const { newOrder, getMyOrders, getAllOrders, getOrderInfo, updateOrder, deleteOrder } = require("../controller/orderController")
const { isAuthenticateUser, authorisedRoles } = require("../middleware/auth")

const router = require("express").Router()

// route for the create new order
router.post("/order/new", isAuthenticateUser, newOrder);

// router for the see all order by logged user 
router.get("/orders/me", isAuthenticateUser, getMyOrders);

// router for get all order by admin
router.get("/allordres", isAuthenticateUser, authorisedRoles("admin"), getAllOrders);

// router for get order info using orderId
router.get("/order/:id", isAuthenticateUser, authorisedRoles("admin"), getOrderInfo)

// router for update order and order status
router.put("/order/:id", isAuthenticateUser, authorisedRoles("admin"), updateOrder);

// router for delete the order
router.delete("/order/:id", isAuthenticateUser, authorisedRoles("admin"), deleteOrder);

module.exports = router;