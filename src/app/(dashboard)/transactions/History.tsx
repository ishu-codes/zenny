"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CardInterface, CARDS } from "../dashboard/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  SHORT_INFO,
  MONTHLY_EXPENSES,
  EXPENSES_BY_CATEGORIES,
} from "../dashboard/chartsData";
import ApexChart from "../dashboard/ApexChart";
import TransactionHistory from "./TransactionHistory";

export default function History() {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [currentCardNum, setCurrentCardNum] = useState<string>("all");

  useEffect(() => {
    setCards([
      {
        title: "All cards",
        name: "",
        number: "all",
        theme: "",
      },
      ...CARDS,
    ]);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-60 flex flex-col gap-2">
        <Select
          defaultValue={currentCardNum}
          onValueChange={(value) => setCurrentCardNum(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Card" />
          </SelectTrigger>
          <SelectContent>
            {cards?.map((card, idx) => (
              <SelectItem key={idx} value={card.number}>
                {card.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 flex flex-col gap-4">
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

        <div className="flex flex-col">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}
