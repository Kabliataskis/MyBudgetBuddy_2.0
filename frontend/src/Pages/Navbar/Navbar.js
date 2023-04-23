import React from "react";
import "./Navbar.css";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";
import { HiOutlineUserCircle } from "react-icons/hi";
import { VscHistory } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";
import logo from "../../Assets/Images/logo.png";

export default function Navbar() {
  return (
    <>
      <div className="top_nav"></div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navbar-links">
          <div className="firt_order">
            <Link to="/" id="nav_apzvalga">
              <li className="navbar-item">
                <AiOutlineHome className="nav_icon" />
                Bendra apžvalga
              </li>
            </Link>

            <Link to="/income" id="nav_pajamos">
              <li className="navbar-item">
                <BsGraphUpArrow className="nav_icon" /> Pajamos
              </li>
            </Link>
            <Link to="/expense" id="nav_islaidos">
              <li className="navbar-item">
                <BsGraphDownArrow className="nav_icon" /> Išlaidos
              </li>
            </Link>
            <Link to="/budget" id="nav_biudzetas">
              <li className="navbar-item">
                <TbPigMoney className="nav_icon" /> Biudžetas
              </li>
            </Link>
          </div>
          <div className="second_order">
            <Link to="/admin" id="nav_admin">
              <li className="navbar-item">
                <HiOutlineUserCircle className="nav_icon" />
                Admin
              </li>
            </Link>
            <Link to="/history" id="nav_istorija">
              <li className="navbar-item">
                <VscHistory className="nav_icon" />
                Istorija
              </li>
            </Link>
          </div>
          <Link to="/logout" id="nav_atsijungti">
            <li className="navbar-item">
              <IoIosLogOut className="nav_icon" /> Atsijungti
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
}
