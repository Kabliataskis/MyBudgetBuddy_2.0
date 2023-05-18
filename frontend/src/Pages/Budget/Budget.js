/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import "./Budget.css";
import DoughnutChart from "../General/Charts/DoughnutChart";
import MultiAxis from "./Charts/Multiaxis_Line_Chart";
import axios from "../../axios";
import { FaPen } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import Center_Block from "./CenterBlock/Center_block";
import totalExpense from "../General/General";

export default function Budget() {
  const [expenses, setExpenses] = useState([]);
  const [limit, setLimit] = useState({
    amount: 1195,
    status: false,
  });
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


  function statusChange() {
    setLimit((prevLimit) => ({
      ...prevLimit,
      status: !prevLimit.status,
    }));
  }

  return (
    <div className="Budget-container Budget">
      <div className="top-container">
        <div className="stats-containers">
          <div className="stat-container isleista-per-men">
            <p>
              Išleista per mėn: <span className="red">{totalExpense}€</span>
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
      <Center_Block/>
      <div className="bottom-container">
        <h2>Nustatytos kategorijos biudžetas</h2>
        <div className="budget-container">
          <div className="budget-dropdown-category">
            <select className="dropdown-category" name="category" id="category">
              <option value="">Pasirinkti kategoriją:</option>
              <option value="all">Bendras</option>
              <option value="transport">Transportas</option>
              <option value="bills">Mokesčiai</option>

              <option value="health">Sveikata</option>
              <option value="Shop">Parduotuvė</option>
              <option value="Products">Maistas</option>
            </select>
          </div>
          <div className="budget-category">
            <div className="budget-history">
              <p>Kategorijos biudžeto istorija:</p>
              <select
                className="dropdown-history-month"
                name="month"
                id="month"
              >
                <option value="now">Šis mėn.</option>
                <option value="2023-04">04 mėn.</option>
                <option value="2023-03">03 mėn.</option>
                <option value="2023-02">02 mėn.</option>
                <option value="2023-01">01 mėn.</option>
              </select>
            </div>
            <div className="budget-linechart">
              <div className="horizontal-bar__pelnas">4910 €</div>
              <div className="horizontal-bar__islaidos">1044.94 €</div>
            </div>
          </div>
          <div className="budget-status">
		  <p>Nustatytas biudžetas: {limit.status ? <input type='number' value={limit.amount}/>:<span className="green">{limit.amount}</span> } € </p>
            <button onClick={() => 
				 statusChange(limit)}>
				 {limit.status ?<span className="green"><MdDownloadDone /></span>: <span className="red"><FaPen /></span>}</button>
            {/* <button onClick={() => 
							 statusChange(limit)}>{limit.status ? <span><input
								type='text'
								 />
								 <span className="green"><MdDownloadDone /></span></span> 
							  :  <span><span className="green">{limit.amount}</span>€<span className="red"><FaPen /></span></span>}</button> */}
            <p>
              (Vidutiniškai išleidžiama: <span className="red">1045.45 €</span>{" "}
              )
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
