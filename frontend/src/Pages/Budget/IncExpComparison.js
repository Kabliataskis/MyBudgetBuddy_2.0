const {incomes} = props;
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const filterIncome = incomes.filter((el) => {
  const date = el.date || "";

  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;
  const incomeDateObj = date ? new Date(date) : null;

  const dateInRange =
    (!startDateObj ||
      startDateObj <= incomeDateObj.setHours(0, 0, 0, 0) + 86400000) &&
    (!endDateObj || endDateObj >= incomeDateObj.setHours(0, 0, 0, 0));

  return dateInRange;
});
console.log(filterIncome);