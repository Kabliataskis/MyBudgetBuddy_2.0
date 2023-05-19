/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import "./Budget.css";
import DoughnutChart from "../General/Charts/DoughnutChart";
import MultiAxis from "./Charts/Multiaxis_Line_Chart";
import axios from "../../axios";
import Limits from "./Limits/Limits";
import totalExpense from "../General/General";
import TopBlock from "./TopBlock/TopBlock";

export default function Budget() {
  const [expenses, setExpenses] = useState([]);
  const getExpense = async () => {
    try {
      const res = await axios.get("/expense?");
      setExpenses(res.data.data.expenses);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getExpense();
  }, []);

  const [yearDropdownOptions, setYearDropdownOptions] = useState([]);

    const yearDropdownList = yearDropdownOptions.map((year) => (
      <option value={year} key={year}>
        {year}
      </option>
    ));
    const [dropdownYear, setDropdownYear] = useState(new Date().getFullYear());
const  [dropdownMonth, setDropdownMonth] = useState(new Date().getMonth() +1); // getMonth() returns the month (from 0 to 11) of a date:
const handleYearChange = (e) => {
    setDropdownYear(e.target.value);
}
const handleMonthChange = (e) => {
    setDropdownMonth(e.target.value);
}
useEffect(() => {
  const currentDate = new Date();
  const years = Array.from({ length: currentDate.getFullYear() - 2022 + 1 }, (_, index) => currentDate.getFullYear() - index);
  console.log(years);
  setYearDropdownOptions(years);
}, []);
// useEffect(() => {
//   makeDate();
// }, [dropdownYear, dropdownMonth]);

// const makeDate = async () => {
  // getLimits(dropdownYear,dropdownMonth);
  //   const [inputLimit, setInputLimit] = useState('');

  //   const handleInputChange = (event) => {
  // 	setInputLimit(event.target.value);
  //   };

  //   const handleButtonClick = () => {
  // 	setLimit({ ...limit, amount: `${limit.amount}` });
  // 	setInputLimit('');
  //   };

  return (
    <div className="Budget-container Budget">
      <TopBlock />
      <div className="center-container">
        <h2 className="h2">Pajamų ir išlaidų palyginimas</h2>
        <div className="compares-container">
          <div className="inside-container">
            <div className="compare-container until">
              <p>Iki:</p>
              <select className="dropdown-month" name="month" id="month">
                <option value="now">2023.05</option>
                <option value="2023-04">2023.04</option>
                <option value="2023-03">2023.03</option>
                <option value="2023-02">2023.02</option>
                <option value="2023-01">2023.01</option>
              </select>
            </div>
            <div className="compare-container from">
              <p>Nuo:</p>
              <select className="dropdown-month" name="month" id="month">
                <option value="now">2023.05</option>
                <option value="2023-04">2023.04</option>
                <option value="2023-03">2023.03</option>
                <option value="2023-02">2023.02</option>
                <option value="2023-01">2023.01</option>
              </select>
            </div>
          </div>
          <div className="multiaxis-chart-container">
            <MultiAxis />
          </div>
        </div>
      </div>
    <Limits/>
    </div>
  );
  }
