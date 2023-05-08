import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Expense from "./Expense";
import axios from "../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import ExpenseEditModal from "./ExpenseEditModal";
import DownloadCSVButton from "../CSV_export/Csv";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { ContextProvider } from "../../App";
import "./Expense.css";
import "../../index.css";
export default function Expenses() {
  const [editExpens, setEditExpens] = useState({});
  const [modal_ExpenseEdit, setModal_ExpenseEdit] = useState(false);
  const { setModal_ExpenseAdd } = useContext(ContextProvider);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      data: "2023-03-28",
      kategorija: "Transportas",
      pavadinimas: "Remontas",
      suma: "200€",
    },
  ]);

  const getExpense = async () => {
    try {
      const res = await axios.get("/expense?");
      setExpenses(res.data.data.expenses);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getExpense();
  }, []);

  async function deleteExpense(id) {
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
            const res = await axios.delete("/Expense/" + id);
            console.log(res);
            swal.fire({
              title: "Sėkmingai",
              text: "Įrašas ištrintas",
              icon: "success",
              confirmButtonColor: "#28b78d",
            });
            getExpense();
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        }
      });
  }

  const [value, setValue] = useState("");

  // const filterExpense = expenses.filter((el) => {
  //   return el.title
  //     .toLocaleLowerCase()
  //     .includes(value.toLocaleLowerCase());
  // });

  const editExpense = (id) => {
    console.log(id);
    let item_index;
    expenses.forEach((el, index) => {
      if (el.id == id) {
        item_index = index;
      }
    });
    setEditExpens(expenses[item_index]);
    setModal_ExpenseEdit(true);
  };

  const filterExpense = expenses.filter((el) => {
    const title = el.title || ""; // fallback to an empty string if title is undefined or null
    const lowercaseValue = value ? value.toLocaleLowerCase() : ""; // fallback to an empty string if value is undefined or null
    return title.toLocaleLowerCase().includes(lowercaseValue);
  });

  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const totalItems = filterExpense.length;
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

  let expenses_list = filterExpense.slice(startIndex, endIndex).map((el) => {
    return (
      <Expense
        key={uuidv4()}
        obj={el}
        setEditExpens={setEditExpens}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      />
    );
  });

  return (
    <div className="main_back">
      <ExpenseEditModal
        modal_ExpenseEdit={modal_ExpenseEdit}
        setModal_ExpenseEdit={setModal_ExpenseEdit}
        editExpens={editExpens}
      />
      <div className="container-pajamos">
        <h3 className="h3-text">Išlaidos</h3>
        <div className="block_pajamos">
          <p className="block_pajamo">
            Mėnesio išlaidos: <span className="red-eur">5956€</span>
          </p>
          <button className="btnAdd" onClick={() => setModal_ExpenseAdd(true)}>
            Įvesti išlaidas
          </button>
        </div>
      </div>

      <div className="container-pajamos flex_container">
        <div className="table_main">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Kategorija</th>
                <th>Pavadinimas</th>
                <th>Suma</th>
                <th>Redaguoti</th>
                <th>Pašalinti</th>
              </tr>
            </thead>
            <tbody>{expenses_list}</tbody>
          </table>
          <div className="pagination-container no-copy">
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
                    endIndex >= filterExpense.length
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
                    endIndex >= filterExpense.length
                      ? currentPage - 0
                      : totalPages
                  )
                }
              >
                <MdKeyboardDoubleArrowRight />
              </li>
            </ul>
            <DownloadCSVButton />
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
              <select
                className="dropdown-kategorija"
                name="Kategorija"
                id="Kategorija"
              >
                <option value="kategorija">Kategorija</option>
                <option value="transportas">Transportas</option>
                <option value="parduotuve">Parduotuvė</option>
                <option value="mokesciai">Mokesčiai</option>
                <option value="sveikata">Sveikata</option>
              </select>
              <p className="data_filter_p">
                <label htmlFor="nuo_data">Nuo</label>{" "}
                <input className="data_filter" type="date" id="nuo_data" />{" "}
                <label htmlFor="iki_data">iki</label>{" "}
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
