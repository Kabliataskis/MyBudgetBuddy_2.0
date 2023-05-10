export default function calculateTotalIncome(incomes) {
    if (!Array.isArray(incomes)) {
      return 0;
    }
  
    return incomes.reduce((total, income) => total + income.sum, 0);
  }
  