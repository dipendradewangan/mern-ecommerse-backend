const router = require("express").Router();
const { newUser } = require("../controller/userController");



router.get("/backend", newUser)

module.exports = router;