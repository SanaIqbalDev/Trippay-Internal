import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartColors {
  [key: string]: string;
}

const chartColors: ChartColors = {
  purple: "#9747ff",
  lightPurple: "#7f56d9",
  grey: "rgb(231,233,237)",
};

const data: ChartData<"doughnut"> = {
  labels: ["This month", "Last month"],
  datasets: [
    {
      label: "This Month",

      data: [90, 10],
      backgroundColor: [chartColors.lightPurple, chartColors.grey],
      hoverBackgroundColor: [chartColors.lightPurple, chartColors.grey],
      borderWidth: 3,
    },
    {
      label: "Last Month",
      data: [80, 20],

      backgroundColor: [chartColors.purple, chartColors.grey],
      hoverBackgroundColor: [chartColors.purple, chartColors.grey],
      borderWidth: 3,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  plugins: {
    title: {
      display: true,
      text: "Employee Overview",
      font: {
        weight: "bold",
        size: 20,
      },
    },
    legend: {
      display: false,
    },
    centerText: {
      text: "$2,280",
    },
  },
  cutout: "75%",
};


const centerTextPlugin = {
  id: "centerTextPlugin",
  afterDraw: (chart) => {
    const { ctx, canvas, config } = chart;
    const text = config.options.plugins.centerText.text || "";
    const textX = "112";
    const textY = "112";

    ctx.save();
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, textX, textY);
    ctx.restore();
  },
};

// Register the plugin with Chart.js
Chart.register(centerTextPlugin);


const DonutChart: React.FC = () => {
  return (
    <div style={{ width: "224px", height: "224px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
