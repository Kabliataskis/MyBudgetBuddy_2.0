/* eslint-disable linebreak-style */
import React from 'react';
import './Pagrindinis_puslapis_dizainas.css';

function Pirmas_puslapis () {
	return (
	
	<div className='Pagrindinis-container'>
		<div className='top-container'>
			<div className='stats-containers'>
				<div className='stat-container'>
					<p>Biudzetas: <span className='green'>399023€</span></p>
				</div>
				<div className='stat-container isleista-per-men'>
					<p>Isleista per men: <span className='red'>329903€</span></p>
				</div>
			</div>
		</div>
		<div className='history-containers'>
			<div className='history-container'>
				<button type='button'>Įvesti išlaidas</button>
				<div className='history-top-line'></div>
				<table>
					<tr>
						<td>Icon</td>
						<td>2022-03-22</td>
						<td>Maxima</td>
						<td className="red">-10.99</td>
					</tr>
					<tr>
						<td>Icon</td>
						<td>2022-03-22</td>
						<td>Transportas</td>
						<td className="red">-105.99</td>
					</tr>
					<tr>
						<td>Icon</td>
						<td>2022-03-22</td>
						<td>Lorem ipsum dalor lorem</td>
						<td className="red">-10.99</td>
					</tr>
				</table>
			</div>

			<div className='history-container'>
				<button type='button'>Įvesti pajamas</button>
				<div className='history-top-line'></div>
				<table>
					<tr>
						<td>Icon</td>
						<td>2022-03-22</td>
						<td>Maxima</td>
						<td className="green">10.99</td>
					</tr>
					<tr>
						<td>Icon</td>
						<td>2022-03-22</td>
						<td>Maxima</td>
						<td className="green">10.99</td>
					</tr>
					<tr>
						<td>Icon</td>
						<td>2022-03-22</td>
						<td>Maxima</td>
						<td className="green">10.99</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	);
}

export default Pirmas_puslapis;