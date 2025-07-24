"use client";

import { useEffect, useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Card } from "@/components/ui/card";
import { getFormattedTime } from "@/lib/date";
import { TRANSACTIONS, TransactionInterface } from "../../dashboard/chartsData";
import { Badge } from "@/components/ui/badge";
import { getFormattedCurrency } from "@/lib/currency";
import CurrentTransaction from "./CurrentTransaction";
import PastTransactions from "./PastTransactions";
import { TransactionByMonth } from "@/hooks/db";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionHistory({
  transactionsByMonth,
  isTransactionLoading,
}: {
  transactionsByMonth?: TransactionByMonth[];
  isTransactionLoading: boolean;
}) {
  const [currentTransaction, setCurrentTransaction] =
    useState<TransactionInterface>();

  const [currentRightSection, setCurrentRightSection] = useState<number>(0);

  useEffect(() => {
    if (transactionsByMonth && transactionsByMonth?.length > 0) {
      setCurrentTransaction(transactionsByMonth[0].transactions[0]);
    }
  }, [isTransactionLoading, transactionsByMonth]);

  return (
    <Card className="flex flex-row py-0 gap-0">
      <div className="w-1/2 h-[68vh] px-6 py-6 overflow-y-auto">
        {isTransactionLoading ? (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between pb-2 border-b">
              <Skeleton className="w-20 h-8" />
              {/* <Skeleton className="w-20 h-8" /> */}
            </div>

            <div className="flex flex-col gap-4">
              {Array.from({ length: 8 }, (_, i) => i).map((num) => (
                <div className="flex justify-between" key={num}>
                  <Skeleton className="w-60 h-10" />
                  <Skeleton className="w-20 h-10" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {transactionsByMonth?.map((month, index) => (
              <div className="flex flex-col gap-2 group" key={index}>
                <div className="flex justify-between px-2 pb-1 border-b">
                  <h3 className="text-lg font-medium">{month.month}</h3>
                  <p className="font-medium opacity-0 group-hover:opacity-100">
                    {month.total > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        &#8377; +{getFormattedCurrency(month.total)}
                      </span>
                    ) : (
                      <span>
                        &#8377;{" "}
                        {getFormattedCurrency(month.total).replace("-", "")}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col">
                  {month.transactions.map((transaction, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-4 items-center p-2 rounded-lg cursor-pointer ${
                        transaction.id === currentTransaction?.id
                          ? "bg-primary/5"
                          : "hover:bg-muted/75"
                      }`}
                      onClick={() => setCurrentTransaction(transaction)}
                    >
                      <div className="w-10 h-10 p-[10px] rounded-full bg-primary/10">
                        <DynamicIcon
                          size={20}
                          name={transaction?.category?.icon}
                        />
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
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex relative border-l-2 overflow-x-hidden">
        <div
          className={`absolute inset-0 w-full flex flex-col gap-4 p-6 overflow-y-auto transition-transform duration-300`}
          style={{ transform: `translateX(${0 - currentRightSection * 100}%)` }}
        >
          <CurrentTransaction
            currentTransaction={currentTransaction}
            isTransactionLoading={isTransactionLoading}
            setCurrentRightSection={setCurrentRightSection}
          />
        </div>
        <div
          className={`absolute inset-0 w-full p-6 transition-transform duration-300`}
          style={{
            transform: `translateX(${(1 - currentRightSection) * 100}%)`,
          }}
        >
          {currentTransaction ? (
            <PastTransactions
              merchant={currentTransaction?.merchant}
              back={() => setCurrentRightSection(0)}
            />
          ) : (
            <div className="flex flex-col">
              <Skeleton className="w-full h-10" />
            </div>
          )}
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
