import React from 'react';
import "./Navbar.css";
import { BsGraphUpArrow, BsGraphDownArrow } from 'react-icons/bs';
import {AiOutlineHome} from "react-icons/ai";
import {TbPigMoney} from 'react-icons/tb';
import {GrUserAdmin} from 'react-icons/gr';
import {VscHistory} from 'react-icons/vsc';
import {IoIosLogOut} from 'react-icons/io';

// import Pirmas_puslapis from './Puslapiai/Pagrindinis_puslapis/Pagrindinis_puslapis';
// import Pajamos from './Puslapiai/Pajamos/Pajamos';
// import Islaidos from './Puslapiai/Islaidos/Islaidos';

function Navbar(props) {
  
    return (
   <>
   {/* <Router>
<Switch>
		<Route exact path="/">
			<Pirmas_puslapis />
		</Route>
		<Route path="/income">
			<Pajamos />
		</Route>
		<Route path='/expenses'>
			<Islaidos />
		</Route>
</Switch>
</Router> */}
  
   <nav className="navbar">
	<div className="navbar-logo">
        <a href="/">Logo</a>
    </div>
	<ul className= "navbar-links">
        
		<div className='firt_order'>
            <li className="navbar-item">
			{/* <Link to="/">Pagrindinis</Link> */}
            <AiOutlineHome />Pagrindinis
		</li>
		<li className="navbar-item">
			{/* <Link to="/income">Išlaidos</Link> */}
            <BsGraphUpArrow /> pajamos
		</li>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <BsGraphDownArrow /> islaidos
		</li>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
           <TbPigMoney /> biudzetas
		</li>
        </div>
        <div className='second_order'>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <GrUserAdmin />admin
		</li>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <VscHistory />istorija
		</li>
        </div>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <IoIosLogOut /> atsijungti
		</li>
	</ul>
</nav>
</>
  );
}

export default Navbar;