import React from "react";
import { FaTrash } from "react-icons/fa";
import './Pajamos_dizainas.css';
export default function Task(props){
    const{id,data,saltynis,suma, deleteTask} = props;

    
    return(
        <tr className={""}>
           <td>{data}</td>
			<td>{saltynis}</td>
			<td className='color-eur'>+{suma}</td>
            <td>
          
            </td>
            <td>
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


