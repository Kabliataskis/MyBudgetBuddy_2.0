import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import Income from "./Income";
import axios from "../../../axios";
import IncomeAdd_Modal from "../../Income/IncomeAddModal";
//Icons
import { FaPiggyBank } from "react-icons/fa";

export default function IncomeHistory() {
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
      const res = await axios.get("/income?limit=5");
      setIncomes(res.data.data.incomes);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getIncomes();
  }, []);

  let incomes_list = incomes.map((el) => {
    return (
      <Income
        obj={el}
        key={uuidv4()}
        id={el._id}
      />
    );
  });
  return (
    <>
    <IncomeAdd_Modal getIncomes={getIncomes} />
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Pavadinimas</th>
          <th>Suma</th>
        </tr>
      </thead>
      <tbody>
        {incomes_list}
        {/* <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Alga</td>
          <td className="green">+10.99€</td>
        </tr>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Skola</td>
          <td className="green">+10.99€</td>
        </tr>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Dovana</td>
          <td className="green">+10.99€</td>
        </tr>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Alga</td>
          <td className="green">+10.99€</td>
        </tr>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Alga</td>
          <td className="green">+10.99€</td>
        </tr> */}
      </tbody>
    </table>
    </>
  );
}
