const express = require("express");
const router = express.Router();

const { deleteExpense} = require("../controllers/expenseController");
router.route("/:id").delete(deleteExpense);

module.exports = router;