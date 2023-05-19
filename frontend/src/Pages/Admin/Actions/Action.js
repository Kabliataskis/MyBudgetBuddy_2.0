import React from "react";
import { formatDateFull, getActionTitle } from "../../../func";
export default function Action(props) {
  const { obj } = props;
  const { _id, user_id, createdAt, action, data } = obj;
  const { username } = user_id;
  let details;
  switch (action) {
    case "login":
      details = "-";
      break;
    case "category_add":
      details = data.title;
      break;
    case "category_edit":
      details = data.title;
      break;
    case "category_delete":
      details = data.title;
      break;
    case "user_updateRole":
      details = `Slapyvardis: ${data.username}, nauja rolė: ${data.role}`;
      break;
    case "user_edit":
      details = `Redaguotas vartotojas: ${data.username}`;
      break;
    case "user_delete":
      details = `Slapyvardis: ${data.username}`;
      break;
    case "income_add":
      details = `Pavadinimas: ${data.title}, suma: +${data.sum} €`;
      break;
    case "income_edit":
      details = `Pavadinimas: ${data.title}`;
      break;
    case "income_delete":
      details = `Pavadinimas: ${data.title}`;
      break;
    case "expense_add":
      details = `Pavadinimas: ${data.title}, kategorija: ${data.category.title} suma: -${data.sum} €`;
      break;
    case "expense_edit":
      details = `Pavadinimas: ${data.title}`;
      break;
    case "expense_delete":
      details = `Pavadinimas: ${data.title}`;
      break;
    case "limit_edit":
      details = `Nustatytas ${data.limit}€ limitas, kategorija: ${data.category.title}`;
      break;
    default:
      details = "-";
      break;
  }

  return (
    <tr>
      <td>{formatDateFull(createdAt)}</td>
      <td>{username}</td>
      <td>{getActionTitle(action)}</td>
      <td>{details}</td>
    </tr>
  );
}
