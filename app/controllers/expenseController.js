/* eslint-disable linebreak-style */
const Expense = require("../models/expenseModel");
const Category = require("../models/categoryModel");
const Income = require("../models/incomeModel");
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

exports.getAllExpense = async (req, res) => {
  const { limit = 0 } = req.query;
  try {
    const allExpenses = await Expense.find({ user_id: req.userInfo.id })
      .populate("category")
      .sort({ date: -1 })
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: allExpenses.length,
      data: {
        expenses: allExpenses,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getMonthExpenses = async (req, res) => {
  const { year, month } = req.params;

  if (!year || !month || month > 12 || month < 0 || year < 1970) {
    res
      .status(400)
      .json({ status: "error", msg: "Blogai nurodyti metai arba mėnesis" });
  } else {
    const selectedDate = new Date(year, month - 1, 1);
    const startOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    try {
      const allExpenses = await Expense.find({
        user_id: req.userInfo.id,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      }).populate("category");

      const categories = [];
      const spent = [];
      let total_spent = 0;

      allExpenses.forEach((expense) => {
        const categoryIndex = categories.indexOf(expense.category.title);
        if (categoryIndex !== -1) {
          spent[categoryIndex] += expense.sum;
          total_spent += expense.sum;
        } else {
          categories.push(expense.category.title);
          spent.push(expense.sum);
          total_spent += expense.sum;
        }
      });

      res.status(200).json({
        status: "success",
        data: {
          results: categories.length,
          total_spent,
          categories,
          spent,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
};

exports.getExpense = async (req, res) => {
  try {
    const GetExpense = await Expense.findById(req.params.id).populate(
      "category"
    );
    if (!GetExpense) {
      return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja` });
    } else {
      if (GetExpense.user_id == req.userInfo.id) {
        res.status(200).json(GetExpense);
      } else {
        // other user err
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const getCategory = await Category.findOne({ title: req.body.category });
    if (getCategory) {
      const newExpense = await Expense.create({
        user_id: req.userInfo.id,
        category: getCategory._id,
        title: req.body.title,
        sum: req.body.sum,
        date: addTime(req.body.date),
      });
      await saveAction(req.userInfo.id, "expense_add", newExpense);
      res.status(201).json(newExpense);
    } else {
      return res.status(404).json({ msg: `Kategorija neegzistuoja` });
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
      return res.status(404).json({ msg: `Išlaidos nr: ${id} neegzistuoja` });
    } else {
      if (Delete_Expense.user_id == req.userInfo.id) {
        try {
          await Expense.findByIdAndDelete(id);
          await saveAction(req.userInfo.id, "expense_delete", Delete_Expense);
          res.status(200).json({
            status: "success",
            message: `Išlaidos nr: ${id} sėkmingai pašalintas.`,
            expense: Delete_Expense,
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        return res
          .status(403)
          .json({ msg: `Išlaidos nr: ${id} priklauso kitam vartotojui` });
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
      return res.status(404).json({ msg: `Pajamos nr: ${id} neegzistuoja` });
    } else {
      if (Edit_Expense.user_id == req.userInfo.id) {
        const getCategory = await Category.findOne({
          title: req.body.category,
        });
        if (getCategory) {
          try {
            const Updated_Expense = await Expense.findOneAndUpdate(
              {
                _id: id,
              },
              {
                user_id: req.userInfo.id,
                category: getCategory._id,
                title: req.body.title,
                sum: req.body.sum,
                date: addTime(req.body.date),
              },
              { new: true }
            );
            await saveAction(req.userInfo.id, "expense_edit", Updated_Expense);
            res.json({
              status: "success",
              data: Updated_Expense,
            });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }
      } else {
        return res
          .status(404)
          .json({ msg: `Kategorija: ${req.body.category} nerasta` });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpInc = async (req, res) => {
  let dateFrom = new Date(req.params.dateFrom);
  let dateTo = new Date(req.params.dateTo);
  dateFrom = new Date(dateFrom.setDate(1));
  dateTo = new Date(dateTo.setMonth(dateTo.getMonth() + 1, 0));
  try {
    const [allExpenses, allIncomes] = await Promise.all([
      Expense.aggregate([
        {
          $match: {
            user_id: req.userInfo.id,
            date: { $gte: dateFrom, $lte: dateTo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" },
            },
            total: { $sum: "$sum" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Income.aggregate([
        {
          $match: {
            user_id: req.userInfo.id,
            date: { $gte: dateFrom, $lte: dateTo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" },
            },
            total: { $sum: "$sum" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    const expensesMonths = [];
    const expensesSpent = [];
    let totalExpenses = 0;

    const incomesMonths = [];
    const incomesEarned = [];
    let totalIncomes = 0;

    const currentMonth = new Date(dateFrom);
    const lastMonth = new Date(dateTo);
    while (currentMonth <= lastMonth) {
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();
      const formattedMonth = `${year}-${String(month).padStart(2, "0")}`;

      const expense = allExpenses.find((exp) => {
        const { year, month } = exp._id;
        return (
          year === currentMonth.getFullYear() &&
          month === currentMonth.getMonth() + 1
        );
      });

      if (expense) {
        expensesMonths.push(formattedMonth);
        expensesSpent.push(expense.total);
        totalExpenses += expense.total;
      } else {
        expensesMonths.push(formattedMonth);
        expensesSpent.push(0);
      }

      const income = allIncomes.find((inc) => {
        const { year, month } = inc._id;
        return (
          year === currentMonth.getFullYear() &&
          month === currentMonth.getMonth() + 1
        );
      });

      if (income) {
        incomesMonths.push(formattedMonth);
        incomesEarned.push(income.total);
        totalIncomes += income.total;
      } else {
        incomesMonths.push(formattedMonth);
        incomesEarned.push(0);
      }

      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    res.status(200).json({
      status: "success",
      data: {
        expenses_results: expensesMonths.length,
        expenses_total: totalExpenses,
        expenses_months: expensesMonths,
        expenses_spent: expensesSpent,
        incomes_results: incomesMonths.length,
        incomes_total: totalIncomes,
        incomes_months: incomesMonths,
        incomes_earned: incomesEarned,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
