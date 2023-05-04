import React, { useState, useEffect, useContext } from "react";
import { ContextProvider } from "../../App";
import { v4 as uuidv4 } from "uuid";
import axios from "../../axios";
import Income from "./Income";
import { toast } from "react-toastify";
import "./Income.css";
import swal from "sweetalert2";
import "../../index.css";
import IncomeEdit_Modal from "./IncomeEditModal.js";
import ReactPaginate from 'react-paginate';
import IncomeAdd_Modal from "./IncomeAddModal";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
export default function Incomes() {
  const [editPajamos, setEditPajamos] = useState({});
  const [modal_IncomeEdit, setModal_IncomeEdit] = useState(false);
  const { setModal_IncomeAdd } = useContext(ContextProvider);

  const [incomes, setIncomes] = useState([]);
  const getIncomes = async () => {
    try {
      const res = await axios.get("/income?");
      setIncomes(res.data.data.incomes);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getIncomes();
  }, []);

  async function deleteIncome(id) {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite ištrinti įrašą?",
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
            const res = await axios.delete("/income/" + id);
            console.log(res);
            swal.fire({
              title: "Sėkmingai",
              text: "Įrašas ištrintas",
              icon: "success",
              confirmButtonColor: "#28b78d",
            });
            getIncomes();
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        }
      });
  }
  // const deleteTask = (id) =>{
  //     setTasks(tasks.filter((item) => item.id !== id));
  // };

  const [value, setValue] = useState("");

  const filterIncome = incomes.filter((el) => {
    const title = el.title || ""; // fallback to an empty string if title is undefined or null
    const lowercaseValue = value ? value.toLocaleLowerCase() : ""; // fallback to an empty string if value is undefined or null
    return title.toLocaleLowerCase().includes(lowercaseValue);
  });

  const editIncome = (id) => {
    console.log(id);
    let item_index;
    incomes.forEach((el, index) => {
      if (el.id == id) {
        item_index = index;
      }
    });
    setEditPajamos(incomes[item_index]);
    setModal_IncomeEdit(true);
  };

  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const totalItems = filterIncome.length;
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
        pages = [1, 2, 3, 4, 5,  "...", totalPages-1 , totalPages];
      } else if (currentPage > 4 && currentPage < totalPages - 2) {
        pages = [1, "...", currentPage - 2, currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      } else {
        pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      }
    }
  
    return pages;
  };
  
for (let i = 1; i <= totalPages; i++) {
  pages.push(i);
}

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let incomes_list = filterIncome.slice(startIndex, endIndex).map((el) => {
    return (
      <Income
        key={uuidv4()}
        obj={el}
        id={el._id}
        setEditPajamos={setEditPajamos}
        editIncome={editIncome}
        deleteIncome={deleteIncome}
      />
    );
  });
  

  return (
    <div className="main_back Incomes">
      <IncomeAdd_Modal getIncomes={getIncomes}/>
      <IncomeEdit_Modal
        modal_IncomeEdit={modal_IncomeEdit}
        setModal_IncomeEdit={setModal_IncomeEdit}
        editPajamos={editPajamos}
      />
      <div className="container-pajamos">
        <h3 className="h3-text">Pajamos</h3>
        <div className="block_pajamos">
          <p className="block_pajamo">
            Mėnesio pajamos: <span className="color-eur">5956€</span>
          </p>
          <button className="btn-gren" onClick={() => setModal_IncomeAdd(true)}>
            Įvesti pajamas
          </button>
        </div>
      </div>

      <div className="container-pajamos flex_container">
        <div className="table_main">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Pajamų šaltinis</th>
                <th>Suma</th>
                <th>Redaguoti</th>
                <th>Pašalinti</th>
              </tr>
            </thead>
            <tbody>{incomes_list}</tbody>
          </table>
          <div className="pagination-container">
  <ul>
    <li disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
    <MdKeyboardDoubleArrowLeft  />
    </li>
    <li   onClick={() => setCurrentPage(currentPage===1 ? currentPage-0 : currentPage-1)}>
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


  <li onClick={() => setCurrentPage(endIndex >= filterIncome.length ? currentPage-0 : currentPage+1)}>
   <MdOutlineKeyboardArrowRight />
  </li>
  <li    onClick={() => setCurrentPage(endIndex >= filterIncome.length ? currentPage-0 : totalPages)}>
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
    </div>
  );
}

