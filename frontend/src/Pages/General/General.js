import React, { useContext, useState, useEffect } from "react";
import { ContextProvider } from "../../App";
import axios from "../../axios";

// Css
import "./General.css";

// Charts
import DoughnutChart from "./Charts/DoughnutChart";

// History
import ExpenseHistory from "./Expense_history/ExpenseHistory";
import IncomeHistory from "./Income_history/IncomeHistory";

import calculateTotalIncome from "./Income_sum/Income_sum";
import calculateTotalExpense from "./Income_sum/Expense_sum";

export default function General() {
  const { setModal_ExpenseAdd } = useContext(ContextProvider);
  const { setModal_IncomeAdd } = useContext(ContextProvider);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  // const totalIncome = calculateTotalIncome(incomes);

  let totalIncome_storage = localStorage.getItem("totalIncomeCurrMonth") || 0;
  const [totalIncome, setTotalIncome] = useState(parseFloat(totalIncome_storage));
  let totalExpense_storage = localStorage.getItem("totalExpenseCurrMonth") || 0;
  const [totalExpense, setTotalExpense] = useState(parseFloat(totalExpense_storage));


  // const totalExpense = calculateTotalExpense(expenses);

  const pelnasWidth = ((totalIncome / (totalIncome + totalExpense)) * 100);
  const islaidosWidth = ((totalExpense / (totalIncome + totalExpense)) * 100);

  const getIncomes = async () => {
    try {
      const res = await axios.get("/income?");
      setIncomes(res.data.data.incomes);
      setTotalIncome(calculateTotalIncome(res.data.data.incomes));
    } catch (err) {
      console.log(err);
    }
  };
  const getExpense = async () => {
    try {
      const res = await axios.get("/expense?");
      setExpenses(res.data.data.expenses);
      setTotalExpense(calculateTotalExpense(res.data.data.expenses));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);

  useEffect(() => {
    const pelnasWidth = (totalIncome / (totalIncome + totalExpense)) * 100 + "%";
    const islaidosWidth = (totalExpense / (totalIncome + totalExpense)) * 100 + "%";

    document.documentElement.style.setProperty("--pelnas-width", pelnasWidth);
    document.documentElement.style.setProperty("--islaidos-width", islaidosWidth);
  }, [totalIncome, totalExpense]);
  const generalPageUpdate = () => {
    getIncomes();
    getExpense();
  }
  return (
   <main className="main_back General">
      <div className="top-container">
        <div className="stats-containers">
          <div className="stat-container">
            <p>
              Likutis: <span className="green">{parseFloat(totalIncome-totalExpense).toFixed(2)}€</span>
            </p>
          </div>
  
          <div className="stat-container isleista-per-men">
            <p>
              Išleista per mėn: <span className="red">{parseFloat(totalExpense).toFixed(2)}€</span>
            </p>
          </div>
  
          <div className="horizontal-bar-container">
            <div className="horizontal-bar__pelnas">{parseFloat(totalIncome).toFixed(2)} €</div>
            <div className="horizontal-bar__islaidos">{parseFloat(totalExpense).toFixed(2)} €</div>
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

          <ExpenseHistory generalPageUpdate={generalPageUpdate}/>
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
          <IncomeHistory generalPageUpdate={generalPageUpdate}/>
        </div>
      </div>
    </main>
  );
}
