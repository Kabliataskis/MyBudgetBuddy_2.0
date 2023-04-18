import React, { useState, useEffect, useContext } from "react";
import './Islaidos_dizainas.css';
import { v4 as uuidv4 } from "uuid";
import Task from "./Islaidos_funk";
import swal from 'sweetalert2'
import '../../index.css';
import { MdKeyboardDoubleArrowLeft ,MdKeyboardDoubleArrowRight ,MdOutlineKeyboardArrowRight ,MdKeyboardArrowLeft} from "react-icons/md";
import { ContextProvider } from "../../App";
function Islaidos () {
	const { modal_ExpenseModal, setModal_ExpenseModal} = useContext(ContextProvider);
	const [tasks,setTasks] = useState([
		{id:1, data: "2023-03-28",kategorija: "Transportas", pavadinimas: "Remontas", suma: "200€"},
		{id:2, data: "2023-03-28",kategorija: "Mokesčiai", pavadinimas: "Elektra", suma: "500€"},
		{id:3, data: "2023-03-28",kategorija: "Parduotuvė", pavadinimas: "Norfa", suma: "20€"},
		{id:4, data: "2023-03-28",kategorija: "Sveikata", pavadinimas: "Vaistai", suma: "30€"},
		{id:5, data: "2023-03-28",kategorija: "Parduotuvė", pavadinimas: "Maxima", suma: "100€"},
		{id:6, data: "2023-03-28",kategorija: "Transportas", pavadinimas: "Kuras", suma: "80€"},
		{id:7, data: "2023-03-28",kategorija: "Mokesčiai", pavadinimas: "Vanduo", suma: "150€"}
	]);

	function deleteTask (id) {
		swal.fire({
			title: "Veiksmo patvirtinimas",
			text: "Ar tikrai norite ištrinti įrašą?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#243743',
			confirmButtonText: 'Ištrinti',
			cancelButtonText: "Atšaukti!"
	
		  }).then((result) => {
			if (result.isConfirmed) {
				// užklausa į backend
	
				// success
				swal.fire({
					title: 'Sėkmingai',
					text: 'Įrašas ištrintas',
					icon: 'success',
					confirmButtonColor: '#28b78d',
				 });
			  }
		  });
		}

		const[value,setValue] = useState('')

		const filterTask = tasks.filter(taskss =>{
			return taskss.pavadinimas.toLocaleLowerCase().includes(value.toLocaleLowerCase()) 
		})

	let tasks_list = filterTask.map((el) =>{
		return(
			<Task
			key={uuidv4()}
			obj={el}
			id={el.id}
			data={el.data}
			kategorija={el.kategorija}
			pavadinimas={el.pavadinimas}
			suma={el.suma}
			deleteTask={deleteTask}
			/>
		);
	});



	return (
		<div className='main_back'>	

		<div className='container_pajamos'>
			<h3 className="h3-text">Išlaidos</h3>
			<div className="block_pajamos">
				<p className="block_pajamo">Mėnesio išlaidos: <span className='red-eur'>5956€</span></p>
				<button className="btnAdd" onClick={() => setModal_ExpenseModal(true)}>Įvesti išlaidas</button>
			</div>
		</div >

		<div className='container_pajamos flex_container'>
				<div className='table_main'>
					<table>
						<thead>
							<tr>
								<th>Data</th>
								<th>Kategorija</th>
								<th>Pavadinimas</th>
								<th>Suma</th>
								<th>Redaguoti</th>
								<th>Pašalinti</th>
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
							<li><MdOutlineKeyboardArrowRight/></li>
							<li ><MdKeyboardDoubleArrowRight/></li>
							
						</ul>
						<button className="btn_csv">Eksportuoti .CSV</button>
					</div>
					
				</div>

				<div className="block_filtro">
					<h3>Filtravimas</h3>
					<div>
						<form>
							<input
								type="text"
								placeholder="Paieška..."
								className="paieska_filter"
								onChange={(event) => setValue(event.target.value)}

							/>
							<select className="dropdown-kategorija" name="Kategorija" id="Kategorija">
								<option value="kategorija">Kategorija</option>
								<option value="transportas">Transportas</option>
								<option value="parduotuve">Parduotuvė</option>
								<option value="mokesciai">Mokesčiai</option>
								<option value="sveikata">Sveikata</option>
							</select>
							<p className="data_filter_p"><label htmlFor="nuo_data" >Nuo</label> <input className="data_filter" type="date" id="nuo_data"/> <label htmlFor="iki_data">iki</label> <input className="data_filter" type="date" id="iki_data"/></p>
							<button className="btn-dark">Ieškoti</button>
						</form>
					</div>
				</div>
				
		</div>
		
	</div>
	);
}

export default Islaidos;
