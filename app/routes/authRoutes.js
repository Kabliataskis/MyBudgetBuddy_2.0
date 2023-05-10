const express = require("express");
const router = express.Router();
const {authRegister, authLogin, authMe, getAllUsers} = require("../controllers/authController");
const {checkAuth, isAdmin, validateRegister} = require("../middlewares/authMiddleware");
router.route("/register").post(validateRegister, authRegister);
router.route("/login").post(authLogin);
router.route("/me").get(checkAuth, authMe);
router.route("/").get(getAllUsers);
module.exports = router;