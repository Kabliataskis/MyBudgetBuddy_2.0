import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "./Pajamos_funk";
import './Pajamos_dizainas.css';
export default function Pajamos_idetos(){

const [tasks,setTasks] = useState([
	{id:1, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:2, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:3, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:4, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:5, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:6, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:7, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:8, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:9, data: "2023-03-28",saltynis: "Maxima", suma: "20€"}
]);



const deleteTask = (id) =>{
    setTasks(tasks.filter((item) => item.id !== id));
};


let tasks_list = tasks.map((el) =>{
    return(
        <Task
        key={uuidv4()}
        id={el.id}
        data={el.data}
        saltynis={el.saltynis}
		suma={el.suma}
        deleteTask={deleteTask}
        />
    );
});


return(
	<div className='main_back'>	
		<div className='container_pajamos'>
			<h3 className="h3-text">Pajamos</h3>
			<div className="block_pajamos">
				<p className="block_pajamo">Mėnesio pajamos: <span className='color-eur'>5956$</span></p>
				<button className='btn-gren'>Įvesti pajamas</button>
			</div>
		</div >

		<div className='container_pajamos'>
			<table className='table_main'>
				<thead>
					<tr>
						<th>Data</th>
						<th>Pajamu Saltynis</th>
						<th>Suma</th>
						<th>Redaguoti</th>
						<th>Pasalinti</th>
					</tr>
				</thead>
				<tbody>{tasks_list}</tbody>
				</table>

		</div>
	</div>	
)
}

