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
import calculateTotalExpense from "./Income_sum/Expense_sum";

export default function General() {
  const { setModal_ExpenseAdd } = useContext(ContextProvider);
  const { setModal_IncomeAdd } = useContext(ContextProvider);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const getIncomes = async () => {
      try {
        const res = await axios.get("/income?");
        setIncomes(res.data.data.incomes);
      } catch (err) {
        console.log(err);
      }
    };

    getIncomes();
  }, [setIncomes]);

  useEffect(() => {
    const getExpense = async () => {
      try {
        const res = await axios.get("/expense?");
        setExpenses(res.data.data.expenses);
      } catch (err) {
        console.log(err);
      }
    };

    getExpense();
  }, [setExpenses]);


  const totalIncome = calculateTotalIncome(incomes);
  const totalExpense = calculateTotalExpense(expenses);

  useEffect(() => {
    const pelnasWidth = (totalIncome / (totalIncome + totalExpense)) * 100 + "%";
    const islaidosWidth = (totalExpense / (totalIncome + totalExpense)) * 100 + "%";

    document.documentElement.style.setProperty("--pelnas-width", pelnasWidth);
    document.documentElement.style.setProperty("--islaidos-width", islaidosWidth);
  }, [totalIncome, totalExpense]);

  return (
    <main className="General-container General">
      <div className="top-container">
        <div className="stats-containers">
          <div className="stat-container">
            <p>
              Likutis: <span className="green">{totalIncome-totalExpense}€</span>
            </p>
          </div>

          <div className="stat-container isleista-per-men">
            <p>
              Išleista per mėn: <span className="red">{totalExpense}€</span>
            </p>
          </div>

          <div className="horizontal-bar-container">
            <div className="horizontal-bar__pelnas">{totalIncome} €</div>
            <div className="horizontal-bar__islaidos">{totalExpense} €</div>
          </div>
        </div>

        <div className="doughnut-chart-container">
        <DoughnutChart expenses={expenses} />
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
