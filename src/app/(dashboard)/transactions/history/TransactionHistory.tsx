"use client";

import { useState } from "react";
import Image from "next/image";
import { DynamicIcon } from "lucide-react/dynamic";
// import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { getFormattedTime } from "@/lib/date";
import { titleCase } from "@/lib/data";
import { TRANSACTIONS, TransactionInterface } from "../../dashboard/chartsData";
import { Badge } from "@/components/ui/badge";
import { getFormattedCurrency } from "@/lib/currency";

export default function TransactionHistory({
  transactions,
}: {
  transactions: TransactionInterface[];
}) {
  const [currentTransaction, setCurrentTransaction] =
    useState<TransactionInterface>(TRANSACTIONS[0]);

  // const currentDate = new Date();

  return (
    <Card className="flex flex-row px-6">
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
            <div className="w-12 h-12 p-3 rounded-full bg-primary/10">
              <DynamicIcon name={transaction?.category?.icon} />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="">
                <p className="font-medium">{transaction?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {/* {getFormattedRelativeDateTime(transaction?.dateTime)} */}
                  {/* {formatRelative(transaction?.datetime, currentDate)} */}
                  {/* {formatDistanceToNow(transaction?.datetime)} */}
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
                    ? "text-red-600 dark:text-red-400"
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

      {currentTransaction && (
        <div className="flex-1 flex flex-col gap-4 pl-8 py-4 border-l-2">
          <div className="flex gap-3">
            <Badge
              variant={"default"}
              className="bg-primary/10 dark:bg-emerald-900 text-foreground"
            >
              {currentTransaction?.category.name}
            </Badge>
            {currentTransaction?.autopay && (
              <Badge
                variant={"default"}
                className="bg-primary/10 dark:bg-emerald-900 text-foreground"
              >
                {currentTransaction?.autopay.type.name}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-12">
              {currentTransaction.merchant.img &&
              process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ? (
                <Image
                  className="w-full h-full rounded-md"
                  src={`https://img.logo.dev/${currentTransaction.merchant.img}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&format=png`}
                  alt={currentTransaction.merchant.img ?? ""}
                  width={128}
                  height={128}
                />
              ) : (
                <div className="w-12 h-12 p-3 flex justify-center items-center bg-primary/10 rounded-full">
                  <DynamicIcon name={currentTransaction?.category?.icon} />
                </div>
              )}
            </div>
            <div className="flex-1 flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold">
                  {currentTransaction?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {/* {getFormattedDateTime(currentTransaction?.datetime)} */}
                  {getFormattedTime(currentTransaction?.datetime, true)}
                  {/* {format(currentTransaction?.datetime, "d LLL y h:m a")} */}
                </p>
              </div>
              <p>
                <span className="text-2xl font-light">{"₹"}</span>
                <span className="text-3xl font-semibold">
                  {" "}
                  {getFormattedCurrency(currentTransaction?.amount, true)}
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
                icon: currentTransaction?.type.icon,
                label: currentTransaction?.type.name,
                color: "red",
              },
              {
                name: "category",
                icon: currentTransaction?.category?.icon,
                label: currentTransaction?.category.name,
                color: "red",
              },
            ].map((info, idx) => (
              <div className="flex flex-col gap-2 items-center" key={idx}>
                <div className="w-12 h-12 p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                  <DynamicIcon name={info.icon} />
                </div>
                <p>{titleCase(info.label)}</p>
              </div>
            ))}
            {currentTransaction?.autopay && (
              <div className="flex flex-col gap-2 items-center">
                <div className="w-12 h-12 p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                  <DynamicIcon name={currentTransaction?.autopay.type.icon} />
                </div>
                <p className="text-wrap">
                  {titleCase(currentTransaction?.autopay.type.name)}
                </p>
              </div>
            )}
            {currentTransaction?.necessity && (
              <div className="flex flex-col gap-2 items-center">
                <div className="w-12 h-12 p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                  <DynamicIcon name={currentTransaction?.necessity?.icon} />
                </div>
                <p className="text-wrap">
                  {titleCase(currentTransaction?.necessity.name)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
