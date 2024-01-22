"use client";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, BarElement, LinearScale, CategoryScale);

interface BarGraphProps {
  data: GraphData[] | undefined;
}
type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};
export default function BarGraph({ data }: BarGraphProps) {
  const labels = data?.map((item) => item.day);
  const amounts = data?.map((item) => item.totalAmount);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "sale Amount",
        data: amounts,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={chartData} options={options}></Bar>;
}
