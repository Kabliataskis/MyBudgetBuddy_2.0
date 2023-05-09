import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Transportas', 'Maistas', 'Mokesčiai', 'Laisvalaikis', 'Parduotuvė'],
    datasets: [
      {
        label: 'Išleista',
        data: [19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(40, 140, 183, 0.7)',
          'rgba(183, 131, 40, 0.7)',
          'rgba(40, 183, 69, 0.7)',
          'rgba(183, 40, 40, 0.7)',
          'rgba(140, 40, 183, 0.7)',
        ],
        borderColor: [
          'rgba(40, 140, 183, 1)',
          'rgba(183, 131, 40, 1)',
          'rgba(40, 183, 69, 1)',
          'rgba(183, 40, 40, 1)',
          'rgba(140, 40, 183, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
export default function DoughnutChart () {
  const options = {
    plugins: {
      legend: {
        position: 'left',
        labels: {
          color: "#243743",
          font: {
            family: "BalooThambi2" // Add your font here to change the font of your legend label
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label;
            const value = context.parsed;
            return ` ${value} €`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
    
  return (
    <Doughnut data={data} options={options} height={300} width={500}/>
  );
}
