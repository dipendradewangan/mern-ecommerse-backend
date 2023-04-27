const router = require("express").Router();
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword } = require("../controller/userController");
const {isAuthenticateUser} = require("../middleware/auth")

// route for register a user
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset/:token", resetPassword);
router.get("/me",isAuthenticateUser, getUserDetails)
router.put("/password/update", isAuthenticateUser, updatePassword)
module.exports = router;