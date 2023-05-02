
// import React, { useState, useEffect } from "react";
// import { CSVLink } from "react-csv";
// import "./Csv.css";

// function DownloadCSVButton() {
//   const [csvData, setCsvData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     extractDataFromPage();
//   }, []);

//   function extractDataFromPage() {
//     try {
//       setIsLoading(true);
//       const data = [];
//       const table = document.querySelector('table');
//       if (table) {
//         const rows = table.querySelectorAll('tr');
//         rows.forEach((row) => {
//           const rowData = [];
//           const cells = row.querySelectorAll('td');
//           cells.forEach((cell) => {
//             rowData.push(cell.textContent);
//           });
//           data.push(rowData);
//         });
//       }
//       setCsvData(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div>
//       <CSVLink
//         className="csv-btn"
//         data={csvData}
//         filename={"page_data.csv"}
//         onClick={extractDataFromPage}
//       >
//         {isLoading ? "Loading..." : "Export CSV"}
//       </CSVLink>
//     </div>
//   );
// }

// export default DownloadCSVButton;









import React from 'react';
import { CSVLink } from 'react-csv';
import "./Csv.css";


function DownloadCSVButton() {
  const [csvData, setCsvData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 10; // Change this value to adjust the number of rows per page

  function extractDataFromPage() {
    const data = [];
    const table = document.querySelector('table');
    if (table) {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row) => {
        const rowData = [];
        const cells = row.querySelectorAll('td');
        let rowHasData = false;
        cells.forEach((cell) => {
          const cellData = cell.textContent.trim();
          if (cellData !== '') {
            rowData.push(cellData);
            rowHasData = true;
          }
        });
        if (rowHasData) {
          data.push(rowData);
        }
      });
    }
    setCsvData(data);
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  console.log(csvData);
  return (
    <div>
      <CSVLink onClick={extractDataFromPage} className='csv-btn' data={csvData} filename={"page_data.csv"}>Export to CSV</CSVLink>
      <Pagination currentPage={currentPage} rowsPerPage={rowsPerPage}  onPageChange={handlePageChange} />
    </div>
  );
}

function Pagination({ currentPage, rowsPerPage, totalRows, onPageChange }) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button className={pageNumber === currentPage ? 'active' : ''} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DownloadCSVButton;




