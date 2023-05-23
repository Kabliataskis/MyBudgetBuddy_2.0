export default function calculateTotalExpense(expenses) {
  if (!Array.isArray(expenses)) {
    return 0;
  }

  // Filtruojame išlaidas pagal esamą mėnesį
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth();
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
  
    return expenseYear === currentYear && expenseMonth === currentMonth;
  });
  const totalExpense = filteredExpenses.reduce((total, expense) => total + expense.sum, 0);
  localStorage.setItem("totalExpenseCurrMonth", totalExpense);
  return totalExpense;
}
