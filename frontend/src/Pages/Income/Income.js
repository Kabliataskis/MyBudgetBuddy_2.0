import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import "./Income.css";
import { formatDate } from "../../func";

export default function Income(props) {
  const { obj, editIncome, deleteIncome } = props;
  const { _id, date, title, sum } = obj;
  return (
    <tr>
      <td className="nowrap">{formatDate(date)}</td>
      <td>{title}</td>
      <td className="color-eur">+{sum}€</td>
      <td className="">
        <button
          className="btn_change"
          onClick={() => {
            editIncome(_id);
          }}
        >
          <FaPen />
        </button>
      </td>
      <td>
        <button className="btn_trash" onClick={() => deleteIncome(_id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
