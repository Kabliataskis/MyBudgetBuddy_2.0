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

  const [incomes, setIncomes] = useState([
    { id: 1, date: "2023-03-28", title: "Maxima", sum: "20€" },
    { id: 2, date: "2023-03-28", title: "Norfa", sum: "20€" },
    { id: 3, date: "2023-03-28", title: "Lidl", sum: "20€" },
    { id: 4, date: "2023-03-28", title: "Maxima", sum: "20€" },
    { id: 5, date: "2023-03-28", title: "Iki", sum: "20€" },
    { id: 6, date: "2023-03-28", title: "Maxima", sum: "20€" },
    { id: 7, date: "2023-03-28", title: "Rimi", sum: "20€" },
  ]);
  const getIncomes = async () => {
    try {
      const res = await axios.get("/income/");
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
  let incomes_list = filterIncome.map((el) => {
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
    <div className="main_back">
      <IncomeEdit_Modal
        modal_IncomeEdit={modal_IncomeEdit}
        setModal_IncomeEdit={setModal_IncomeEdit}
        editPajamos={editPajamos}
      />
      <div className="container_pajamos">
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

      <div className="container_pajamos flex_container">
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
          <div className="paginacina_container">
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
              <li>6</li>
              <li>7</li>
              <li>
                <MdOutlineKeyboardArrowRight />
              </li>
              <li>
                <MdKeyboardDoubleArrowRight />
              </li>
            </ul>
          </div>
        </div>

        <div className="block_filtro">
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
