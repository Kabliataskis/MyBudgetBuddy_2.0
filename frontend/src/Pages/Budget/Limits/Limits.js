/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../../../axios";
import Limit from "./Limit";
import LimitEditModal from "./LimitEditModal";
import BeatLoader from "react-spinners/BeatLoader";
export default function Limits() {
  const [loading, setLoading] = useState(true);
  const [modal_limitEdit, setModal_limitEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [limits, setLimits] = useState([]);
  const [spents, setSpents] = useState([]);

  const [yearDropdownOptions, setYearDropdownOptions] = useState([]);

  const yearDropdownList = yearDropdownOptions.map((year) => (
    <option value={year} key={year}>
      {year}
    </option>
  ));

  const editLimit = (id) => {
    setEditId(id);
    setModal_limitEdit(true);
  };

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
  const [dropdownMonth, setDropdownMonth] = useState(new Date().getMonth() + 1); // getMonth() returns the month (from 0 to 11) of a date:
  const handleYearChange = (e) => {
    setDropdownYear(e.target.value);
  };
  const handleMonthChange = (e) => {
    setDropdownMonth(e.target.value);
  };
  useEffect(() => {
    const currentDate = new Date();
    const years = Array.from(
      { length: currentDate.getFullYear() - 2022 + 1 },
      (_, index) => currentDate.getFullYear() - index
    );
    setYearDropdownOptions(years);
  }, []);
  useEffect(() => {
    makeDate();
  }, [dropdownYear, dropdownMonth]);

  const makeDate = async () => {
    getLimits(dropdownYear, dropdownMonth);
  };

  const getLimits = async (year, month) => {
    setLoading(true);
    try {
      const res = await axios.get("/limits/" + year + "/" + month);
      setLimits(res.data.data.limits);
      setSpents(res.data.data.expenses);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bottom-container">
      {modal_limitEdit ? (
        <LimitEditModal
          getLimits={makeDate}
          modal_limitEdit={modal_limitEdit}
          setModal_limitEdit={setModal_limitEdit}
          editId={editId}
          setEditId={setEditId}
        />
      ) : null}
      <div className="budget-limits-top-container">
        <h2 className="budget-limits-top-container-title">
          Nustatytos kategorijos biudžetas
        </h2>
        <div className="budget-limits-dropdowns-container">
          <select
            className="budget-category-limit-dropdown"
            name="year"
            id="year"
            onChange={(e) => handleYearChange(e)}
            value={dropdownYear}
          >
            {yearDropdownList}
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
        {loading ? (
          <BeatLoader color="#28b78d" loading margin={2} size={20} />
        ) : (
          limits_list
        )}
      </div>
    </div>
  );
}
