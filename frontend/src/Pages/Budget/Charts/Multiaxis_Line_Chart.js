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
  const {incomes} = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterIncome = incomes.filter((el) => {
    const date = el.date || "";
  
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;
    const incomeDateObj = date ? new Date(date) : null;

    const dateInRange =
      (!startDateObj ||
        startDateObj <= incomeDateObj.setHours(0, 0, 0, 0) + 86400000) &&
      (!endDateObj || endDateObj >= incomeDateObj.setHours(0, 0, 0, 0));

    return dateInRange;
  });
console.log(filterIncome);

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

  const labels = ["2023.01", "2023.02", "2023.03", "2023.04", "2023.05", "2023.06"];
  const data1 = [875, 1032, 1287, 765, 1201,1201];
  const data2 = [924, 1157, 746, 1283, 1089,1089];


  const data = {
    labels,
    datasets: [
      {
        label: "Pajamos",
        data: data1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Islaidos",
        data: data2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
