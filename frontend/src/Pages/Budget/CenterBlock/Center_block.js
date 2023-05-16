import React, { useEffect, useState } from "react";
import MultiAxis from "../Charts/Multiaxis_Line_Chart";
import axios from "../../../axios";

export default function Center_Block() {
  const [incomes, setIncomes] = useState([]);
  const getIncomes = async () => {
    try {
      const res = await axios.get("/income?");
      setIncomes(res.data.data.incomes);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getIncomes();
  }, []);

  let curr_month = new Date().getMonth() + 1;
  let curr_year = new Date().getFullYear();
  const [monthTo, setMonthTo] = useState(curr_month); // getMonth() returns the month (from 0 to 11) of a date:;
  const [monthFrom, setMonthFrom] = useState(curr_month);
  const [yearTo, setYearTo] = useState(curr_year);
  const [yearFrom, setYearFrom] = useState(curr_year-1);
  useEffect(() => {
    makeDate();
  }, [yearTo, yearFrom, monthTo, monthFrom]);

  

const handleYearToChange = (e) => {
  setYearTo(e.target.value);
}
const handleYearFromChange = (e) => {
  setYearFrom(e.target.value);
}
const handleMonthToChange = (e) => {
  setMonthTo(e.target.value);
}
const handleMonthFromChange = (e) => {
  setMonthFrom(e.target.value);
}

const makeDate = () => {
  let d = new Date().getDate();
  console.log("MONTH FROM: " + monthFrom);
  let dateFrom = new Date(yearFrom, monthFrom-1, d);
  let dateTo = new Date(yearTo, monthTo-1, d);
  // let date
  console.log(`date from: ${dateFrom}`);
  console.log(`date to: ${dateTo}`);

  const monthsArray = [];

  let currentDate = dateFrom;
  //  incomes.filter((dateFrom, dateTo)=>  date >= dateFrom && date <= dateTo);


  //  const filteredIncomes = incomes.filter(income => {
  //   const date = new Date(income.date);
  //   return date >= dateFrom && date <= dateTo;
  // });
  const filteredIncomes = incomes.filter(income => {
    const date = new Date(income.date);
    console.log('dateFrom:', dateFrom);
    console.log('dateTo:', dateTo);
    console.log('income date:', date);
    const isInDateRange = date >= dateFrom && date <= dateTo;
    console.log('isInDateRange:', isInDateRange);
    return isInDateRange;
  });

console.log("FILTERED INCOMES:");
console.log(filteredIncomes);
  while (currentDate <= dateTo) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() +1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${year}-${formattedMonth}`;
    monthsArray.push(formattedDate);
    console.log(new Date(currentDate)); 
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  console.log(monthsArray);

  
}

// async function {
//  
//   }); 
// };

return(
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
                <option value="2023">2023</option>
                <option value="2022">2022</option>
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
                <option  value="2023">2023</option>
                <option value="2022">2022</option>
                



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
            <MultiAxis incomes={incomes}/>
          </div>
        </div>
      </div>
      )
    }