export default function calculateTotalExpense(expenses) {
  if (!Array.isArray(expenses)) {
    return 0;
  }

  // Filtruojame išlaidas pagal esamą mėnesį
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Pridedame 1, nes mėnuo numeruojamas nuo 0 iki 11
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth() + 1;
    return expenseMonth === currentMonth;
  });
  const totalExpense = filteredExpenses.reduce((total, expense) => total + expense.sum, 0);
  localStorage.setItem("totalExpenseCurrMonth", totalExpense);
  return totalExpense;
}
