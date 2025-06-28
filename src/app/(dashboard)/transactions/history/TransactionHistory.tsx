"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { getFormattedDateTime, getFormattedRelativeDateTime } from "@/lib/date";
import { titleCase } from "@/lib/data";
import {
  AUTOPAY_TYPES,
  EXPENSES_NECESSITY,
  TRANSACTIONS,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
  TransactionInterface,
} from "../../dashboard/chartsData";
import { Badge } from "@/components/ui/badge";

export default function TransactionHistory() {
  const [currentTransaction, setCurrentTransaction] =
    useState<TransactionInterface>(TRANSACTIONS[0]);

  const transactions = TRANSACTIONS.sort(
    (a, b) => b.dateTime.getTime() - a.dateTime.getTime()
  );

  return (
    <Card className="flex flex-row px-8">
      <div className="w-1/2">
        {transactions.map((transaction, idx) => (
          <div
            key={idx}
            className={`flex gap-4 items-center p-3 rounded-lg cursor-pointer ${
              transaction.id === currentTransaction?.id
                ? "bg-primary/5"
                : "hover:bg-muted/75"
            }`}
            onClick={() => setCurrentTransaction(transaction)}
          >
            <div className="p-3 rounded-full bg-primary/10">
              {TRANSACTION_CATEGORIES[transaction?.category].icon}
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="">
                <p className="font-medium">{transaction?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {getFormattedRelativeDateTime(transaction?.dateTime)}
                </p>
              </div>
              {transaction?.autopay && (
                <Badge
                  variant={"default"}
                  className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                >
                  {transaction?.autopay}
                </Badge>
              )}
              <p
                className={
                  transaction.type === "DEBIT"
                    ? "text-red-600 dark:text-red-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }
              >
                {"₹"}&nbsp;
                {transaction?.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-4 pl-8 py-4 border-l-2">
        <div className="flex gap-3">
          <Badge
            variant={"default"}
            className="bg-primary/10 dark:bg-emerald-900 text-foreground"
          >
            {currentTransaction?.category}
          </Badge>
          {currentTransaction?.autopay && (
            <Badge
              variant={"default"}
              className="bg-primary/10 dark:bg-emerald-900 text-foreground"
            >
              {currentTransaction?.autopay}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <div className="p-4 rounded-full bg-primary/10">
            {TRANSACTION_CATEGORIES[currentTransaction?.category].icon}
          </div>
          <div className="flex-1 flex justify-between">
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold">
                {currentTransaction?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getFormattedDateTime(currentTransaction?.dateTime)}
              </p>
            </div>
            <p>
              <span className="text-2xl font-light">{"₹"}</span>
              <span className="text-3xl font-semibold">
                {" "}
                {currentTransaction?.amount}
              </span>
            </p>
          </div>
        </div>
        {currentTransaction?.desc && (
          <p className="text-muted-foreground">{currentTransaction?.desc}</p>
        )}
        <div className="w-full pt-3 grid grid-cols-4">
          {[
            {
              name: "type",
              icon: TRANSACTION_TYPES[currentTransaction?.type].icon,
              label: currentTransaction?.type,
              color: "red",
            },
            {
              name: "category",
              icon: TRANSACTION_CATEGORIES[currentTransaction?.category].icon,
              label: currentTransaction?.category,
              color: "red",
            },
          ].map((info, idx) => (
            <div className="flex flex-col gap-2 items-center" key={idx}>
              <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                {info.icon}
              </div>
              <p>{titleCase(info.label)}</p>
            </div>
          ))}
          {currentTransaction?.autopay && (
            <div className="flex flex-col gap-2 items-center">
              <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                {AUTOPAY_TYPES[currentTransaction?.autopay].icon}
              </div>
              <p className="text-wrap">
                {titleCase(currentTransaction?.autopay)}
              </p>
            </div>
          )}
          {currentTransaction?.necessity && (
            <div className="flex flex-col gap-2 items-center">
              <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                {EXPENSES_NECESSITY[currentTransaction?.necessity].icon}
              </div>
              <p className="text-wrap">
                {titleCase(currentTransaction?.necessity)}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
