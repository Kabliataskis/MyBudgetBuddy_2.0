// const [value, setValue] = useState("");
// const [startDate, setStartDate] = useState("");
// const [endDate, setEndDate] = useState("");
// const [searchClicked, setSearchClicked] = useState(false);

// const handleSearchClick = (event) => {
//   event.preventDefault();
//   setSearchClicked(!searchClicked);
// }

// const filterIncome = incomes.filter((el) => {
//   const title = el.title || "";
//   const date = el.date || "";
//   const lowercaseValue = value ? value.toLocaleLowerCase() : "";

//   // Check if date falls within selected date range
//   const startDateObj = startDate ? new Date(startDate) : null;
//   const endDateObj = endDate ? new Date(endDate) : null;
//   const incomeDateObj = date ? new Date(date) : null;

//   const dateInRange =
//     (!startDateObj || startDateObj <= incomeDateObj.setHours(0, 0, 0, 0) + 86400000) &&
//     (!endDateObj || endDateObj >= incomeDateObj.setHours(0, 0, 0, 0));

//   if (searchClicked) {
//     return title.toLocaleLowerCase().includes(lowercaseValue) && dateInRange;
//   } else {
//     // Return all income items if search button hasn't been clicked yet
//     return true;
//   }
// });

// return (
//   <div>
//     <form>
//       <label>
//         Value:
//         <input
//           type="text"
//           value={value}
//           onChange={(event) => setValue(event.target.value)}
//         />
//       </label>
//       <label>
//         Start Date:
//         <input
//           type="date"
//           value={startDate}
//           onChange={(event) => setStartDate(event.target.value)}
//         />
//       </label>
//       <label>
//         End Date:
//         <input
//           type="date"
//           value={endDate}
//           onChange={(event) => setEndDate(event.target.value)}
//         />
//       </label>
//       <button onClick={(event) => handleSearchClick(event)}>Ieškoti</button>
//     </form>
//     <ul>
//       {filterIncome.map((income) => (
//         <li key={income.id}>
//           {income.title} - {income.date}
//         </li>
//       ))}
//     </ul>
//   </div>
// );