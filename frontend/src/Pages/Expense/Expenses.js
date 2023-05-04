import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Expense from "./Expense";
import axios from "../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import ExpenseEditModal from "./ExpenseEditModal";
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
  const [expenses, setExpenses] = useState([]);


  const getExpense = async () => {
    try {
      const res = await axios.get("/expense?limit=10");
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

  let expenses_list = filterExpense.map((el) => {
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
          <div className="pagination-container">
            <ul>
              <li>
                <MdKeyboardDoubleArrowLeft />
              </li>
              <li>
                <MdKeyboardArrowLeft />
              </li>
              <li className="select">1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>
                <MdOutlineKeyboardArrowRight />
              </li>
              <li>
                <MdKeyboardDoubleArrowRight />
              </li>
            </ul>
            <button className="btn_csv">Eksportuoti .CSV</button>
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
