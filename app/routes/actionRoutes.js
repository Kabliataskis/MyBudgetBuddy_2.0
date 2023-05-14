const express = require("express");
const router = express.Router();

const {getAllActions} = require("../controllers/actionController.js");
const {checkAuth, isAdmin} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, isAdmin, getAllActions);
module.exports = router;