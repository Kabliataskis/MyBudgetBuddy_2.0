/* eslint-disable linebreak-style */
const Expense = require("../models/expenseModel");
const Category = require("../models/categoryModel");


const addTime = (date) => {
  date = new Date(date);

  // Get the current time values
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  
  // Set the time values on the date object
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(milliseconds);
  
  // The date object now has the desired date and the current time
  return date;
}



exports.getAllExpense = async (req, res) => {
  const {limit = 0} = req.query
  try {
    const allExpenses = await Expense.find({user_id: req.userInfo.id}).populate('category')
    .sort({ date: -1 })
    .limit(limit);

    res.status(200).json({
      status: "success",
      results: allExpenses.length,
      data: {
        expenses: allExpenses
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};


exports.getExpense = async (req, res) => {
  try {
    const GetExpense = await Expense.findById(req.params.id).populate('category');
    if (!GetExpense) {
      return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja`});
    } else {
      if(GetExpense.user_id == req.userInfo.id){
        res.status(200).json(GetExpense);
      }else{
        // other user err
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

exports.addExpense = async (req, res) => {
  console.log("new expense request");
  try {

    const getCategory = await Category.findOne({title: req.body.category});
    if(getCategory){
      const newExpense = await Expense.create({
        user_id: req.userInfo.id,
        category: getCategory._id,
        title: req.body.title,
        sum: req.body.sum,
        date: addTime(req.body.date),
      });
      console.log(newExpense);
      res.status(201).json(newExpense);
    }else{
      return res.status(404).json({ msg: `Kategorija neegzistuoja`});
    }
  } catch (err) {
    res.status(500).json({ mess: err });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete_Expense = await Expense.findById(id);
    if (!Delete_Expense) {
      return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja`});
    } else {

      if(Delete_Expense.user_id == req.userInfo.id){
        console.log("true");
        try{
          const delete_ = await Expense.findByIdAndDelete(id);
          res.status(200).json({
            status: "success",
            message: `Pajamos nr: ${id} sėkmingai pašalintas.`,
            expense: Delete_Expense,
          });
        }catch (error){
          res.status(500).json({ error: error.message });
        }
      }else{
        return res.status(403).json({ msg: `Pajamos nr: ${id} priklauso kitam vartotojui`});
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  };


  exports.editExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const Edit_Expense = await Expense.findById(id);
      if (!Edit_Expense) {
        return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja`});
      } else {
  
        if(Edit_Expense.user_id == req.userInfo.id){
          console.log("true");
          try{
            await Expense.updateOne({
                    _id: id,
                  },{
                    user_id: req.userInfo.id,
                    category: req.body.category,
                    title: req.body.title,
                    sum: req.body.sum,
                    date: addTime(req.body.date),
                  }
                  );
                  res.json({
                    success: true,
                  })
          }catch (error){
            res.status(500).json({ error: error.message });
          }
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }