import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import Expense from "./Expense";
import axios from "../../../axios";
import ExpenseAddModal from "../../Expense/ExpenseAddModal";
import BeatLoader from "react-spinners/BeatLoader";


export default function ExpenseHistory(props) {
  const {generalPageUpdate} = props;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const getExpense = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/expense?limit=5");
      setExpenses(res.data.data.expenses);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getExpense();
  }, []);

  let expenses_list = expenses.map((el) => {
    return (
      <Expense
        obj={el}
        key={uuidv4()}
        id={el._id}
      />
    );
  });
  return (
    <>
     <ExpenseAddModal getExpense={getExpense} generalPageUpdate={generalPageUpdate}/>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th className="General-history__date">Data</th>
          <th className="General-history__category">Kategorija</th>
          <th>Pavadinimas</th>
          <th>Suma</th>
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
              ): expenses_list.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Įrašų nėra
                  </td>
                </tr> ) 
                : (
                expenses_list
              )}
            </tbody>      
    </table>
    </>
  );
}
