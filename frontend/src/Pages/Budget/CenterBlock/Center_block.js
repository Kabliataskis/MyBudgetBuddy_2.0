import React, { useEffect, useState } from "react";
import MultiAxis from "../Charts/Multiaxis_Line_Chart";
import axios from "../../../axios";
import { formatDate } from "../../../func";

export default function Center_Block() {
  const [expenses_months, setExpenses_months] = useState();
  const [expenses_spent, setExpenses_spent] = useState();
  const [incomes_earned, setIncomes_earned] = useState();

  const [yearDropdownOptions, setYearDropdownOptions] = useState([]);

  const yearDropdownList = yearDropdownOptions.map((year) => (
    <option value={year} key={year}>
      {year}
    </option>
  ));
  useEffect(() => {
    const currentDate = new Date();
    const years = Array.from(
      { length: currentDate.getFullYear() - 2022 + 1 },
      (_, index) => currentDate.getFullYear() - index
    );
    setYearDropdownOptions(years);
  }, []);


  let curr_month = new Date().getMonth() + 1;
  let curr_year = new Date().getFullYear();
  const [monthTo, setMonthTo] = useState(curr_month); // getMonth() returns the month (from 0 to 11) of a date:;
  const [monthFrom, setMonthFrom] = useState(curr_month);
  const [yearTo, setYearTo] = useState(curr_year);
  const [yearFrom, setYearFrom] = useState(curr_year - 1);
  useEffect(() => {
    makeDate();
  }, [yearTo, yearFrom, monthTo, monthFrom]);


  const handleYearToChange = (e) => {
    setYearTo(e.target.value);
  };
  const handleYearFromChange = (e) => {
    setYearFrom(e.target.value);
  };
  const handleMonthToChange = (e) => {
    setMonthTo(e.target.value);
  };
  const handleMonthFromChange = (e) => {
    setMonthFrom(e.target.value);
  };
  const getData = async (dateFrom, dateTo) => {
    try {
      const res = await axios.get("/expense/getExpInc/" + dateFrom + "/" + dateTo);
      setExpenses_months(res.data.data.expenses_months);
      setExpenses_spent(res.data.data.expenses_spent);
      setIncomes_earned(res.data.data.incomes_earned);
    } catch (err) {
      console.log(err);
    }
  };
  const makeDate = async () => {
    let d = new Date().getDate();
    let dateFrom = new Date(yearFrom, monthFrom - 1, d);
    let dateTo = new Date(yearTo, monthTo - 1, d);
    getData(dateFrom, dateTo);

  };

  return (
    <div className="center-container">
      <h2>Pajamų ir išlaidų palyginimas</h2>
      <div className="compares-container">
        <div className="inside-container">
          <div className="compare-container until">
            <p>Iki:</p>
            <select
              className="dropdown-month"
              name="yearTo"
              id="yearTo"
              onChange={(e) => handleYearToChange(e)}
              value={yearTo}
            >
              {yearDropdownList}
            </select>
            <select
              className="dropdown-month"
              name="monthTo"
              id="monthTo"
              onChange={(e) => handleMonthToChange(e)}
              value={monthTo}
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
          <div className="compare-container from">
            <p>Nuo:</p>
            <select
              className="dropdown-month"
              name="yearFrom"
              id="yearFrom"
              onChange={(e) => handleYearFromChange(e)}
              value={yearFrom}
            >
              {yearDropdownList}
            </select>
            <select
              className="dropdown-month"
              name="monthFrom"
              id="monthFrom"
              onChange={(e) => handleMonthFromChange(e)}
              value={monthFrom}
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
        </div>
        <div className="multiaxis-chart-container">
          <MultiAxis
            expenses_months={expenses_months}
            expenses_spent={expenses_spent}
            incomes_earned={incomes_earned}
          />
        </div>
      </div>
    </div>
  );
}