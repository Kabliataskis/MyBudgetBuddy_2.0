/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import './Budget.css';
import DoughnutChart from "../General/Charts/DoughnutChart";
import MultiAxis from "./Charts/Multiaxis_Line_Chart";
import {FaPen } from "react-icons/fa";
import {MdDownloadDone } from "react-icons/md";


export default function Budget () {


	const [limit, setLimit]= useState({
		amount: 1195,
		status: false
	});

	function statusChange() {
		setLimit(prevLimit => ({
		  ...prevLimit,
		  status: !prevLimit.status
		}));
	  }
	//   const [inputLimit, setInputLimit] = useState('');

	//   const handleInputChange = (event) => {
	// 	setInputLimit(event.target.value);
	//   };
	
	//   const handleButtonClick = () => {
	// 	setLimit({ ...limit, amount: `${limit.amount}` });
	// 	setInputLimit('');
	//   };


	
	return (
		<div className='Budget-container Budget'>
			<div className="top-container">
        		<div className="stats-containers">
          			<div className="stat-container isleista-per-men">
            			<p>
						Išleista per mėn: <span className="red">1044.94€</span>
            			</p>
          			</div>	
          			<div className="stat-container data">
            			<p>
              			Mėnuo: 
						</p>
						<select
						 	className="dropdown-month"
               				name="month"
               			 	id="month"
              			>
                			<option value="now">Šis men.</option>
                			<option value="2023-04">04 men.</option>
                			<option value="2023-03">03 men.</option>
                			<option value="2023-02">02 men.</option>
                			<option value="2023-01">01 men.</option>
              			</select>
          			</div>
        		</div>

       			<div className="doughnut-chart-container">
          			<DoughnutChart />
       		 	</div>
			</div>
			<div className='center-container'>
				<h2>Pajamų ir išlaidų palyginimas</h2>
				<div className='compares-container'>
					<div className='inside-container'>
						<div className="compare-container from">
							<p>
							nuo:
							</p>
							<select
								className="dropdown-month"
								name="month"
								id="month"
							>
								<option value="now">Šis men.</option>
								<option value="2023-04">04 men.</option>
								<option value="2023-03">03 men.</option>
								<option value="2023-02">02 men.</option>
							<option value="2023-01">01 men.</option>
							</select>
						</div>	
						<div className="compare-container until">
							<p>
							iki: 
							</p>
							<select
								className="dropdown-month"
								name="month"
								id="month"
							>
								<option value="now">Šis men.</option>
								<option value="2023-04">04 men.</option>
								<option value="2023-03">03 men.</option>
								<option value="2023-02">02 men.</option>
							<option value="2023-01">01 men.</option>
							</select>
						</div>
					</div>
					<div className="multiaxis-chart-container">
          			<MultiAxis />
       		 		</div>
				</div>
			</div>
			<div className='bottom-container'>
				<h2>Nustatytos kategorijos biudžėtas</h2>
				<div className='budget-container'>
					<div className='budget-dropdown-category'>
						<select	
						className="dropdown-category"		
						name="category"		
						id="category"		
						>
							<option value="">Pasirinkti kategorija:</option>
							<option value="all">Bendrai</option>
							<option value="Shop">Parduotuvė</option>
							<option value="transport">Transportas</option>
							<option value="bills">Mokesčiai</option>
							<option value="health">Sveikata</option>
						</select>	
					</div>
					<div className='budget-category'>
						<div className='budget-history'>
						
							<p>
							Kategorijos biudžėto istorija: 
							</p>
							<select
							className="dropdown-history-month"
							name="month"
							id="month"
							>
							<option value="now">Šis men.</option>
							<option value="2023-04">04 men.</option>
							<option value="2023-03">03 men.</option>
							<option value="2023-02">02 men.</option>
							<option value="2023-01">01 men.</option>
							</select>
							
						</div>
						<div className='budget-linechart'>
							<div className="horizontal-bar__pelnas">4910 €</div>
            				<div className="horizontal-bar__islaidos">1044.94 €</div>
						</div>
					</div>
					<div className='budget-status'>
						<p>Nustatytas biudžėtas: <span className="green">{limit.amount}</span> € </p>
						<button onClick={() => 
							 statusChange(limit)}>{limit.status ? <span className="green"><MdDownloadDone /></span> : <span className="red"><FaPen /></span>}</button>
					{/* <button onClick={() => 
							 statusChange(limit)}>{limit.status ? <span><input
								type='text'
								 />
								 <span className="green"><MdDownloadDone /></span></span> 
							  :  <span><span className="green">{limit.amount}</span>€<span className="red"><FaPen /></span></span>}</button> */}
						<p>
						(Vidutiniškai išleidžiama: <span className="red">1045.45 €</span> )
						</p>
    				</div>
					
				</div>
			</div>
		</div>

	);
}
