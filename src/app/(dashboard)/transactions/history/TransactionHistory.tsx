"use client";

import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Card } from "@/components/ui/card";
import { getFormattedTime } from "@/lib/date";
import { TRANSACTIONS, TransactionInterface } from "../../dashboard/chartsData";
import { Badge } from "@/components/ui/badge";
import { getFormattedCurrency } from "@/lib/currency";
import CurrentTransaction from "./CurrentTransaction";
import PastTransactions from "./PastTransactions";

export default function TransactionHistory({
  transactions,
}: {
  transactions: TransactionInterface[];
}) {
  const [currentTransaction, setCurrentTransaction] =
    useState<TransactionInterface>(TRANSACTIONS[0]);

  const [currentRightSection, setCurrentRightSection] = useState<number>(0);

  return (
    <Card className="flex flex-row">
      <div className="w-1/2 pl-6">
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
            <div className="w-12 h-12 p-3 rounded-full bg-primary/10">
              <DynamicIcon name={transaction?.category?.icon} />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="">
                <p className="font-medium">{transaction?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {getFormattedTime(transaction?.datetime)}
                </p>
              </div>
              {transaction?.autopay && (
                <Badge
                  variant={"default"}
                  className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                >
                  {transaction?.autopay?.type?.name}
                </Badge>
              )}
              <p
                className={
                  transaction.type.name === "DEBIT"
                    ? ""
                    : "text-emerald-600 dark:text-emerald-400"
                }
              >
                {"₹"}&nbsp;
                {getFormattedCurrency(transaction?.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex relative border-l-2 overflow-x-hidden">
        <div
          className={`absolute inset-0 w-full flex flex-col gap-4 pl-8 pr-6 py-4 transition-transform duration-300`}
          style={{ transform: `translateX(${0 - currentRightSection * 100}%)` }}
        >
          <CurrentTransaction
            currentTransaction={currentTransaction}
            setCurrentRightSection={setCurrentRightSection}
          />
        </div>
        <div
          className={`absolute inset-0 w-full px-6 transition-transform duration-300`}
          style={{
            transform: `translateX(${(1 - currentRightSection) * 100}%)`,
          }}
        >
          <PastTransactions
            merchant={currentTransaction.merchant}
            back={() => setCurrentRightSection(0)}
          />
        </div>
        <div
          className={`absolute inset-0 w-full px-6 transition-transform duration-300`}
          style={{
            transform: `translateX(${(2 - currentRightSection) * 100}%)`,
          }}
        >
          {/* <div
            className="w-10 h-10 p-[10px] flex justify-center items-center mx-[-10px] rounded-full cursor-pointer hover:bg-accent/40"
            onClick={back}
          >
            <ArrowLeft size={20} />
          </div> */}
        </div>
      </div>
    </Card>
  );
}
