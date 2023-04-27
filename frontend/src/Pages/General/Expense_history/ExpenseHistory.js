import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import Expense from "./Expense";
import axios from "../../../axios";
import ExpenseAddModal from "../../Expense/ExpenseAddModal";
//Icons
import { FaPiggyBank } from "react-icons/fa";


export default function ExpenseHistory() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2023-03-28", title: "Maxima", sum: "20€" },
    { id: 2, date: "2023-03-28", title: "Norfa", sum: "20€" },
    { id: 3, date: "2023-03-28", title: "Lidl", sum: "20€" },
    { id: 4, date: "2023-03-28", title: "Maxima", sum: "20€" },
    { id: 5, date: "2023-03-28", title: "Iki", sum: "20€" },
    { id: 6, date: "2023-03-28", title: "Maxima", sum: "20€" },
    { id: 7, date: "2023-03-28", title: "Rimi", sum: "20€" },
  ]);

  const getExpenses = async () => {
    try {
      const res = await axios.get("/expense?limit=5");
      setExpenses(res.data.data.expenses);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getExpenses();
  }, []);

  let expenses_list = expenses.map((el) => {
    return (
      <Expense
        obj={el}
        key={uuidv4()}
        id={el._id}
      />
    );
  });
  return (
    <>
    <ExpenseAddModal getExpenses={getExpenses} />
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Kategorija</th>
          <th>Pavadinimas</th>
          <th>Suma</th>
        </tr>
      </thead>
      <tbody>
        {expenses_list}
      </tbody>
    </table>
    </>
  );
}
