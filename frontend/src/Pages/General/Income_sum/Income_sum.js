export default function calculateTotalIncome(incomes) {
  if (!Array.isArray(incomes)) {
    return 0;
  }

  // Filtruojame pajamas pagal esamą mėnesį
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Pridedame 1, nes mėnuo numeruojamas nuo 0 iki 11
  const filteredIncomes = incomes.filter(income => {
    const incomeDate = new Date(income.date);
    const incomeMonth = incomeDate.getMonth() + 1;
    return incomeMonth === currentMonth;
  });

  return filteredIncomes.reduce((total, income) => total + income.sum, 0);
}
