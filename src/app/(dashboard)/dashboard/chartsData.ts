// import { ApexOptions } from "apexcharts";
// // import type { ChartData, ChartOptions } from "chart.js";

// export const optionsApex: ApexOptions = {
//   chart: {
//     type: "area",
//   },
//   xaxis: {
//     categories: ["Dec", "Jan", "Feb", "Mar", "Apr"],
//     axisBorder: {
//       color: "#7083ac22",
//     },
//     axisTicks: { show: false },
//     tooltip: { enabled: false },
//   },
//   stroke: {
//     curve: "smooth",
//     width: 2,
//   },
//   markers: {
//     size: 3,
//   },
//   grid: {
//     borderColor: "#7083ac22",
//   },
// };

// export const seriesApex: ApexAxisChartSeries | ApexNonAxisChartSeries = [
//   { name: "Expenses", data: [150, 200, 180, 220, 170] },
//   { name: "Revenue", data: [170, 180, 210, 120, 170] },
// ];

// export const doughnutOptions: ApexOptions = {
//   chart: {
//     type: "pie",
//   },
//   labels: ["Food", "Travel", "Hygiene", "Others"],
//   // colors: ["#E76E50", "#2A9D90", "#F4A462", "#E8C468", "#274754"],
// };
// export const doughnutSeries: number[] = [100, 80, 60, 20];

export const MONTHLY_EXPENSES = {
  labels: ["Dec", "Jan", "Feb", "Mar", "Apr"],
  values: [
    { name: "Expenses", data: [150, 200, 180, 220, 170] },
    { name: "Revenue", data: [170, 180, 210, 120, 170] },
  ],
};
export const EXPENSES_BY_CATEGORIES = {
  labels: ["Food", "Travel", "Hygiene", "Others"],
  values: [100, 80, 60, 20],
};
