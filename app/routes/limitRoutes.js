const express = require("express");
const router = express.Router();

const {getAllLimits, getLimit, editLimit} = require("../controllers/limitController.js");
const {checkAuth, isAdmin} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, getAllLimits);
router.route("/:id").get(checkAuth, getLimit);
router.route("/:id").patch(checkAuth, editLimit);
module.exports = router;