import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import "./Expense.css";

export default function Expense(props) {
  const{obj, editExpense, deleteExpense} = props;
  const {_id, date, title, sum} = obj;
  let kategorija="eletra";

  const formatDate = (date) => {
    date =  new Date(date);
    let m = String(date.getMonth() + 1).padStart(2, '0'); // month with leading zero
    let d = String(date.getDate()).padStart(2, '0'); // day with leading zero
    let y = date.getFullYear()  // year
    return `${y}-${m}-${d}`;
}

  return (
    <tr>
      <td>{formatDate(date)}</td>
      <td>{kategorija}</td>
      <td>{title}</td>
      <td className="red-eur">-{sum}€</td>
      <td>
        <button
          className="btn_change"
          onClick={() => {
            editExpense(_id);
          }}
        >
          <FaPen />
        </button>
      </td>
      <td>
        <button className="btn_trash" onClick={() => deleteExpense(_id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
