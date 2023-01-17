
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DAYS_OF_WEEK } from "../../utils/constants";
import { IBarChart } from "./BarChart.interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
    fill: true,
    scales: {
      y: {
        min: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };


const BarChart = ({barColor,data,labels, nameData}:IBarChart) => {
    
  return (
    <div>
 <Bar data={{
          datasets: [
            {
              label: nameData,
              data: data,
              backgroundColor: barColor,
            },
          ],
          labels:labels,
        }} options={options} />
    </div>
   
  )
}

export default BarChart