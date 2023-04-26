const express = require("express");
const router = express.Router();
const {authRegister, authLogin} = require("../controllers/authController");

router.route("/register").post(authRegister);
router.route("/login").post(authLogin);


module.exports = router;