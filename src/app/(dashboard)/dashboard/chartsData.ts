import type { ChartData, ChartOptions } from "chart.js";

const lineData: ChartData<"line"> = {
  labels: ["Dec", "Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Expenses",
      data: [150, 200, 180, 220, 170],
      fill: false,
      borderColor: "#E76E50",
      backgroundColor: "#E76E50",
      tension: 0.25,
    },
    {
      label: "Income",
      data: [170, 180, 210, 120, 170],
      fill: false,
      borderColor: "#2A9D90",
      backgroundColor: "#2A9D90",
      tension: 0.25,
    },
  ],
};

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const doughnutData: ChartData<"doughnut"> = {
  labels: ["Food", "Travel", "Hygiene", "Others"],
  datasets: [
    {
      label: "Expense",
      data: [100, 80, 60, 20],
      backgroundColor: ["#E76E50", "#2A9D90", "#274754", "#E8C468"],
      hoverOffset: 4,
      spacing: 2,
      borderRadius: 5,
      //   borderJoinStyle: "round",
    },
  ],
};

const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
};
export { lineData, lineOptions, doughnutData, doughnutOptions };
