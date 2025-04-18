import { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import LineChart from "@/components/charts/LineChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import {
  lineData,
  lineOptions,
  doughnutData,
  doughnutOptions,
} from "./chartsData";
import { Progress } from "@/components/charts/ProgressBar";
import { ArrowDown, ArrowUp } from "lucide-react";
// import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard | Zenny",
  description: "View all your finances at a glance.",
};

const SHORT_INFO = [
  {
    title: "Total Balance",
    value: "4,32,568",
    percentageChange: 3.12,
    lastMonth: "28,940",
  },
  {
    title: "Total Period Change",
    value: "2,45,860",
    percentageChange: 1.98,
    lastMonth: "21,230",
  },
  {
    title: "Total Period Expense",
    value: "2,530",
    percentageChange: -4.78,
    lastMonth: "26,340",
  },
  {
    title: "Total Period Income",
    value: "24,560",
    percentageChange: 2.84,
    lastMonth: "28,940",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h1 className="font-bold text-xl">Dashboard</h1>

      {/* Short Info */}
      <div className="grid gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
        {SHORT_INFO.map((info) => (
          <Card key={info.title}>
            <CardHeader>
              <CardDescription>{info.title}</CardDescription>
              <CardTitle className="text-2xl">&#8377; {info.value}</CardTitle>
            </CardHeader>
            {/* <Separator orientation="horizontal" className="px-4" /> */}
            <CardFooter className="flex justify-between flex-wrap items-start text-sm">
              <CardDescription>
                {info.percentageChange > 0 ? (
                  <div className="flex gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                    <ArrowUp size={20} />
                    <span className="font-medium">
                      {info.percentageChange}&#37;
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-1 text-sm text-red-600 dark:text-red-400">
                    <ArrowDown size={20} />
                    <span className="font-medium">
                      {info.percentageChange}&#37;
                    </span>
                  </div>
                )}
              </CardDescription>
              <CardDescription>
                Last month:&nbsp;&nbsp;&#8377; {info.lastMonth}
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="h-full grid grid-cols-3 grid-rows-2 gap-6">
        {/* Monthly Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <LineChart data={lineData} options={lineOptions} />
          </CardContent>
        </Card>

        {/* Expenses this month */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Expenses this month</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row items-start justify-center">
            <div className="-mt-12">
              <DoughnutChart data={doughnutData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Card & Transactions */}
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        {/* Gloas & Savings */}
        <Card className="">
          <CardHeader>
            <CardTitle>Goals & Savings</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {[
              { title: "Car", value: 45, color: "#E76E50" },
              { title: "House", value: 35, color: "#2A9D90" },
              { title: "Villa", value: 54, color: "#274754" },
            ].map((progress) => (
              <div className="flex flex-col" key={progress.title}>
                <h2 className="flex items-center justify-between">
                  <span className="text-sm">{progress.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {progress.value}%
                  </span>
                </h2>
                <Progress
                  className="h-4 rounded-md"
                  color={progress.color}
                  value={progress.value}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Smart Tips */}
        <Card className="">
          <CardHeader>
            <CardTitle>Smart Tips</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
