import React from 'react';
import "./Navbar.css";
import { BsGraphUpArrow, BsGraphDownArrow } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {AiOutlineHome} from "react-icons/ai";
import {TbPigMoney} from 'react-icons/tb';
import {GrUserAdmin} from 'react-icons/gr';
import {VscHistory} from 'react-icons/vsc';
import {IoIosLogOut} from 'react-icons/io';
import logo from './logo.png';



function Navbar(props) {
  
    return (
   <>
 
	<div className='top_nav'></div>
   <nav className="navbar">
	<div className="navbar-logo">
	<img src={logo} alt="Logo" />
    </div>
	<ul className= "navbar-links">
        
		<div className='firt_order'>
            <li className="navbar-item">
			<Link to="/"><AiOutlineHome className='nav_icon'/>Bendra apžvalga</Link>
            
		</li>
		<li className="navbar-item">
			<Link to="/pajamos"><BsGraphUpArrow className='nav_icon'/> Pajamos</Link>
            
		</li>
        <li className="navbar-item">
		<Link to="/income"><BsGraphDownArrow className='nav_icon'/> Išlaidos</Link>
            
		</li>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
           <TbPigMoney className='nav_icon'/> Biudžetas
		</li>
        </div>
        <div className='second_order'>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <GrUserAdmin className='nav_icon'/>Admin
		</li>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <VscHistory className='nav_icon'/>Istorija
		</li>
        </div>
        <li className="navbar-item">
			{/* <Link to="/">Išlaidos</Link> */}
            <IoIosLogOut className='nav_icon'/> Atsijungti
		</li>
	</ul>
</nav>
</>
  );
}

export default Navbar;