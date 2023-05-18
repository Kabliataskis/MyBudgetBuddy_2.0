/* eslint-disable linebreak-style */
import React, { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../../../axios";
import { FaPen } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import Limit from "./Limit";
import LimitEditModal from "./LimitEditModal";
import BeatLoader from "react-spinners/BeatLoader";
export default function Limits() {
    const [loading, setLoading] = useState(true);
    const [modal_limitEdit, setModal_limitEdit] = useState(false);
    const [editId, setEditId] = useState();
    const [limits, setLimits] = useState([])
    const [spents, setSpents] = useState([])



    const [yearDropdownOptions, setYearDropdownOptions] = useState([]);

    const yearDropdownList = yearDropdownOptions.map((year) => (
      <option value={year} key={year}>
        {year}
      </option>
    ));


      const editLimit = (id) => {
        console.log(`edit limit! ${id}`);
        setEditId(id);
        setModal_limitEdit(true);
      }

      
      let limits_list = limits.map((el) => {
        return (
          <Limit
            key={uuidv4()}
            obj={el}
            spents={spents}
            id={el._id}
            editLimit={editLimit}
          />
        );
      });



    

const [dropdownYear, setDropdownYear] = useState(new Date().getFullYear());
const  [dropdownMonth, setDropdownMonth] = useState(new Date().getMonth() +1); // getMonth() returns the month (from 0 to 11) of a date:
const handleYearChange = (e) => {
    setDropdownYear(e.target.value);
}
const handleMonthChange = (e) => {
    setDropdownMonth(e.target.value);
}
useEffect(() => {
  const currentDate = new Date();
  const years = Array.from({ length: currentDate.getFullYear() - 2022 + 1 }, (_, index) => currentDate.getFullYear() - index);
  console.log(years);
  setYearDropdownOptions(years);
}, []);
useEffect(() => {
  makeDate();
}, [dropdownYear, dropdownMonth]);

const makeDate = async () => {
  getLimits(dropdownYear,dropdownMonth);
}

const getLimits = async (year, month) => {
  setLoading(true);
  try {
    console.log("try");
    const res = await axios.get("/limits/"+year+"/"+month);
    console.log(res);
    setLimits(res.data.data.limits);
    setSpents(res.data.data.expenses);
    setLoading(false);
  } catch (err) {
    console.log(err);
  }
}

  return (
      <div className="bottom-container">
        
        {modal_limitEdit ? <LimitEditModal
        getLimits={makeDate}
        modal_limitEdit={modal_limitEdit}
        setModal_limitEdit={setModal_limitEdit}
        editId={editId}
        setEditId={setEditId}
        /> : null}
        <div className="budget-limits-top-container">
         <h2 className="budget-limits-top-container-title">Nustatytos kategorijos biudžetas</h2>
         <div className="budget-limits-dropdowns-container">
         <select
                className="budget-category-limit-dropdown"
                name="year"
                id="year"
                onChange={(e) => handleYearChange(e)}
                value={dropdownYear}
              >
                {/* <option value="now">2023</option> */yearDropdownList}
              </select>
              <select
                className="budget-category-limit-dropdown"
                name="month"
                id="month"
                onChange={(e) => handleMonthChange(e)}
                value={dropdownMonth}
              >
                <option value="1">Sausis</option>
                <option value="2">Vasaris</option>
                <option value="3">Kovas</option>
                <option value="4">Balandis</option>
                <option value="5">Gegužė</option>
                <option value="6">Birželis</option>
                <option value="7">Liepa</option>
                <option value="8">Rugpjūtis</option>
                <option value="9">Rugsėjis</option>
                <option value="10">Spalis</option>
                <option value="11">Lapkritis</option>
                <option value="12">Gruodis</option>
              </select>
              </div>
        </div>
        



        <div className="budget-limits-container">
        {
          loading? 
          <BeatLoader
          color="#28b78d"
          loading
          margin={2}
          size={20}
        />
        :
        limits_list
        }

    

            {/* <div className="budget-limit-container">
                <img src="favicon.ico" className="budget-limit__category-icon"/>
                <h3>Maistas</h3>
                <div className="budget-linechart">
                     <div className="horizontal-bar__pelnas">4910 €</div>
                     <div className="horizontal-bar__islaidos">1044.94 €</div>
                </div>
                <div className="budget-limit-info">
                 <h4>Nustatytas biudžetas: {limit.status ? <input type='number' value={limit.amount}/>:<span className="green">{limit.amount}</span> } € </h4>
                 <button className="budget-limit__editBtn" onClick={() => 
				 statusChange(limit)}>
				 {limit.status ?<span className="green"><MdDownloadDone /></span>: <span className="red"><FaPen /></span>}</button>

              <h4>Vidutiniškai išleidžiama: <span className="red">1045.45 €</span></h4>
              

                </div>              
            </div> */}



        </div>


        </div>
  );
}
