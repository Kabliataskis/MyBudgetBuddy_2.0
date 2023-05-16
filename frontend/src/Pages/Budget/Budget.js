/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import "./Budget.css";
import DoughnutChart from "../General/Charts/DoughnutChart";
import MultiAxis from "./Charts/Multiaxis_Line_Chart";
import axios from "../../axios";
import { FaPen } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import Limits from "./Limits/Limits";

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
      <div className="top-container">
        <div className="stats-containers">
          <div className="stat-container isleista-per-men">
            <p>
              Išleista per mėn: <span className="red">1044.94€</span>
            </p>
          </div>
          <div className="stat-container data">
            <p>Mėnuo:</p>
            <select className="dropdown-month" name="month" id="month">
              <option value="now">Šis mėn.</option>
              <option value="2023-04">04 mėn.</option>
              <option value="2023-03">03 mėn.</option>
              <option value="2023-02">02 mėn.</option>
              <option value="2023-01">01 mėn.</option>
            </select>
          </div>
        </div>

        <div className="doughnut-chart-container">
          <DoughnutChart expenses={expenses} />
        </div>
      </div>
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
