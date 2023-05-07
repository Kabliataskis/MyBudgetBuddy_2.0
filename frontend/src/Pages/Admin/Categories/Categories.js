import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Category from "./Category";
export const Categories = () => {
  const [value, setValue] = useState("");
  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const [categories, setCategories] = useState([
    {
      id: 1,
      date: "2023-03-28",
      category: "Transportas",
      img: "https://www.svgrepo.com/show/179999/dump-truck-transport.svg",
    },
  ]);


  const filterCategory = categories.filter((el) => {
    const title = el.title || ""; // fallback to an empty string if title is undefined or null
    const lowercaseValue = value ? value.toLocaleLowerCase() : ""; // fallback to an empty string if value is undefined or null
    return title.toLocaleLowerCase().includes(lowercaseValue);
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let categories_list = filterCategory.slice(startIndex, endIndex).map((el) => {
    return (
      <Category
        key={uuidv4()}
        obj={el}
        // id={el._id}
        // setEditPajamos={setEditPajamos}
        // editIncome={editIncome}
        // deleteIncome={deleteIncome}
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
                <th>Pavadinimas</th>
                <th>Paveikslėlis</th>
                <th>Redaguoti</th>
                <th>Pašalinti</th>
              </tr>
            </thead>
            <tbody>{categories_list}</tbody>
          </table>
          </div>

          <div className="filter-block">
          <h3>Filtravimas</h3>
          <div>
            <form>
              <input
                type="text"
                placeholder="Paieška..."
                className="paieska_filter"
                onChange={(event) => setValue(event.target.value)}
              />
              <p className="data_filter_p">
                <label htmlFor="nuo_data">Nuo</label>
                <input className="data_filter" type="date" id="nuo_data" />
                <label htmlFor="iki_data">iki</label>
                <input className="data_filter" type="date" id="iki_data" />
              </p>
              <button className="btn-dark">Ieškoti</button>
            </form>
          </div>
        </div>

          </div>

  );
};

export default Categories;
