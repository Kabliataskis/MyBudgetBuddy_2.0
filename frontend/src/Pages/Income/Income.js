import React from "react";
import { FaTrash , FaPen } from "react-icons/fa";
import './Income.css';

export default function Income(props){
    const{obj, editIncome, deleteIncome} = props;
    const {_id, date, title, sum} = obj;

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
			<td>{title}</td>
			<td className='color-eur'>+{sum}€</td>
            <td className="">
                <button 
                className="btn_change"
                onClick={() => {
                editIncome(_id)}}
                >
                      <FaPen/>
                </button>
              
            </td>
            <td>
                <button
                className="btn_trash"
                onClick={() => deleteIncome(_id)}>
                    <FaTrash/>
                </button>
            </td>
        </tr>
    );
}