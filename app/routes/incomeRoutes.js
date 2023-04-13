const express = require("express");
const router = express.Router();

const {addIncome, deleteIncome} = require("../controllers/incomeController");

router.route("/").post(addIncome);
router.route("/:id").delete(deleteIncome);

module.exports = router;