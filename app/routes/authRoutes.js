const express = require("express");
const router = express.Router();
const {authRegister, authLogin, authMe} = require("../controllers/authController");
const {checkAuth, isAdmin, validateRegister} = require("../middlewares/authMiddleware");
router.route("/register").post(validateRegister, authRegister);
router.route("/login").post(authLogin);
router.route("/me").get(checkAuth, authMe);
module.exports = router;