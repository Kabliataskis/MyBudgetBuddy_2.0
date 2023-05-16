const { ObjectId } = require('mongodb');
const Limit = require("../models/limitModel");
const Category = require("../models/categoryModel");
const Expense = require("../models/expenseModel");
const { getCategory } = require("./categoryController");

exports.getAllLimits = async (req, res) => {
  const { limit = 0 } = req.query;
  let category_spent = [];
  try {
    // const allActions = await Action.find()
    //   .populate({ path: "user_id", select: "username" })
    //   // .populate({ path: "data", populate: { path: "category", model: "category" },})
    //   .populate({path: "data.category", model:"category"})
    //   .sort({ createdAt: -1 })
    //   .limit(limit);
    allLimits = await Limit.find({user_id: req.userInfo.id})
        .populate({path: "category", model:"category"});
    const GetCategory = await Category.find();
    if(!allLimits.length && GetCategory){
        for (const category of GetCategory) {
            const limit = await Limit.create({
              user_id: req.userInfo.id,
              category: category._id,
              limit: 0,
            });
            allLimits.push(limit);
          }
    }else{
        //no category
    }
    for(const category of GetCategory){
        const sum = await Expense.aggregate([
            {
              $match: {
                user_id: req.userInfo.id,
                category: new ObjectId(category._id)
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$sum" }
              }
            },
            {
              $project: {
                _id: 0,
                total: 1
              }
            }
          ]);
          if (sum && sum.length > 0 && sum[0].total) {
            category_spent.push({ category: category.title, spent: sum[0].total });
          } else {
            category_spent.push({ category: category.title, spent: 0 });
          }
    }

      

    res.status(200).json({
      status: "success",
      results: allLimits.length,
      data: {
        limits: allLimits,
        expenses: category_spent
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getLimit = async (req, res) => {
  try {
    const GetLimit = await Limit.findById(req.params.id).populate({path: "category", model:"category"});
    if (!GetLimit) {
      return res.status(404).json({ msg: `Limitas nr: ${id} neegzistuoja`});
    } else {
      if(GetLimit.user_id == req.userInfo.id){
        res.status(200).json(GetLimit);
      }else{
        return res.status(403).json({ msg: `Limitas nr: ${id} priklauso kitam vartotojui`});
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};


exports.editLimit = async (req, res) => {
  try {
    const { id } = req.params;
    const Edit_Limit = await Limit.findById(id);
    if (!Edit_Limit) {
      return res.status(404).json({ msg: `Limitas nr: ${id} neegzistuoja` });
    } else {
      if (Edit_Limit.user_id == req.userInfo.id) {
        try {
          const Updated_Limit = await Limit.findOneAndUpdate(
            {
              _id: id,
            },
            {
              limit: req.body.limit,
            },
            {new: true}
          );
          // await saveAction(req.userInfo.id, "limit_edit", Updated_Limit);
          res.json({
            status: "success",
            data: Updated_Limit,
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }else{
        return res.status(403).json({ msg: `Limitas nr: ${id} priklauso kitam vartotojui`});
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// exports.getActionCategories = async (req, res) => {
//   try {
//     const uniqueActions = await Action.distinct("action");
//     res.status(200).json({
//       status: "success",
//       results: uniqueActions.length,
//       data: {
//         categories: uniqueActions,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };
