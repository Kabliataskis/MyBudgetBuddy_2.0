const express = require("express");
const router = express.Router();

const {getAllIncomes, addIncome, editIncome, deleteIncome} = require("../controllers/incomeController");
const {validateIncome} = require("../middlewares/incomeMiddleware");
const {checkAuth} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, getAllIncomes);
router.route("/").post(checkAuth, validateIncome, addIncome);
router.route("/:id").delete(checkAuth, deleteIncome);
router.route("/:id").patch(checkAuth, editIncome);

module.exports = router;