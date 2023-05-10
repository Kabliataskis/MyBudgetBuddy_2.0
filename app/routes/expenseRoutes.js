const express = require("express");
const router = express.Router();

const {getAllExpense, addExpense, deleteExpense} = require("../controllers/expenseController");
const {validateExpense} = require("../middlewares/expenseMiddleware");
const {checkAuth} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, getAllExpense);
router.route("/").post(checkAuth, validateExpense, addExpense);
router.route("/:id").delete(checkAuth, deleteExpense);

module.exports = router;