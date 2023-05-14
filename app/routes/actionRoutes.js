const express = require("express");
const router = express.Router();

const {getAllActions, getActionCategories} = require("../controllers/actionController.js");
const {checkAuth, isAdmin} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, isAdmin, getAllActions);
router.route("/categories").get(checkAuth, isAdmin, getActionCategories);
module.exports = router;