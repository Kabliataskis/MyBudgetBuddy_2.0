import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";

export default function User(props) {
  const { obj, editUser, deleteUser, updateUserRole } = props;
  const { _id, createdAt, username, email, role } = obj;

  const formatDate = (date) => {
    date = new Date(date);
    let m = String(date.getMonth() + 1).padStart(2, "0"); // month with leading zero
    let d = String(date.getDate()).padStart(2, "0"); // day with leading zero
    let y = date.getFullYear(); // year
    return `${y}-${m}-${d}`;
  };

  return (
    <tr>
      <td>{formatDate(createdAt)}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td><select className="Admin-select-dropdown" onChange={(e) => updateUserRole(e, _id, username)}>
          <option>
            {role}
          </option>
          <option>
            {role == 'user' ? 'admin' : 'user'}
          </option>
        </select></td>
      <td>
        <button
          className="btn_change"
          onClick={() => {
            editUser(_id);
          }}
        >
          <FaPen />
        </button>
      </td>
      <td>
        <button className="btn_trash" onClick={() => deleteUser(_id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
