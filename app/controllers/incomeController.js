/* eslint-disable linebreak-style */
const Income = require("../models/incomeModel");


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



exports.getAllIncomes = async (req, res) => {
  const {limit = 0} = req.query
  try {
    const allIncomes = await Income.find()
    .sort({ date: -1 })
    .limit(limit);

    res.status(200).json({
      status: "success",
      results: allIncomes.length,
      data: {
        incomes: allIncomes,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.addIncome = async (req, res) => {
  console.log("new income request");
  try {
    const newIncome = await Income.create({
      user_id: 1,
      title: req.body.title,
      sum: req.body.sum,
      date: addTime(req.body.date),
    });
    console.log(newIncome);
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(500).json({ mess: err });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete_Income = await Income.findByIdAndDelete(id);

    if (!Delete_Income) {
      return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja`});
    } else {
      res.status(200).json({
        status: "success",
        message: `Pajamos nr: ${id} sėkmingai pašalintas.`,
        income: Delete_Income,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
