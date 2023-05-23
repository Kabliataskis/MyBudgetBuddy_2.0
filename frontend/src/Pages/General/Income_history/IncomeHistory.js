import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import Income from "./Income";
import axios from "../../../axios";
import IncomeAdd_Modal from "../../Income/IncomeAddModal";
import BeatLoader from "react-spinners/BeatLoader";

export default function IncomeHistory(props) {
  const {generalPageUpdate} = props;
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const getIncomes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/income?limit=5");
      setIncomes(res.data.data.incomes);
      setLoading(false);
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
    <IncomeAdd_Modal getIncomes={getIncomes} generalPageUpdate={generalPageUpdate}/>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th className="General-history__date">Data</th>
          <th>Pavadinimas</th>
          <th>Suma</th>
        </tr>
      </thead>
      <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
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
              ) : incomes_list.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Įrašų nėra
                  </td>
                </tr> ) 
                : (
                incomes_list
              )}
            </tbody>
    </table>
    </>
  );
}
