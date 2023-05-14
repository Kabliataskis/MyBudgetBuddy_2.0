import React from "react";
import { formatDateFull } from "../../../func";
export default function Action(props) {
  const { obj } = props;
  const { _id, user_id, createdAt, action, data } = obj;
  const { username } = user_id;
  let action_title;
  let details;
  switch (action) {
    case "login":
      action_title = "Prisijungimas";
      details = '-';
      break;
    case "category_add":
      action_title = "Sukurta kategorija";
      details = data.title;
      break;
    case "category_edit":
      action_title = "Kategorijos redagavimas";
      details = data.title;
      break;
    case "category_delete":
      action_title = "Kategorijos trynimas";
      details = data.title;
      break;
    case "user_updateRole":
      action_title = "Rolės atnaujinimas";
      details = `Slapyvardis: ${data.username}, nauja rolė: ${data.role}`;
      break;
    case "user_edit":
      action_title = "Vartotojo redagavimas";
      details = `Redaguotas vartotojas: ${data.username}`;
      break;
    case "user_delete":
      action_title = "Vartotojo trinimas";
      details = `Slapyvardis: ${data.username}`;
      break;
    case "income_add":
      action_title = "Pajamų pridėjimas";
      details = `Pavadinimas: ${data.title}, suma: +${data.sum} €`;
      break;
    case "income_edit":
      action_title = "Pajamų redagavimas";
      details = `Pavadinimas: ${data.title}`;
      break;
    case "income_delete":
      action_title = "Pajamų trinimas";
      details = `Pavadinimas: ${data.title}`;
      break;
      case "expense_add":
        action_title = "Išlaidų pridėjimas";
        details = `Pavadinimas: ${data.title}, suma: -${data.sum} €`;
        break;
      case "expense_edit":
        action_title = "Išlaidų redagavimas";
        details = `Pavadinimas: ${data.title}`;
        break;
      case "expense_delete":
        action_title = "Išlaidų trinimas";
        details = `Pavadinimas: ${data.title}`;
        break;
    default:
      action_title = action;
      details = '-';
      break;
  }

  return (
    <tr>
      <td>{formatDateFull(createdAt)}</td>
      <td>{username}</td>
      <td>{action_title}</td>
      <td>{details}</td>
    </tr>
  );
}
