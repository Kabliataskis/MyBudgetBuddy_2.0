import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../../../axios";
import Action from "./Action";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
export const Actions = () => {
  const [value, setValue] = useState("");
  const [actions, setActions] = useState([]);

  const getActions = async () => {
    try {
      const res = await axios.get("/actions");
      setActions(res.data.data.actions);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getActions();
  }, []);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const filterActions = actions.filter((el) => {
    const title = el.username || "";
    const date = el.createdAt || "";
    const lowercaseValue = value ? value.toLocaleLowerCase() : "";
  
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;
    const incomeDateObj = date ? new Date(date) : null;

    const dateInRange =
      (!startDateObj ||
        startDateObj <= incomeDateObj.setHours(0, 0, 0, 0) + 86400000) &&
      (!endDateObj || endDateObj >= incomeDateObj.setHours(0, 0, 0, 0));

    return title.toLocaleLowerCase().includes(lowercaseValue) && dateInRange;
  });

  const removeFilter = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setValue("");
    setStartDate("");
    setEndDate("");
  };


  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const totalItems = filterActions.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = [];

  const getPageNumbers = () => {
    let pages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage > 4 && currentPage < totalPages - 2) {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }
      pages.push(totalPages);
    }

    return pages;
  };

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }








  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  let actions_list = filterActions.slice(startIndex, endIndex).map((el) => {
    return (
      <Action
        key={uuidv4()}
        obj={el}
      />
    );
  });

  return (
    <div className="container-pajamos flex_container">
      <div className="table_main">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Vartotojas</th>
              <th>Įvykis</th>
              <th>Daugiau informacijos</th>
            </tr>
          </thead>
          <tbody>{actions_list}</tbody>
        </table>
        <div className="pagination-container">
            <ul>
              <li
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                <MdKeyboardDoubleArrowLeft />
              </li>
              <li
                onClick={() =>
                  setCurrentPage(
                    currentPage === 1 ? currentPage - 0 : currentPage - 1
                  )
                }
              >
                <MdKeyboardArrowLeft />
              </li>

              {getPageNumbers().map((page, index) => (
                <li
                  className={currentPage === page ? "select" : ""}
                  key={index}
                  onClick={() => {
                    if (page === "...") {
                      return;
                    }
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </li>
              ))}

              <li
                onClick={() =>
                  setCurrentPage(
                    endIndex >= actions.length
                      ? currentPage - 0
                      : currentPage + 1
                  )
                }
              >
                <MdOutlineKeyboardArrowRight />
              </li>
              <li
                onClick={() =>
                  setCurrentPage(
                    endIndex >= actions.length
                      ? currentPage - 0
                      : totalPages
                  )
                }
              >
                <MdKeyboardDoubleArrowRight />
              </li>
            </ul>
          </div>



      </div>


      <div className="filter-block">
          <h3>Filtravimas</h3>
          <div>
            <form>
              <input
                type="text"
                placeholder="Vartotojo slapyvardis..."
                className="paieska_filter"
                onChange={(event) => setValue(event.target.value)}
                value={value}
              />
              <p className="data_filter_p">
                <label className="word" htmlFor="nuo_data">Nuo</label>
                <input
                  onChange={(event) => setStartDate(event.target.value)}
                  className="data_filter"
                  type="date"
                  id="nuo_data"
                  value={startDate}
                />

                <label className="word2" htmlFor="iki_data">iki</label>
                <input
                  onChange={(event) => setEndDate(event.target.value)}
                  className="data_filter"
                  type="date"
                  id="iki_data"
                  value={endDate}
                />
              </p>
              <button className="btn-dark" onClick={(event) => removeFilter(event)}>Išvalyti</button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Actions;
