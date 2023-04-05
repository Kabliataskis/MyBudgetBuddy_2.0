import React from 'react';
import "./Navbar.css";
import { BsGraphUpArrow, BsGraphDownArrow } from 'react-icons/bs';
import {AiOutlineHome} from "react-icons/ai";
import {TbPigMoney} from 'react-icons/tb';
import {GrUserAdmin} from 'react-icons/gr';
import {VscHistory} from 'react-icons/vsc';
import {IoIosLogOut} from 'react-icons/io';
import logo from './logo.png';

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
	<div className='top_nav'></div>
   <nav className="navbar">
	<div className="navbar-logo">
	<img src={logo} alt="Logo" />
    </div>
	<ul className= "navbar-links">
        
		<div className='firt_order'>
            <li className="navbar-item">
			{/* <Link to="/">Pagrindinis</Link> */}
            <AiOutlineHome className='nav_icon'/>Pagrindinis
		</li>
		<li className="navbar-item">
			{/* <Link to="/income">Išlaidos</Link> */}
            <BsGraphUpArrow className='nav_icon'/> pajamos
		</li>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <BsGraphDownArrow className='nav_icon'/> islaidos
		</li>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
           <TbPigMoney className='nav_icon'/> biudzetas
		</li>
        </div>
        <div className='second_order'>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <GrUserAdmin className='nav_icon'/>admin
		</li>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <VscHistory className='nav_icon'/>istorija
		</li>
        </div>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <IoIosLogOut className='nav_icon'/> atsijungti
		</li>
	</ul>
</nav>
</>
  );
}

export default Navbar;