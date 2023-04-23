import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import "./Expense.css";

export default function Expense(props) {
  const {
    id,
    data,
    kategorija,
    pavadinimas,
    suma,
    editExpense,
    deleteExpense,
  } = props;
  return (
    <tr>
      <td>{data}</td>
      <td>{kategorija}</td>
      <td>{pavadinimas}</td>
      <td className="red-eur">-{suma}</td>
      <td>
        <button
          className="btn_change"
          onClick={() => {
            editExpense(id);
          }}
        >
          <FaPen />
        </button>
      </td>
      <td>
        <button className="btn_trash" onClick={() => deleteExpense(id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
