import { Metadata } from "next";
import { TrendingDown, TrendingUp } from "lucide-react";
import ProgressBar from "@/components/charts/ProgressBar";
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
  GOALS,
  SMART_TIPS,
} from "./chartsData";
import SmartTips from "./SmartTips";
import { getFormattedCurrency } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Dashboard | Zenny",
  description: "View all your finances at a glance.",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Short Info */}
      <div className="grid gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
        {SHORT_INFO.map((info) => (
          <Card key={info.title}>
            <CardHeader>
              <CardDescription>{info.title}</CardDescription>
              <CardTitle className="text-2xl">
                &#8377; {getFormattedCurrency(info.currentPeriod)}
              </CardTitle>
            </CardHeader>
            {/* <Separator orientation="horizontal" className="px-4" /> */}
            {info?.lastPeriod && info?.lastPeriod != 0 && (
              <CardFooter className="flex justify-between flex-wrap items-start text-sm">
                <CardDescription>
                  <PercentageChange
                    initial={info?.lastPeriod}
                    final={info?.currentPeriod}
                  />
                </CardDescription>
                <CardDescription>
                  Last month:&nbsp;&nbsp;&#8377;{" "}
                  {getFormattedCurrency(info?.lastPeriod)}
                </CardDescription>
              </CardFooter>
            )}
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

const PercentageChange = ({
  initial,
  final,
}: {
  initial: number;
  final: number;
}) => {
  const percentageChange = (final / initial - 1) * 100;
  return percentageChange > 0 ? (
    <div className="flex gap-1 text-sm text-emerald-600 dark:text-emerald-400">
      <TrendingUp size={20} />
      <span className="font-medium">{percentageChange.toFixed(1)}&#37;</span>
    </div>
  ) : (
    <div className="flex gap-1 text-sm text-red-600 dark:text-red-400">
      <TrendingDown size={20} />
      <span className="font-medium">{percentageChange.toFixed(1)}&#37;</span>
    </div>
  );
};
