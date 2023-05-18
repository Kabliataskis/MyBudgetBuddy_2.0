import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function MultiAxgis(props) {
  const {expenses_months,expenses_spent,incomes_earned} = props;
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const filterIncome = incomes.filter((el) => {
//     const date = el.date || "";
  
//     const startDateObj = startDate ? new Date(startDate) : null;
//     const endDateObj = endDate ? new Date(endDate) : null;
//     const incomeDateObj = date ? new Date(date) : null;

//     const dateInRange =
//       (!startDateObj ||
//         startDateObj <= incomeDateObj.setHours(0, 0, 0, 0) + 86400000) &&
//       (!endDateObj || endDateObj >= incomeDateObj.setHours(0, 0, 0, 0));

//     return dateInRange;
//   });
// console.log(filterIncome);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  

  const labels = expenses_months;
  const data1 = incomes_earned;
  const data2 = expenses_spent;

 const data = {
  labels,
  datasets: [
    {
      label: 'Išlaidos',
      data: data2,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
    {
      label: 'Pajamos',
      data: data1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    }
    
  ],
};

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Pajamos",
  //       data: data1,
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       yAxisID: "y",
  //     },
  //     {
  //       label: "Islaidos",
  //       data: data2,
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       yAxisID: "y1",
  //     },
  //   ],
  // };

  return <Line options={options} data={data} />;
}
