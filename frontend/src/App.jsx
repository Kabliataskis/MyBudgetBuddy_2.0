/* eslint-disable linebreak-style */
import React from 'react';
import Pirmas_puslapis from './Puslapiai/Pagrindinis_puslapis/Pagrindinis_puslapis';
import Pajamos from './Puslapiai/Pajamos/Pajamos';
import Islaidos from './Puslapiai/Islaidos/Islaidos';
import Login from './Puslapiai/Login_forma/Login_forma';

const App = () => {
	return (
		<div>
			App
			<Pirmas_puslapis />
			<Pajamos />
			<Islaidos/>
			<Login/>
		</div>
	);
};

export default App;