/* eslint-disable linebreak-style */
import React from 'react';
import './Pagrindinis_puslapis_dizainas.css';

function Pirmas_puslapis () {
	return (
	<div className='Pagrindinis-container'>
		<div className='top-container'>
		<div className='controlbiuzetas'>
		<div className='biudzetas'>biudzetas: 5954,94 €</div>
		<div className='isleistacontainer'>Isleista per menesi: 1044,94€</div>
		</div>
		</div>
		<div className='history-containers'>
			<div className='history-container1'>
				<div className='ivestipajomos '>Ivesti islaidos</div>  
			</div>
			<div className='history-container2'>
				<div className='ivestipajamos'>Ivesti Pajamos</div>
				
			</div>
		</div>
	</div>
	);
}

export default Pirmas_puslapis;