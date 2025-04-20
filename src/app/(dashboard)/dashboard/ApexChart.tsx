"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";

interface ApexChartProps {
  labels: string[];
  values: string[] | number[] | { name: string; data: number[] }[];
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "radar"
    | "polarArea";
  width?: number | string;
  height?: number | string;
}

const LIGHT_THEME_COLORS = [
  "#E76E50",
  "#2A9D90",
  "#F4A462",
  "#E8C468",
  "#274754",
];
const DARK_THEME_COLORS = [
  "#1447e6",
  "#00bc7d",
  "#fd9a00",
  "#ad46ff",
  "#ff2056",
];

const ApexChart: React.FC<ApexChartProps> = ({
  labels,
  values,
  type,
  width,
  height,
}) => {
  const { theme } = useTheme();

  if (type === "pie")
    return (
      <Chart
        options={{
          labels: labels,
          chart: {
            background: theme === "dark" ? "#1c1832" : "#fff",
          },
          theme: { mode: theme ?? "light" },
          colors: theme === "dark" ? DARK_THEME_COLORS : LIGHT_THEME_COLORS,
          stroke: {
            colors: [theme === "dark" ? "#1c1832" : "#fff"],
            width: 3,
          },
        }}
        series={values}
        type={type}
        width={width ?? "auto"}
        height={height ?? "auto"}
      />
    );
  return (
    <Chart
      options={{
        chart: {
          background: theme === "dark" ? "#1c1832" : "#fff",
        },
        theme: { mode: theme ?? "light" },
        colors: theme === "dark" ? DARK_THEME_COLORS : LIGHT_THEME_COLORS,
        xaxis: {
          categories: labels,
          axisBorder: { color: "#7083ac22" },
          axisTicks: { show: false },
          tooltip: { enabled: false },
        },
        stroke: { curve: "smooth", width: 2 },
        markers: { size: 3 },
        grid: { borderColor: "#7083ac22" },
      }}
      series={values}
      type={type}
      width={width ?? "auto"}
      height={height ?? "auto"}
    />
  );
};

export default ApexChart;
