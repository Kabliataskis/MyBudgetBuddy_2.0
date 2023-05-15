const express = require("express");
const router = express.Router();

const {getAllLimits} = require("../controllers/limitController.js");
const {checkAuth, isAdmin} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, getAllLimits);
module.exports = router;