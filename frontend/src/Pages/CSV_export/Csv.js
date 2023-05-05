import React from "react";
import { CSVLink } from "react-csv";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../axios";

function DownloadCSVButton() {
  const [expenses, setExpenses] = useState([]);

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

  const csvHeaders = [
    { label: "category", key: "category" },
    { label: "title", key: "title" },
    { label: "sum", key: "sum" },
    { label: "date", key: "date" },
  ];

  return (
    <CSVLink data={expenses} headers={csvHeaders} className="btn_csv" filename={"data.csv"}>
       Eksportuoti .CSV
    </CSVLink>
  );
}

export default DownloadCSVButton;
