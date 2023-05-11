const express = require("express");
const router = express.Router();

const {getAllCategories, getCategory, addCategory, editCategory, deleteCategory} = require("../controllers/categoryController");
// const {validateIncome} = require("../middlewares/incomeMiddleware");
const {checkAuth, isAdmin} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, isAdmin, getAllCategories);
router.route("/:id").get(checkAuth, isAdmin, getCategory);
router.route("/").post(checkAuth, isAdmin, addCategory);
router.route("/:id").patch(checkAuth, isAdmin, editCategory);
router.route("/:id").delete(checkAuth, isAdmin, deleteCategory);
module.exports = router;