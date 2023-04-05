import React from "react";
import { FaTrash , FaPen } from "react-icons/fa";

import './Pajamos_dizainas.css';
export default function Task(props){
    const{id,data,saltynis,suma, deleteTask} = props;

    
    return(
        <tr className={""}>
           <td>{data}</td>
			<td>{saltynis}</td>
			<td className='color-eur'>+{suma}</td>
            <td>
                <FaPen/>
            </td>
            <td className="">
                <button
                className="btn_trash"
                onClick={() => deleteTask(id)}
                >
                    <FaTrash/>
                </button>
            </td>
        </tr>
    );
}


