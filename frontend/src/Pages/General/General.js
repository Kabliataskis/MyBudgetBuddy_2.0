import React, { useContext,useState,useEffect } from "react";
import { ContextProvider } from "../../App";
import axios from "../../axios";


//Css
import "./General.css";

//Charts
import DoughnutChart from "./Charts/DoughnutChart";

//History
import ExpenseHistory from "./Expense_history/ExpenseHistory";
import IncomeHistory from "./Income_history/IncomeHistory";

import calculateTotalIncome from "./Income_sum/Income_sum";


export default function General() {
  const { setModal_ExpenseAdd } = useContext(ContextProvider);
  const { setModal_IncomeAdd } = useContext(ContextProvider);
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
  const totalIncome = calculateTotalIncome(incomes);
  return (
    <main className="General-container General">
      <div className="top-container">
        <div className="stats-containers">
          <div className="stat-container">
            <p>
              Likutis: <span className="green">{totalIncome}€</span>
            </p>
          </div>

          <div className="stat-container isleista-per-men">
            <p>
              Išleista per mėn: <span className="red">1044.94€</span>
            </p>
          </div>

          <div className="horizontal-bar-container">
            <div className="horizontal-bar__pelnas">4910 €</div>
            <div className="horizontal-bar__islaidos">1044.94 €</div>
          </div>
        </div>

        <div className="doughnut-chart-container">
          <DoughnutChart />
        </div>
      </div>
      <div className="history-containers">
        <div className="history-container">
          <button
            className="addBtn"
            type="button"
            onClick={() => setModal_ExpenseAdd(true)}
          >
            Įvesti išlaidas
          </button>
          <div className="history-top-line"></div>

          <ExpenseHistory />
        </div>

        <div className="history-container">
          <button
            className="addBtn"
            type="button"
            onClick={() => setModal_IncomeAdd(true)}
          >
            Įvesti pajamas
          </button>
          <div className="history-top-line"></div>
          <IncomeHistory />
        </div>
      </div>
    </main>
  );
}
