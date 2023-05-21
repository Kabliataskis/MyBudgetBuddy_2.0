import React from "react";
import { useAuth } from "../../Context/auth";
import "./Navbar.css";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import logo from "../../Assets/Images/logo.png";

export default function Navbar() {
  const auth = useAuth();
  return (
    <div className="Navbar">
      <div className="top_nav">{auth.user && auth.user["username"]}</div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        {
          auth.user && (
            <ul className="navbar-links">
              <div className="firt_order">
                <Link to="/" id="nav_apzvalga">
                  <li className="navbar-item">
                    <AiOutlineHome className="nav_icon" />
                    <span className="navbar-item__title">Bendra apžvalga</span>
                  </li>
                </Link>
                <Link to="/income" id="nav_pajamos">
                  <li className="navbar-item">
                    <BsGraphUpArrow className="nav_icon" />
                    <span className="navbar-item__title">Pajamos</span>
                  </li>
                </Link>
                <Link to="/expense" id="nav_islaidos">
                  <li className="navbar-item">
                    <BsGraphDownArrow className="nav_icon" />
                    <span className="navbar-item__title">Išlaidos</span>
                  </li>
                </Link>
                <Link to="/budget" id="nav_biudzetas">
                  <li className="navbar-item">
                    <TbPigMoney className="nav_icon" />
                    <span className="navbar-item__title"> Biudžetas</span>
                  </li>
                </Link>
              </div>
              <div className="second_order">
                {auth.user["role"] === "admin" && (
                  <Link to="/admin" id="nav_admin">
                    <li className="navbar-item">
                      <HiOutlineUserCircle className="nav_icon" />
                      <span className="navbar-item__title">Admin</span>
                    </li>
                  </Link>
                )}
                <Link
                  to="/logout"
                  id="nav_atsijungti"
                  onClick={() => auth.logout()}
                >
                  <li className="navbar-item">
                    <IoIosLogOut className="nav_icon" />
                    <span className="navbar-item__title">Atsijungti</span>
                  </li>
                </Link>
              </div>
            </ul>
          )}
      </nav>
     </div>
  );
}
