import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Expense from "./Expense";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import ExpenseEditModal from "./ExpenseEditModal";
import DownloadCSVButton from "../CSV_export/Csv";
import calculateTotalExpense from "../General/Income_sum/Expense_sum";
import ExpenseAddModal from "./ExpenseAddModal";
import { getPageNumbers } from "../../func";
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
  const [editExpenseId, setEditExpenseId] = useState();
  const [editExpens, setEditExpens] = useState({});
  const [modal_ExpenseEdit, setModal_ExpenseEdit] = useState(false);
  const { setModal_ExpenseAdd } = useContext(ContextProvider);
  const [expenses, setExpenses] = useState([]);
  const totalExpense = calculateTotalExpense(expenses);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  let categories_list = categories.map((el) => {
    return (
      <option value={el.title} key={el._id + el.title}>
        {el.title}
      </option>
    );
  });

  const getExpense = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/expense?");
      setExpenses(res.data.data.expenses);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axios.get("/category?");
      setCategories(res.data.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpense();
    getCategories();
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const filterExpense = expenses.filter((el) => {
    const title = el.title || "";
    const date = el.date || "";
    const category = el.category.title || "";
    const lowercaseValue = value ? value.toLocaleLowerCase() : "";

    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;
    const ExpenseDateObj = date ? new Date(date) : null;

    const dateInRange =
      (!startDateObj ||
        startDateObj <= ExpenseDateObj.setHours(0, 0, 0, 0) + 86400000) &&
      (!endDateObj || endDateObj >= ExpenseDateObj.setHours(0, 0, 0, 0));

    return (
      title.toLocaleLowerCase().includes(lowercaseValue) &&
      dateInRange &&
      category.includes(categoryFilter)
    );
  });

  const handleSearchChange = (e) => {
    setValue(e.target.value);
    setCurrentPage(1);
  };

  const removeFilter = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setValue("");
    setStartDate("");
    setEndDate("");
    setCategoryFilter("");
  };

  const editExpense = (id) => {
    setEditExpenseId(id);
    setModal_ExpenseEdit(true);
  };

  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const totalItems = filterExpense.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = [];

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
        id={el._id}
        setEditExpens={setEditExpens}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      />
    );
  });

  return (
    <div className="main_back">
      <ExpenseAddModal getExpense={getExpense} />
      {modal_ExpenseEdit ? (
        <ExpenseEditModal
          editExpenseId={editExpenseId}
          setEditExpenseId={setEditExpenseId}
          modal_ExpenseEdit={modal_ExpenseEdit}
          setModal_ExpenseEdit={setModal_ExpenseEdit}
          editExpens={editExpens}
          getExpense={getExpense}
        />
      ) : null}
      <div className="container-pajamos">
        <h3 className="h3-text">Išlaidos</h3>
        <div className="block_pajamos">
          <p className="block_pajamo">
            Mėnesio išlaidos:{" "}
            <span className="red-eur">{totalExpense.toFixed(2)}€</span>
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
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    <BeatLoader
                      color="#28b78d"
                      loading
                      margin={2}
                      size={20}
                      cssOverride={{
                        display: "block",
                      }}
                    />
                  </td>
                </tr>
              ) : (
                expenses_list
              )}
            </tbody>
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

              {getPageNumbers(totalPages, currentPage).map((page, index) => (
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
                onChange={(e) => handleSearchChange(e)}
                value={value}
              />
              <select
                className="dropdown-kategorija"
                name="Kategorija"
                id="Kategorija"
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="">Kategorija</option>
                {categories_list}
              </select>
              <p className="data_filter_p">
                <label htmlFor="nuo_data">Nuo</label>
                <input
                  onChange={(event) => setStartDate(event.target.value)}
                  className="data_filter"
                  type="date"
                  id="nuo_data"
                  value={startDate}
                />{" "}
                <label htmlFor="iki_data">iki</label>
                <input
                  onChange={(event) => setEndDate(event.target.value)}
                  className="data_filter"
                  type="date"
                  id="iki_data"
                  value={endDate}
                />
              </p>
              <button
                onClick={(event) => removeFilter(event)}
                className="btn-dark"
              >
                Išvalyti
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
