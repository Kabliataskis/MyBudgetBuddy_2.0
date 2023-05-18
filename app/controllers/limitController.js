const { ObjectId } = require("mongodb");
const Limit = require("../models/limitModel");
const Category = require("../models/categoryModel");
const Expense = require("../models/expenseModel");
const { getCategory } = require("./categoryController");
const {saveAction} = require("./actionController");

exports.getAllLimits = async (req, res) => {
  const {year, month} = req.params;
  console.log("year:"+ req.params.year);
  console.log("month:"+ req.params.month);


  if(!year || !month || month > 12 || month < 0 || year < 2022){
    res.status(400).json({status: "error", msg: 'Blogai nurodyti metai arba mėnesis',
    });
  }else{
    let category_spent = [];
    try {
    
      const selectedDate = new Date(year, month - 1, 1);
      const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  
  
      console.log(`The year is ${year} the month is ${month}`);
      console.log(`startOfMonth ${startOfMonth}`);
      console.log(`endOfMonth ${endOfMonth}`);
  
      allLimits = await Limit.find({ user_id: req.userInfo.id,   date: { $gte: startOfMonth, $lte: endOfMonth }, }).populate({
        path: "category",
        model: "category",
      });
      const GetCategory = await Category.find();
      if ((!allLimits.length && GetCategory) || (allLimits.length > 0 && GetCategory && allLimits.length != GetCategory.length)) {
        const existingCategories = allLimits.map((limit) => limit.category.title);
        for (const category of GetCategory) {
          if (!existingCategories.includes(category.title)) {
              console.log('create new' + category.title);

              const limit = await Limit.create({
                user_id: req.userInfo.id,
                category: category._id,
                limit: 0,
                date: startOfMonth
              });
              console.log(limit);
              allLimits.push(limit);
            }else{
              console.log("no creation");
            }
        }
        allLimits = await Limit.find({ user_id: req.userInfo.id,   date: { $gte: startOfMonth, $lte: endOfMonth }, }).populate({
          path: "category",
          model: "category",
        });

      } else {
        //no category
      }
  


      for (const category of GetCategory) {
        const sum = await Expense.aggregate([
          {
            $match: {
              user_id: req.userInfo.id,
              category: new ObjectId(category._id),
              date: { $gte: new Date(startOfMonth), $lte: new Date(endOfMonth) }
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$sum" },
            },
          },
          {
            $project: {
              _id: 0,
              total: 1,
            },
          },
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
          expenses: category_spent,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        msg: err.message,
      });
    }
  }


};




const isDateCurrOrFutureMonth = (date) => {
  date = new Date(date);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth();

  if (dateYear > currentYear) {
    return true; // Date is in a future year
  } else if (dateYear === currentYear && dateMonth >= currentMonth) {
    return true; // Date is in the current year and a current or future month
  } else {
    return false; // Date is in the past month or an earlier year
  }
}


exports.getLimit = async (req, res) => {
  try {
    const GetLimit = await Limit.findById(req.params.id).populate({
      path: "category",
      model: "category",
    });
    if (!GetLimit) {
      return res.status(404).json({ msg: `Limitas nr: ${id} neegzistuoja` });
    } else {
      if (GetLimit.user_id == req.userInfo.id) {
        res.status(200).json(GetLimit);
      } else {
        return res
          .status(403)
          .json({ msg: `Limitas nr: ${id} priklauso kitam vartotojui` });
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
        if(isDateCurrOrFutureMonth(Edit_Limit.date)){
          try {
            const Updated_Limit = await Limit.findOneAndUpdate(
              {
                _id: id,
              },
              {
                limit: req.body.limit,
              },
              { new: true }
            );
            await saveAction(req.userInfo.id, "limit_edit", Updated_Limit);
            res.json({
              status: "success",
              data: Updated_Limit,
            });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }else{
          return res
          .status(403)
          .json({ msg: `Negali redaguoti senus limitus` });
        }

      } else {
        return res
          .status(403)
          .json({ msg: `Limitas nr: ${id} priklauso kitam vartotojui` });
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
