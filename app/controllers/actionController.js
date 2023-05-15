const Action = require("../models/actionModel");
const Category = require("../models/categoryModel");

exports.saveAction = (user_id, action, data) => {
  const newAction = new Action({
    user_id,
    action,
    data,
  });
  return newAction.save();
};
exports.getAllActions = async (req, res) => {
  const { limit = 0 } = req.query;
  try {
    const allActions = await Action.find()
      .populate({ path: "user_id", select: "username" })
      // .populate({ path: "data", populate: { path: "category", model: "category" },})
      .populate({path: "data.category", model:"category"})
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: allActions.length,
      data: {
        actions: allActions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getActionCategories = async (req, res) => {
  try {
    const uniqueActions = await Action.distinct("action");
    res.status(200).json({
      status: "success",
      results: uniqueActions.length,
      data: {
        categories: uniqueActions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
