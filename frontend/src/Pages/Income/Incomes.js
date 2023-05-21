import React, { useState, useEffect, useContext } from "react";
import { ContextProvider } from "../../App";
import { v4 as uuidv4 } from "uuid";
import axios from "../../axios";
import Income from "./Income";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import "./Income.css";
import swal from "sweetalert2";
import "../../index.css";
import IncomeEditModal from "./IncomeEditModal.js";
import IncomeAddModal from "./IncomeAddModal";
import calculateTotalIncome from "../General/Income_sum/Income_sum";
import { getPageNumbers } from "../../func";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

export default function Incomes() {
  const [editId, setEditId] = useState();
  const [editPajamos, setEditPajamos] = useState({});
  const [modal_IncomeEdit, setModal_IncomeEdit] = useState(false);
  const { setModal_IncomeAdd } = useContext(ContextProvider);
  const [loading, setLoading] = useState(true);
  const [incomes, setIncomes] = useState([]);
  const getIncomes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/income?");
      setIncomes(res.data.data.incomes);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getIncomes();
  }, []);
  const totalIncome = calculateTotalIncome(incomes);
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

  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterIncome = incomes.filter((el) => {
    const title = el.title || "";
    const date = el.date || "";
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

  const editIncome = async (id) => {
    setEditId(id);
    setModal_IncomeEdit(true);
  };

  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const totalItems = filterIncome.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

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
  };
  return (
    <div className="main_back Incomes">
      <IncomeAddModal getIncomes={getIncomes} />
      {editPajamos ? (
        <IncomeEditModal
          editId={editId}
          setEditId={setEditId}
          modal_IncomeEdit={modal_IncomeEdit}
          setModal_IncomeEdit={setModal_IncomeEdit}
          editPajamos={editPajamos}
          getIncomes={getIncomes}
        />
      ) : null}
      <div className="container-pajamos">
        <h3 className="h3-text">Pajamos</h3>
        <div className="block_pajamos">
          <p className="block_pajamo">
            Mėnesio pajamos:{" "}
            <span className="color-eur">{totalIncome.toFixed(2)}€</span>
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
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
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
                incomes_list
              )}
            </tbody>
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
                    endIndex >= filterIncome.length
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
                    endIndex >= filterIncome.length
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
                placeholder="Paieška..."
                className="paieska_filter"
                onChange={(e) => handleSearchChange(e)}
                value={value}
              />
              <p className="data_filter_p">
                <label className="word" htmlFor="nuo_data">
                  Nuo
                </label>
                <input
                  onChange={(event) => setStartDate(event.target.value)}
                  className="data_filter"
                  type="date"
                  id="nuo_data"
                  value={startDate}
                />

                <label className="word2" htmlFor="iki_data">
                  iki
                </label>
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
