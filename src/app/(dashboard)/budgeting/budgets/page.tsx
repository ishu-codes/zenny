"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BUDGETS,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
  EXPENSES_NECESSITY,
  AUTOPAY_TYPES,
  BudgetInterface,
} from "../../dashboard/chartsData";
import { getFormattedCurrency } from "@/lib/currency";
import { titleCase } from "@/lib/data";

export default function Page() {
  const [fixedBudgets, setFixedBudgets] = useState<BudgetInterface[]>();
  const [variableBudgets, setVariableBudgets] = useState<BudgetInterface[]>();
  const [currentBudget, setCurrentBudget] = useState<BudgetInterface>();

  useEffect(() => {
    setFixedBudgets(
      BUDGETS.filter((b) => b.isFixed).sort((a, b) => b.amount - a.amount)
    );
    setVariableBudgets(
      BUDGETS.filter((b) => !b.isFixed).sort((a, b) => b.amount - a.amount)
    );
  }, []);
  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Fixed Budgets</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-6">
          <div
            className={`flex-1 grid grid-cols-1 gap-4 mb-auto ${
              currentBudget ? "md:grid-cols-2" : "md:grid-cols-3"
            }`}
          >
            {fixedBudgets?.map((budget, idx) => (
              <div
                className={`flex gap-2 p-2 pr-3 cursor-pointer rounded-2xl ${
                  currentBudget?.id == budget.id
                    ? "bg-accent"
                    : "hover:bg-accent"
                }`}
                key={idx}
                onClick={() => setCurrentBudget(budget)}
              >
                <div className="p-3 mb-auto rounded-full bg-primary/10">
                  {TRANSACTION_CATEGORIES[budget?.category].icon}
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{budget?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {/* {getFormattedDateTime(budget?.dateTime)} */}
                      Every month on 1st.
                    </p>
                  </div>
                  <p>
                    <span className="text-lg font-light">{"₹"}</span>
                    <span className="text-lg font-semibold">
                      {" "}
                      {getFormattedCurrency(budget?.amount)}
                    </span>
                  </p>
                </div>
                {budget?.desc && (
                  <p className="text-muted-foreground">{budget?.desc}</p>
                )}
              </div>
            ))}
          </div>
          {currentBudget && (
            <div className="w-1/3 flex flex-col pl-6 border-l-2">
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex gap-3">
                  <Badge
                    variant={"default"}
                    className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                  >
                    {currentBudget?.category}
                  </Badge>
                  {currentBudget?.autopay && (
                    <Badge
                      variant={"default"}
                      className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                    >
                      {currentBudget?.autopay}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="mb-auto p-4 rounded-full bg-primary/10">
                    {TRANSACTION_CATEGORIES[currentBudget?.category].icon}
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold">
                        {currentBudget?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {/* {getFormattedDateTime(currentBudget?.dateTime)} */}
                        Every month on 1st.
                      </p>
                    </div>
                    <p>
                      <span className="text-xl font-light">{"₹"}</span>
                      <span className="text-2xl font-semibold">
                        {" "}
                        {getFormattedCurrency(currentBudget?.amount)}
                      </span>
                    </p>
                  </div>
                </div>
                {currentBudget?.desc && (
                  <p className="text-muted-foreground">{currentBudget?.desc}</p>
                )}
                <div className="w-full pt-3 grid grid-cols-4">
                  {[
                    {
                      name: "type",
                      icon: TRANSACTION_TYPES[currentBudget?.type].icon,
                      label: currentBudget?.type,
                      color: "red",
                    },
                    {
                      name: "category",
                      icon: TRANSACTION_CATEGORIES[currentBudget?.category]
                        .icon,
                      label: currentBudget?.category,
                      color: "red",
                    },
                  ].map((info, idx) => (
                    <div className="flex flex-col gap-2 items-center" key={idx}>
                      <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                        {info.icon}
                      </div>
                      <p className="text-sm">{titleCase(info.label)}</p>
                    </div>
                  ))}
                  {currentBudget?.autopay && (
                    <div className="flex flex-col gap-2 items-center">
                      <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                        {AUTOPAY_TYPES[currentBudget?.autopay].icon}
                      </div>
                      <p className="text-wrap text-sm">
                        {titleCase(currentBudget?.autopay)}
                      </p>
                    </div>
                  )}
                  {currentBudget?.necessity && (
                    <div className="flex flex-col gap-2 items-center">
                      <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                        {EXPENSES_NECESSITY[currentBudget?.necessity].icon}
                      </div>
                      <p className="text-wrap text-sm">
                        {titleCase(currentBudget?.necessity)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
