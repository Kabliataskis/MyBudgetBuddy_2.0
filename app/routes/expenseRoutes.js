const express = require("express");
const router = express.Router();

const {getAllExpense, addExpense, deleteExpense, editExpense, getExpense, getExpInc} = require("../controllers/expenseController");
const {validateExpense} = require("../middlewares/expenseMiddleware");
const {checkAuth} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, getAllExpense);
router.route("/").post(checkAuth, validateExpense, addExpense);
router.route("/:id").delete(checkAuth, deleteExpense);
router.route("/:id").patch(checkAuth, validateExpense, editExpense);
router.route("/:id").get(checkAuth, getExpense);
router.route("/:dateFrom/:dateTo").get(checkAuth,getExpInc);

module.exports = router;