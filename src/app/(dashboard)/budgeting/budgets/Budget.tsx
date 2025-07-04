"use client";

import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TRANSACTION_CATEGORIES,
  BudgetInterface,
} from "../../dashboard/chartsData";
import { getFormattedCurrency } from "@/lib/currency";
import { DynamicIcon } from "lucide-react/dynamic";

interface Props {
  className?: string;
  title: string;
  budgets?: BudgetInterface[];
  currentBudget?: BudgetInterface;
  setCurrentBudget: Dispatch<SetStateAction<BudgetInterface>>;
}

export default function Budget({
  className,
  title,
  budgets,
  currentBudget,
  setCurrentBudget,
}: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-6">
        <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-auto`}>
          {budgets?.map((budget, idx) => (
            <div
              className={`flex gap-2 p-2 pr-3 cursor-pointer rounded-2xl ${
                currentBudget?.id == budget.id
                  ? "bg-accent"
                  : "hover:bg-accent/80"
              }`}
              key={idx}
              onClick={() => setCurrentBudget(budget)}
            >
              <div
                className={`w-12 h-12 p-3 mb-auto rounded-full ${
                  currentBudget?.id == budget.id ? "" : "bg-primary/5"
                }`}
              >
                <DynamicIcon
                  name={TRANSACTION_CATEGORIES[budget?.category].icon}
                />
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
      </CardContent>
    </Card>
  );
}
