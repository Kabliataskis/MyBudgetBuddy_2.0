/* eslint-disable linebreak-style */
import React from 'react';
import './Pajamos_dizainas.css';
import swal from 'sweetalert2'

function Pajamos () {
	function delete_pajamas (id) {
		swal.fire({
			title: "Veiksmo patvirtinimas",
			text: "Ar tikrai norite ištrinti įrašą?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: '#b72828',
			cancelButtonColor: '#8a949b',
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
	return (
		<div>
			<button onClick={()=>delete_pajamas(1)}>Delete pajama</button>
		</div>
	);
}

export default Pajamos;

