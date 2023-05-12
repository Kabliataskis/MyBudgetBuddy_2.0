import React from "react";
import { FaPiggyBank } from "react-icons/fa";
export default function Expense(props) {
  const { obj } = props;
  const { _id, category , date, title, sum } = obj;

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
        {/* <FaPiggyBank /> */}
        <img className="General-category-img" src={category.imgSrc} alt={category.title}/>
      </td>
      <td>{formatDate(date)}</td>
      <td>{category.title}</td>
      <td>{title}</td>
      <td className="red-eur">-{sum}€</td>
    </tr>
  );
}
