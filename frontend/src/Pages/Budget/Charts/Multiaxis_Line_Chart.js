import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Pajamu ir Išlaidu palyginimas',
    },
  },
  scales: {
    y: {
      type: 'linear' ,
      display: true,
      position: 'left' ,
    },
    y1: {
      type: 'linear' ,
      display: true,
      position: 'right' ,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ["2023.01", "2023.02", "2023.03", "2023.04", "2023.05"];
const data1 = [];
const data2 = [];

export const data = {
  labels,
  datasets: [
    {
      label: 'Pajamos',
      data: data1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Islaidos',
      data: data2,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

export default function MultiAxis() {
  return <Line options={options} data={data} />;
}
