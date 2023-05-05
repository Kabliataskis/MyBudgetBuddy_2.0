<<<<<<< Updated upstream
import React from "react";
import { CSVLink } from "react-csv";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../axios";
=======

>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======



  // async function extractDataFromPage() {
  //   const data = [];
  //   const table = document.querySelector('tbody, incomes_list');
  //   if (table) {
  //     const rows = table.querySelectorAll('tr');
  //     rows.forEach((row) => {
  //       const rowData = [];
  //       const cells = row.querySelectorAll('td');
  //       cells.forEach((cell) => {
  //         if (cell.textContent.trim() !== '') {
  //           rowData.push(cell.textContent);
  //         }
  //       });
  //       if (rowData.length > 0) {
  //         data.push(rowData);
  //       }
  //     });
  //   }
  //   return data;
  // }

  // async function extractDataFromAllPages() {
  //   const allData = [];
  //   let pageNum = 1;
  //   let hasNextPage = true;
  //   while (hasNextPage) {
  //     const data = await extractDataFromPage();
  //     allData.push(...data);
  //     pageNum++;
  
  //     // Simulate clicking the pagination link for the next page
  //     const nextLink = document.querySelector(`li.select:nth-child(${pageNum}) a`);
  //     if (nextLink) {
  //       nextLink.click();
  //       await new Promise(resolve => setTimeout(resolve, 1000));
  //     } else {
  //       hasNextPage = false;
  //     }
  //   }
  //   setCsvData(allData);
  // }




  import React from 'react';
import { CSVLink } from 'react-csv';
import "./Csv.css";
import axios from "../../axios";
import stringify from 'csv-stringify';
import Expenses from '../Expense/Expenses';
import { useState } from 'react';
import { useEffect } from 'react';





  function DownloadCSVButton() {
    const [csvData, setCsvData] = React.useState([]);
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
 

 
  
>>>>>>> Stashed changes
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
