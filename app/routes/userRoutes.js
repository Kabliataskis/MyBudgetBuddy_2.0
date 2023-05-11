const express = require("express");
const router = express.Router();

const {
  editUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");
const { checkAuth, isAdmin } = require("../middlewares/authMiddleware");
router.route("/:id").patch(checkAuth, isAdmin, editUser);
router.route("/:id").delete(checkAuth, isAdmin, deleteUser);
router.route("/role/:id").patch(checkAuth, isAdmin, updateUserRole);
module.exports = router;
