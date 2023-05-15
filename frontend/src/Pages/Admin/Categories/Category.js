import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { formatDate } from "../../../func";

export default function Category(props) {
  const { obj, editCategory, deleteCategory } = props;
  const { _id, createdAt, title, imgSrc } = obj;

  return (
    <tr>
      <td>{formatDate(createdAt)}</td>
      <td>{title}</td>
      <td>
        <img src={imgSrc} alt={title} className="Admin-table-img" />
      </td>
      <td className="">
        <button
          type="button"
          title="Redaguoti"
          className="btn_change"
          onClick={() => {
            editCategory(_id);
          }}
        >
          <FaPen />
        </button>
      </td>
      <td>
        <button
          type="button"
          title="Ištrinti"
          className="btn_trash"
          onClick={() => deleteCategory(_id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
