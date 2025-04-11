"use client";

import "@/components/charts/chartjs-setup";

import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

interface LineChartProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default LineChart;
