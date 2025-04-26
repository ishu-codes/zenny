import { Metadata } from "next";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Progress } from "@/components/charts/ProgressBar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardTab } from "./CardTab";
import { CalendarTab } from "./CalendarTab";

import ApexChart from "./ApexChart";
import {
  SHORT_INFO,
  MONTHLY_EXPENSES,
  EXPENSES_BY_CATEGORIES,
} from "./chartsData";

export const metadata: Metadata = {
  title: "Dashboard | Zenny",
  description: "View all your finances at a glance.",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 pb-16">
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
                    <TrendingUp size={20} />
                    <span className="font-medium">
                      {info.percentageChange}&#37;
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-1 text-sm text-red-600 dark:text-red-400">
                    <TrendingDown size={20} />
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
      <div className="h-full grid gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
        {/* Monthly Expenses */}
        <Card className="min-h-80">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="transition-all duration-300 ease-in-out">
            <ApexChart
              labels={MONTHLY_EXPENSES.labels}
              values={MONTHLY_EXPENSES.values}
              type="line"
              width={"100%"}
            />
          </CardContent>
        </Card>

        {/* Expenses this month */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Expenses this month</CardTitle>
          </CardHeader>
          <CardContent className="transition-all duration-300 ease-in-out">
            <ApexChart
              labels={EXPENSES_BY_CATEGORIES.labels}
              values={EXPENSES_BY_CATEGORIES.values}
              type="donut"
              width={"100%"}
            />
          </CardContent>
        </Card>

        {/* Card & Transactions */}
        <Card className="row-span-2">
          <CardContent>
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-background">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="cards">Cards & Transactions</TabsTrigger>
              </TabsList>
              <TabsContent className="pt-2" value="calendar">
                <CalendarTab />
              </TabsContent>
              <TabsContent className="pt-2" value="cards">
                <CardTab />
              </TabsContent>
            </Tabs>
          </CardContent>
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
