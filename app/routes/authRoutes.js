const express = require("express");
const router = express.Router();
const {authRegister, authLogin} = require("../controllers/authController");
const {checkAuth, isAdmin} = require("../middlewares/authMiddleware");
router.route("/register").post(authRegister);
router.route("/login").post(authLogin);
module.exports = router;