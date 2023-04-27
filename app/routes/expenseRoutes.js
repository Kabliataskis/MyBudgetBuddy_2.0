const express = require("express");
const router = express.Router();

const {getAllExpense, addExpense, deleteExpense} = require("../controllers/expenseController");
const {validateExpense} = require("../middlewares/expenseMiddleware");
router.route("/").get(getAllExpense);
router.route("/").post(validateExpense, addExpense);
router.route("/:id").delete(deleteExpense);

module.exports = router;