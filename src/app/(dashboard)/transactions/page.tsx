import { Metadata } from "next";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  // MONTHLY_EXPENSES,
  // EXPENSES_BY_CATEGORIES,
  EXPENSES_BY_NECESSITY,
} from "@/app/(dashboard)/dashboard/chartsData";
import ApexChart from "@/app/(dashboard)/dashboard/ApexChart";
import SummaryData from "../dashboard/SummaryData";
import { use } from "react";
import { queryClient } from "@/lib/react-query";
import { expensesByCategory, expensesRevenueTrend } from "@/hooks/db";

export const metadata: Metadata = {
  title: "Transactions | Zenny",
  description: "View and Manage your transactions with ease.",
};

export default function TransactionsPage() {
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
    <div className="flex flex-col gap-4">
      <SummaryData />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="min-h-80">
          <CardHeader>
            <CardTitle>Expenses in last 6 months</CardTitle>
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
        <Card className="min-h-80">
          <CardHeader>
            <CardTitle>Expenses by category</CardTitle>
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
        <Card className="min-h-80">
          <CardHeader>
            <CardTitle>Expenses by necessity</CardTitle>
          </CardHeader>
          <CardContent className="transition-all duration-300 ease-in-out">
            <ApexChart
              labels={EXPENSES_BY_NECESSITY.labels}
              values={EXPENSES_BY_NECESSITY.values}
              type="donut"
              width={"100%"}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
