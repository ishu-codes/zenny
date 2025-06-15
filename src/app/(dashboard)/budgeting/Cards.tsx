"use client";

import { use, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ApexChart from "../dashboard/ApexChart";
import { BillInterface, PENDING_BILLS } from "../dashboard/chartsData";
import { getFormattedDateTime, getFormattedRelativeDateTime } from "@/lib/date";
import { TRANSACTION_CATEGORIES } from "../dashboard/chartsData";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { CircleProgress } from "@/components/ui/circle-progress";

export const MONTHLY_EXPENSES = {
  labels: ["Dec", "Jan", "Feb", "Mar", "Apr"],
  values: [
    { name: "Expenses", data: [150, 200, 180, 220, 170] },
    { name: "Revenue", data: [170, 180, 210, 120, 170] },
  ],
};

export default function Cards() {
  const [currentBill, setCurrentBill] = useState<BillInterface | null>();

  const bills = PENDING_BILLS.sort(
    (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
  );

  const handleBillClick = (bill: BillInterface) => {
    setCurrentBill(bill);
    // setDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Expenditure</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 lg:grid-cols-3 justify-between">
          {[
            { title: "Grocery", expenditure: 3568, total: 5000 },
            { title: "Vegetables", expenditure: 2030, total: 3000 },
            { title: "Milk", expenditure: 2030, total: 2400 },
          ].map((expense, idx) => (
            <div className="flex flex-col items-center gap-2" key={idx}>
              <h2 className="text-center">{expense.title}</h2>
              <div className="group relative transition-all duration-300">
                <CircleProgress
                  className="group-hover:hidden"
                  value={expense.expenditure}
                  maxValue={expense.total}
                  size={140}
                  strokeWidth={8}
                  counterClockwise={false}
                  getColor={(percentage) => {
                    if (percentage > 0.8) return "stroke-rose-500";
                    if (percentage > 0.66) return "stroke-amber-500";
                    return "stroke-emerald-500";
                  }}
                />
                <CircleProgress
                  className="hidden group-hover:block stroke-emerald-500"
                  value={expense.total - expense.expenditure}
                  maxValue={expense.total}
                  size={140}
                  strokeWidth={8}
                  counterClockwise={true}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">
                    <span className="group-hover:hidden">
                      &#8377; {expense.expenditure}
                    </span>
                    <span className="hidden group-hover:block">
                      &#8377; {expense.total - expense.expenditure}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="group-hover:hidden">
                      / &#8377; {expense.total}
                    </span>
                    <span className="hidden group-hover:block">
                      amount left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="row-span-2">
        <CardHeader>
          <CardTitle>Pending Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog
            open={!!currentBill}
            onOpenChange={() => setCurrentBill(null)}
          >
            {/* <DialogTrigger>s</DialogTrigger> */}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Complete Payment</DialogTitle>
              </DialogHeader>
              <div
                className={`flex gap-4 items-center rounded-lg cursor-pointer`}
              >
                <div className="p-3 rounded-full bg-primary/10">
                  {currentBill &&
                    TRANSACTION_CATEGORIES[currentBill?.category]?.icon}
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="">
                    <p className="font-medium">{currentBill?.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentBill &&
                        getFormattedRelativeDateTime(currentBill?.dateTime)}
                    </p>
                  </div>
                  {currentBill?.autopay && (
                    <Badge
                      variant={"default"}
                      className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                    >
                      {currentBill?.autopay}
                    </Badge>
                  )}
                  <p
                    className={
                      currentBill?.type === "DEBIT"
                        ? "text-red-600 dark:text-red-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }
                  >
                    {"₹"}&nbsp;
                    {currentBill?.amount}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex flex-col gap-4">
            {bills.map((bill, idx) => (
              <div
                key={idx}
                className={`flex gap-4 items-center rounded-lg cursor-pointer`}
                onClick={() => handleBillClick(bill)}
              >
                <div className="p-3 rounded-full bg-primary/10">
                  {TRANSACTION_CATEGORIES[bill?.category].icon}
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="">
                    <p className="font-medium">{bill?.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {getFormattedRelativeDateTime(bill?.dateTime)}
                    </p>
                  </div>
                  {bill?.autopay && (
                    <Badge
                      variant={"default"}
                      className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                    >
                      {bill?.autopay}
                    </Badge>
                  )}
                  <p
                    className={
                      bill.type === "DEBIT"
                        ? "text-red-600 dark:text-red-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }
                  >
                    {"₹"}&nbsp;
                    {bill?.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
