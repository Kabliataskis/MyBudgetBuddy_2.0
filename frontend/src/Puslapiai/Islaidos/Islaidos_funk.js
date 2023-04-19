import React from "react";
import { FaTrash , FaPen } from "react-icons/fa";
import './Islaidos_dizainas.css';

export default function Task(props){
    const{id,data,kategorija,pavadinimas,suma, editing, deleteTask} = props;
    return(
        <tr className={""}>
            <td>{data}</td>
            <td>{kategorija}</td>           
			<td>{pavadinimas}</td>
			<td className='red-eur'>-{suma}</td>
            <td className="">
                <button 
                className="btn_change"
                onClick={() => {editing(id)}}
                >
                      <FaPen/>
                </button>
              
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