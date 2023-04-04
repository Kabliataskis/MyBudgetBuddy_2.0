/* eslint-disable linebreak-style */
import React from 'react';
import './Pagrindinis_puslapis_dizainas.css';

function Pirmas_puslapis () {
	return (
		<div className='Bendra_informacija'>
			<div className='Informacija'>
				
					<h2> Biudžietas</h2><div className='Pagrindinis-container'>
                    <div className="biudzetas">Biudzetas</div>
       <div className='isleista-per-men'>Isleista per men</div>
       <div className='Pagrindinis-tables-container'>
          <div className="islaidu_table">islaidu table</div>
          <div className= "ivesti_pajomos">ivesti pajomos</div>
        </div>
      </div> 
					<h2> Išleista per menesi</h2>
					<div className='isleista-per-men'>Isleista per men</div>
			</div>
		</div>
	);
}

export default Pirmas_puslapis;