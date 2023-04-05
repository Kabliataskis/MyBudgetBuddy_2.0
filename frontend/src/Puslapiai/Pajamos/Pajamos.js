import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "./Pajamos_funk";
import './Pajamos_dizainas.css';
import swal from 'sweetalert2'
import '../../index.css';
import { MdKeyboardDoubleArrowLeft ,MdKeyboardDoubleArrowRight ,MdOutlineKeyboardArrowRight ,MdKeyboardArrowLeft} from "react-icons/md";
export default function Pajamos_idetos(){


const [tasks,setTasks] = useState([
	{id:1, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:2, data: "2023-03-28",saltynis: "Norfa", suma: "20€"},
	{id:3, data: "2023-03-28",saltynis: "Lidl", suma: "20€"},
	{id:4, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:5, data: "2023-03-28",saltynis: "Iki", suma: "20€"},
	{id:6, data: "2023-03-28",saltynis: "Maxima", suma: "20€"},
	{id:7, data: "2023-03-28",saltynis: "Rimi", suma: "20€"}
]);

function deleteTask (id) {
	swal.fire({
		title: "Veiksmo patvirtinimas",
		text: "Ar tikrai norite ištrinti įrašą?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Ištrinti',
		cancelButtonText: "Atšaukti!"
	  }).then((result) => {
		if (result.isConfirmed) {
			// užklausa į backend

			// success
			swal.fire(
			  'Sėkmingai!',
			  'Įrašas ištrintas',
			  'success'
			)
		  }
	  });
	}
// const deleteTask = (id) =>{
//     setTasks(tasks.filter((item) => item.id !== id));
// };

const[value,setValue] = useState('')

const filterTask = tasks.filter(taskss =>{
	return taskss.saltynis.toLocaleLowerCase().includes(value.toLocaleLowerCase()) 
})

let tasks_list = filterTask.map((el) =>{
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
				<button  className='btn-gren'>Įvesti pajamas</button>
			</div>
		</div >

		<div className='container_pajamos flex_container'>
				<div className='table_main'>
					<table>
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
					<div className="paginacina_container">
						<ul>
							<li ><MdKeyboardDoubleArrowLeft/></li>
							<li><MdKeyboardArrowLeft/></li>
							<li className="select">1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>6</li>
							<li>7</li>
							<li><MdOutlineKeyboardArrowRight/></li>
							<li ><MdKeyboardDoubleArrowRight/></li>
						</ul>
					</div>
				</div>

				<div className="block_filtro">
					<h3>Filtravimas</h3>
					<div>
						<form>
							<input
								type="text"
								placeholder="Paieska..."
								className="paieska_filter"
								onChange={(event) => setValue(event.target.value)}

							/>
							<p className="data_filter_p"><label htmlFor="nuo_data" >Nuo</label> <input className="data_filter" type="date" id="nuo_data"/> <label htmlFor="iki_data">iki</label> <input className="data_filter" type="date" id="iki_data"/></p>
							<button className="btn-dark">Ieskoti</button>
						</form>
					</div>
				</div>
				
		</div>
	</div>	
)
}



