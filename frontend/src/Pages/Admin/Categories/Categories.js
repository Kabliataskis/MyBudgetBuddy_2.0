import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Category from "./Category";
import CategoryCreate_Modal from "./CategoryCreateModal";
import CategoryEditModal from "./CategoryEditModal";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import axios from "../../../axios";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
export const Categories = () => {
  const [modal_categoryCreate, setModal_categoryCreate] = useState(false);
  const [modal_categoryEdit, setModal_categoryEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("/category?");
      setCategories(res.data.data.categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const editCategory = (id) => {
    setEditId(id);
    setModal_categoryEdit(true);
  }

  const deleteCategory = (id) => {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite ištrinti šią kategoriją?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#243743",
        confirmButtonText: "Ištrinti",
        cancelButtonText: "Atšaukti!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.delete("/category/" + id);
            console.log(res);
            swal.fire({
              title: "Sėkmingai",
              text: "Kategorija ištrinta",
              icon: "success",
              confirmButtonColor: "#28b78d",
            });
            getCategories();
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        }
      });
  }

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const filterCategory = categories.filter((el) => {
    const title = el.title || "";
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
  const totalItems = filterCategory.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = [];

  const getPageNumbers = () => {
    let pages = [];
  
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 6) {
        pages = [1, 2, 3, 4,5,6,7, "...", totalPages];
      } else if (currentPage > 6 && currentPage < totalPages - 3) {
        pages = [
          1,
          "...",
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          "...",
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          totalPages - 6,
          totalPages - 5,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }
    }
  
    return pages;
  };

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let categories_list = filterCategory.slice(startIndex, endIndex).map((el) => {
    return (
      <Category
        key={uuidv4()}
        obj={el}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
      />
    );
  });


  return (
      <div className="container-pajamos flex_container">
        <CategoryCreate_Modal
        getCategories={getCategories}
        modal_categoryCreate={modal_categoryCreate}
        setModal_categoryCreate={setModal_categoryCreate}
      />
      <CategoryEditModal
        getCategories={getCategories}
        modal_categoryEdit={modal_categoryEdit}
        setModal_categoryEdit={setModal_categoryEdit}
        editId={editId}
        setEditId={setEditId}
      />
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
                    endIndex >= categories.length
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
                    endIndex >= categories.length
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
          <button className="Admin-createBtn" onClick={() => setModal_categoryCreate(true)}>Sukurti kategoriją</button>
          <h3 className="Admin-filter-title">Filtravimas</h3>
          <div>
            <form>
              <input
                type="text"
                placeholder="Paieška..."
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

export default Categories;
