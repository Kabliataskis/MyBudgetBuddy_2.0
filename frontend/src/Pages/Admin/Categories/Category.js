import React from "react";
import { FaTrash , FaPen } from "react-icons/fa";

export default function Category(props){
    const{obj, editCategory, deleteCategory} = props;
    const {_id, date, category, img} = obj;

    const formatDate = (date) => {
        date =  new Date(date);
        let m = String(date.getMonth() + 1).padStart(2, '0'); // month with leading zero
        let d = String(date.getDate()).padStart(2, '0'); // day with leading zero
        let y = date.getFullYear()  // year
        return `${y}-${m}-${d}`;
    }

    return(
        <tr>
           <td>{formatDate(date)}</td>
			<td>{category}</td>
            <td><img src={img} alt={category} className="Admin-table-img"/></td>
            <td className="">
                <button 
                className="btn_change"
                onClick={() => {editCategory(_id)}}
                >
                      <FaPen/>
                </button>
              
            </td>
            <td>
                <button
                className="btn_trash"
                onClick={() => deleteCategory(_id)}
                >
                    <FaTrash/>
                </button>
            </td>
        </tr>
    );
}