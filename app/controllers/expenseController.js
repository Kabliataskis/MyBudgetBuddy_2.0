/* eslint-disable linebreak-style */
const Expense = require("../models/expenseModel");


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
    const allExpenses = await Expense.find()
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

exports.addExpense = async (req, res) => {
  console.log("new expense request");
  try {



    const newExpense = await Expense.create({
      user_id: 1,
      title: req.body.title,
      sum: req.body.sum,
      date: addTime(req.body.date),
    });
    console.log(newExpense);
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ mess: err });
  }
};

exports.deleteExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const Delete_Expense = await Expense.findByIdAndDelete(id);
  
      if (!Delete_Expense) {
        return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja`});
      } else {
        res.status(200).json({
          status: "success",
          message: `Pajamos nr: ${id} sėkmingai pašalintas.`,
          expense: Delete_Expense,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };