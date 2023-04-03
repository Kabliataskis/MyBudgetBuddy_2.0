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
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ištrinti',
            cancelButtonText: "Atšaukti!"
		  }).then((result) => {
			if (result.isConfirmed) {
				// užklausa į backend

				// success
				// swal.fire(
				//   'Deleted!',
				//   'Your file has been deleted.',
				//   'success'
				// )
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

