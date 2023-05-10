import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import Income from "./Income";
import axios from "../../../axios";
import IncomeAdd_Modal from "../../Income/IncomeAddModal";
//Icons
import { FaPiggyBank } from "react-icons/fa";

export default function IncomeHistory() {
  const [incomes, setIncomes] = useState([
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
      </tbody>
    </table>
    </>
  );
}
