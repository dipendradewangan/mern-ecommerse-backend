const router = require("express").Router();
const { registerUser, loginUser, logoutUser, forgotPassword } = require("../controller/userController");

// route for register a user
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/password/forgot", forgotPassword)

module.exports = router;