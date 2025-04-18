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

export const metadata: Metadata = {
  title: "Dashboard | Zenny",
  description: "View all your finances at a glance.",
};

export default function DashboardPage() {
  return (
    <div className="h-full grid grid-cols-3 grid-rows-2 gap-8">
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
  );
}
