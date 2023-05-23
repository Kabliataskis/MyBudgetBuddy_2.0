export default function calculateTotalIncome(incomes) {
  if (!Array.isArray(incomes)) {
    return 0;
  }

  // Filtruojame pajamas pagal esamą mėnesį
  const filteredIncomes = incomes.filter(income => {
    const incomeDate = new Date(income.date);
    const incomeYear = incomeDate.getFullYear();
    const incomeMonth = incomeDate.getMonth();
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
  
    return incomeYear === currentYear && incomeMonth === currentMonth;
  });
  const totalIncome = filteredIncomes.reduce((total, income) => total + income.sum, 0);
  localStorage.setItem("totalIncomeCurrMonth", totalIncome);
  return totalIncome;
} 