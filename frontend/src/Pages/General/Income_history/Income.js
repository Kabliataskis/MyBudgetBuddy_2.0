import React from "react";
import { FaPiggyBank } from "react-icons/fa";
export default function Income(props) {
  const { obj } = props;
  const { _id, date, title, sum } = obj;

  const formatDate = (date) => {
    date = new Date(date);
    let m = String(date.getMonth() + 1).padStart(2, "0"); // month with leading zero
    let d = String(date.getDate()).padStart(2, "0"); // day with leading zero
    let y = date.getFullYear(); // year
    return `${y}-${m}-${d}`;
  };

  return (
    <tr>
      <td>
        <FaPiggyBank />
      </td>
      <td>{formatDate(date)}</td>
      <td>{title}</td>
      <td className="color-eur">+{sum}€</td>
    </tr>
  );
}
