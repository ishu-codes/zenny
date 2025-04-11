"use client";

import "@/components/charts/chartjs-setup";

import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

interface DoughnutChartProps {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options }) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
