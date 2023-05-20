/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import BudgetDoughnutChart from "../Charts/BudgetDoughnutChart";
import axios from "../../../axios";
import { AiFillWarning } from "react-icons/ai";


export default function TopBlock() {

    const [categoryList, setCategoryList] = useState();
    const [spentList, setSpentList] = useState();
    const [totalExpence, setTotalExpence] = useState(1);


  const getBudgetExpense = async () => {
    try {
      const res = await axios.get("/expense/"+dropdownYear+"/"+dropdownMonth);
      setCategoryList(res.data.data.categories);
      setSpentList(res.data.data.spent);
      setTotalExpence(res.data.data.total_spent);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBudgetExpense();
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
  setYearDropdownOptions(years);
}, []);
useEffect(() => {
  makeDate();
}, [dropdownYear, dropdownMonth]);

const makeDate = async () => {
    getBudgetExpense();
};

  return (
    
      <div className="top-container">
        <div className="stats-containers">
          <div className="stat-container isleista-per-men">
            <p>
              Išleista per mėn: <span className="red">{(totalExpence).toFixed(2)}€</span>
            </p>
          </div>
          <div className="stat-container data">
            <p>Data:</p>
            <select
                className="dropdown-month"
                name="year"
                id="year"
                onChange={(e) => handleYearChange(e)}
                value={dropdownYear}
              >
                {/* <option value="now">2023</option> */yearDropdownList}
              </select>
              <select
                className="dropdown-month"
                name="month"
                id="month"
                onChange={(e) => handleMonthChange(e)}
                value={dropdownMonth}
              >
                <option value="1">Sausis</option>
                <option value="2">Vasaris</option>
                <option value="3">Kovas</option>
                <option value="4">Balandis</option>
                <option value="5">Gegužė</option>
                <option value="6">Birželis</option>
                <option value="7">Liepa</option>
                <option value="8">Rugpjūtis</option>
                <option value="9">Rugsėjis</option>
                <option value="10">Spalis</option>
                <option value="11">Lapkritis</option>
                <option value="12">Gruodis</option>
              </select>   
          </div>
          {totalExpence==0 ?<div className="error-mess-box">
                  <AiFillWarning className="red" />
                  <span className="red">Išlaidos nerastos</span>
                </div> : null}
         </div>
          

        <div className="doughnut-chart-container">
          <BudgetDoughnutChart categoryList={categoryList} spentList={spentList} />
        </div>
      </div>
  );
  }
