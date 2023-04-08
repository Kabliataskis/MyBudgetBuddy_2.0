import React from "react";
import { FaTrash , FaPen } from "react-icons/fa";

import './Pajamos_dizainas.css';

export default function Task(props){
    const{obj, id,data,saltynis,suma,keitimas,setEditPajamos, deleteTask} = props;
    
    return(
        <tr className={""}>
           <td>{data}</td>
			<td>{saltynis}</td>
			<td className='color-eur'>+{suma}</td>
            <td className="">
                <button 
                className="btn_change"
                onClick={() => {setEditPajamos(obj); keitimas(id)}}
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
