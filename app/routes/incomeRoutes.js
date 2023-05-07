const express = require("express");
const router = express.Router();

const {getAllIncomes, addIncome, getIncome, editIncome, deleteIncome} = require("../controllers/incomeController");
const {validateIncome} = require("../middlewares/incomeMiddleware");
const {checkAuth} = require("../middlewares/authMiddleware");
router.route("/").get(checkAuth, getAllIncomes);
router.route("/").post(checkAuth, validateIncome, addIncome);
router.route("/:id").delete(checkAuth, deleteIncome);
router.route("/:id").patch(checkAuth, validateIncome, editIncome);
router.route("/:id").get(checkAuth, getIncome);
module.exports = router;