export default function calculateTotalExpense(expenses) {
    if (!Array.isArray(expenses)) {
      return 0;
    }
  
    return expenses.reduce((total, expenses) => total + expenses.sum, 0);
  }
  