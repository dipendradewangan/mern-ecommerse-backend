const router = require("express").Router();
const { registerUser } = require("../controller/userController");

// route for register a user
router.post("/register", registerUser)

module.exports = router;