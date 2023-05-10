import React, { useState, useEffect } from "react";
import "./Admin.css";
import Categories from "./Categories/Categories";
import Users from "./Users/Users";
import { useNavigate, useLocation } from 'react-router-dom';

export const Admin = () => {
  const [showPage, setShowPage] = useState("categories");
  const navigate = useNavigate();
  const location = useLocation();

  const funcShowPage = (title) => {
    setShowPage(title);
    navigate('?type='+title, { replace: true }); // add URL parameter
  }


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    if(type == "categories" || type == "users" || type == "logs"){
        setShowPage(type);
    }
  }, [location.search]);




  return (
    <div className="main-container">
      <div className="container-admin-nav">
        <h3 className="h3-text">Admin</h3>
        <div className="Admin-nav-items-container">
            <button className={showPage == "categories" ? "Admin-nav-item  selected" : "Admin-nav-item"} onClick={() => funcShowPage('categories')}>Kategorijos</button>
            <button className={showPage == "users" ? "Admin-nav-item  selected" : "Admin-nav-item"} onClick={() => funcShowPage('users')}>Vartotojai</button>
            <button className={showPage == "logs" ? "Admin-nav-item  selected" : "Admin-nav-item"} onClick={() => funcShowPage('logs')}>Įvykių žurnalas</button>
        </div>
      </div>

      {showPage == 'categories' ? <Categories/> : null}
      {showPage == 'users' ? <Users/> : null}
      {showPage == 'logs' ? <Users/> : null}
    </div>
  );
};

export default Admin;
