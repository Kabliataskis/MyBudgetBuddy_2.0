import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import Expense from "./Expense";
import axios from "../../../axios";
import ExpenseAddModal from "../../Expense/ExpenseAddModal";
//Icons
import { FaPiggyBank } from "react-icons/fa";


export default function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);

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
