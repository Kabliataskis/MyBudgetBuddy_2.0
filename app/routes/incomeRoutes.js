const express = require("express");
const router = express.Router();

const {getAllIncomes, addIncome, deleteIncome} = require("../controllers/incomeController");
const {validateIncome} = require("../middlewares/incomeMiddleware");
router.route("/").get(getAllIncomes);
router.route("/").post(validateIncome, addIncome);
router.route("/:id").delete(deleteIncome);

module.exports = router;