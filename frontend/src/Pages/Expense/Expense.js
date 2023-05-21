import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import "./Expense.css";
import { formatDate } from "../../func";
export function getCategories(expenses) {
  const categories = [
    ...new Set(expenses.map((expense) => expense.category.title)),
  ];
  return categories;
}

export function getCategoryTotal(expenses, category) {
  const total = expenses
    .filter((expense) => expense.category.title === category)
    .reduce((sum, expense) => sum + expense.sum, 0);
  return total;
}

export default function Expense(props) {
  const { obj, editExpense, deleteExpense } = props;
  const { _id, date, category, title, sum } = obj;

  return (
    <tr>
      <td className="nowrap">{formatDate(date)}</td>
      <td>{category.title}</td>
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
