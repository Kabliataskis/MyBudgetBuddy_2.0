import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { formatDate } from "../../../func";
export default function User(props) {
  const { obj, editUser, deleteUser, updateUserRole } = props;
  const { _id, createdAt, username, email, role } = obj;
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
         type="button" title="Redaguoti" 
          className="btn_change"
          onClick={() => {
            editUser(_id);
          }}
        >
          <FaPen />
        </button>
      </td>
      <td>
        <button type="button" title="Ištrinti" className="btn_trash" onClick={() => deleteUser(_id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
