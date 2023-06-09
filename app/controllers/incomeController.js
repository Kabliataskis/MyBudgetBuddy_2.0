/* eslint-disable linebreak-style */
const Income = require("../models/incomeModel");
const User = require("../models/userModel");
const { saveAction } = require("./actionController");
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
};

exports.getAllIncomes = async (req, res) => {
  const { limit = 0 } = req.query;

  try {
    const allIncomes = await Income.find({ user_id: req.userInfo.id })
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

exports.getIncome = async (req, res) => {
  try {
    const GetIncome = await Income.findById(req.params.id);
    if (!GetIncome) {
      return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja` });
    } else {
      if (GetIncome.user_id == req.userInfo.id) {
        res.status(200).json(GetIncome);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addIncome = async (req, res) => {
  try {
    const newIncome = await Income.create({
      user_id: req.userInfo.id,
      title: req.body.title,
      sum: req.body.sum,
      date: addTime(req.body.date),
    });
    await saveAction(req.userInfo.id, "income_add", newIncome);
    res.status(201).json(newIncome);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mess: err });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete_Income = await Income.findById(id);
    if (!Delete_Income) {
      return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja` });
    } else {
      if (Delete_Income.user_id == req.userInfo.id) {
        console.log("true");
        try {
          await Income.findByIdAndDelete(id);
          await saveAction(req.userInfo.id, "income_delete", Delete_Income);
          res.status(200).json({
            status: "success",
            message: `Pajamos nr: ${id} sėkmingai pašalintas.`,
            income: Delete_Income,
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const Edit_Income = await Income.findById(id);
    if (!Edit_Income) {
      return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja` });
    } else {
      if (Edit_Income.user_id == req.userInfo.id) {
        try {
          const Updated_Income = await Income.findOneAndUpdate(
            {
              _id: id,
            },
            {
              user_id: req.userInfo.id,
              title: req.body.title,
              sum: req.body.sum,
              date: addTime(req.body.date),
            }
          );
          await saveAction(req.userInfo.id, "income_edit", Updated_Income);
          res.json({
            status: "success",
            data: Updated_Income,
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
