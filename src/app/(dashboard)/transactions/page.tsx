import { Metadata } from "next";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import NewTransaction from "./NewTransaction";
// import History from "./history/page";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  SHORT_INFO,
  MONTHLY_EXPENSES,
  EXPENSES_BY_CATEGORIES,
} from "@/app/(dashboard)/dashboard/chartsData";
import ApexChart from "@/app/(dashboard)/dashboard/ApexChart";

export const metadata: Metadata = {
  title: "Transactions | Zenny",
  description: "View and Manage your transactions with ease.",
};

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <Card className="min-h-80">
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
        <Card className="min-h-80">
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
      </div>
    </div>
  );
}
