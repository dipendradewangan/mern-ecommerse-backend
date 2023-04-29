const router = require("express").Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers
} = require("../controller/userController");

const { isAuthenticateUser, authorisedRoles } = require("../middleware/auth")

// route for register a user
router.post("/register", registerUser);

// route for login a user
router.post("/login", loginUser);

// route for logout user
router.get("/logout", logoutUser);

// route for forgot password
router.post("/password/forgot", forgotPassword)

// route for reset password with forgot password
router.put("/password/reset/:token", resetPassword);

// route for get user profile by logged user
router.get("/me", isAuthenticateUser, getUserDetails);

// route for update password by logged user
router.put("/password/update", isAuthenticateUser, updatePassword);

// route for update profile by logged user
router.put("/me/update", isAuthenticateUser, updateProfile);


router.get("/admin/users", isAuthenticateUser, authorisedRoles("admin"), getAllUsers)


module.exports = router;