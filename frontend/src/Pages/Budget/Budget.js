/* eslint-disable linebreak-style */
import React from 'react';
import './Budget.css';
import DoughnutChart from "../General/Charts/DoughnutChart";

export default function Budget () {
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
					{/* <DoughnutChart /> */}
				</div>
			</div>
		
		</div>

	);
}
