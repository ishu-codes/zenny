import { Metadata } from "next";
import ProgressBar from "@/components/charts/ProgressBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardTab } from "./CardTab";
import { CalendarTab } from "./CalendarTab";

import ApexChart from "./ApexChart";
import {
  // MONTHLY_EXPENSES,
  // EXPENSES_BY_CATEGORIES,
  GOALS,
  SMART_TIPS,
} from "./chartsData";
import SmartTips from "./SmartTips";
import SummaryData from "./SummaryData";
import { use } from "react";
import { queryClient } from "@/lib/react-query";
import { expensesByCategory, expensesRevenueTrend } from "@/lib/dbData";

export const metadata: Metadata = {
  title: "Dashboard | Zenny",
  description: "View all your finances at a glance.",
};

export default function DashboardPage() {
  const expensesByCategoryData = use(
    queryClient.fetchQuery({
      queryKey: ["get_expenses_by_category", "month"],
      queryFn: () => expensesByCategory("month"),
      staleTime: 1000 * 60 * 60, // 1hr
    })
  );

  const expensesRevenueTrendData = use(
    queryClient.fetchQuery({
      queryKey: ["get_expense_revenue_trend", "month"],
      queryFn: () => expensesRevenueTrend("month", 6),
      staleTime: 1000 * 60 * 60, // 1hr
    })
  );

  return (
    <div className="flex flex-col gap-6 pb-4">
      <SummaryData />

      <div className="h-full grid gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
        {/* Monthly Expenses */}
        <Card className="min-h-80">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="transition-all duration-300 ease-in-out">
            <ApexChart
              labels={expensesRevenueTrendData.labels}
              values={expensesRevenueTrendData.values}
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
              labels={expensesByCategoryData.labels}
              values={expensesByCategoryData.values}
              type="donut"
              width={"100%"}
            />
          </CardContent>
        </Card>

        {/* Card & Transactions */}
        <Card className="row-span-2">
          <CardContent className="px-0">
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-[calc(100%-48px)] grid-cols-2 bg-background mx-auto">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="cards">Cards & Transactions</TabsTrigger>
              </TabsList>
              <TabsContent className="pt-2 px-6" value="calendar">
                <CalendarTab />
              </TabsContent>
              <TabsContent className="pt-2" value="cards">
                <CardTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Gloas & Savings */}
        <Card className={`${SMART_TIPS.length > 0 ? "" : "col-span-2"}`}>
          <CardHeader>
            <CardTitle>Goals & Savings</CardTitle>
          </CardHeader>
          <CardContent
            className={`grid ${
              SMART_TIPS.length > 0 ? "grid-cols-2" : "grid-cols-3"
            } gap-6`}
          >
            {GOALS.sort((a, b) => b.total - a.total)
              .slice(0, 4)
              .map((progress, idx) => (
                <div className="flex flex-col" key={idx}>
                  <ProgressBar progress={progress} />
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Smart Tips */}
        {SMART_TIPS.length > 0 && <SmartTips />}
      </div>
    </div>
  );
}
