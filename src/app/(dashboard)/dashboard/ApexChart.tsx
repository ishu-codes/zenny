"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "next-themes";
import { getFormattedCurrency } from "@/lib/currency";

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

// const getSum = (items: number[]) => items.reduce((a, b) => a + b, 0);

const ApexChart: React.FC<ApexChartProps> = ({
  labels,
  values,
  type,
  width,
  height,
}) => {
  const { theme } = useTheme();

  if (["pie", "donut"].includes(type))
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
          plotOptions: {
            pie: {
              donut: {
                size: "50%",
                labels: {
                  show: true,
                  name: {
                    show: false,
                    fontWeight: 700,
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    formatter: function (w) {
                      return (
                        "₹ " +
                        getFormattedCurrency(
                          w.globals.seriesTotals.reduce((a, b) => {
                            return a + b;
                          }, 0)
                        )
                      );
                    },
                  },
                },
              },
            },
          },
        }}
        series={values}
        type={type}
        width={width ?? "auto"}
        height={height ?? "auto"}
      />
    );

  if (["radialBar"].includes(type))
    return (
      <Chart
        options={{
          labels: labels,
          chart: {
            background: theme === "dark" ? "#1c1832" : "#fff",
          },
          radialBar: {
            hollow: {
              margin: 15,
              size: "10%",
              imageWidth: 100,
            },
            strokeWidth: "0%",
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "13px",
            },
            value: {
              color: "#111",
              fontSize: "30px",
              show: true,
            },
          },

          theme: { mode: theme ?? "light" },
          colors: theme === "dark" ? DARK_THEME_COLORS : LIGHT_THEME_COLORS,

          stroke: { lineCap: "round", width: 0.5 },
          markers: { size: 10 },
          grid: { borderColor: "#7083ac22" },
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
