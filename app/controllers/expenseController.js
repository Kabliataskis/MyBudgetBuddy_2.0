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
          income: Delete_Expense,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };