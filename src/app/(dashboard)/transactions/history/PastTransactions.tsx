"use client";

import Image from "next/image";
import { ArrowLeft, BadgeCheck, User } from "lucide-react";
import { useTransactionsOfMerchant } from "@/hooks/db";
import { getFormattedCurrency } from "@/lib/currency";
import { getFormattedTime } from "@/lib/date";
import { MERCHANTS } from "../../dashboard/chartsData";
import React from "react";

export default function PastTransactions({
  merchant,
  back,
}: {
  merchant: (typeof MERCHANTS)[number];
  back: () => void;
}) {
  const { data: pastTransactions } = useTransactionsOfMerchant(merchant.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-2 border-b-2 sticky top-0 bg-card">
        <div
          className="w-10 h-10 p-[10px] flex justify-center items-center mx-[-10px] rounded-full cursor-pointer hover:bg-accent/40"
          onClick={back}
        >
          <ArrowLeft size={20} />
        </div>
        <div className="w-10 h-10">
          {merchant.img && process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ? (
            <Image
              className="w-full h-full rounded-md"
              src={`https://img.logo.dev/${merchant.img}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&format=png`}
              alt={merchant.img ?? ""}
              width={128}
              height={128}
            />
          ) : (
            <div className="w-10 h-10 p-[10px] flex justify-center items-center bg-primary/10 rounded-full">
              <User size={20} />
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-between">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1">
              <h3 className="text-lg font-semibold">{merchant.name}</h3>
              <div className="text-primary">
                {merchant.is_business && <BadgeCheck size={18} />}
              </div>
            </div>
            {merchant.is_business && (
              <p className="text-xs -mt-1 text-muted-foreground">
                {merchant.img}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* {Array.from({ length: 6 }, (_, i) => i).map((index) => (
          <React.Fragment key={index}> */}
        {pastTransactions?.map((month, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <div className="flex justify-between px-4 pb-1 border-b">
              <h3 className="text-lg font-medium">{month.month}</h3>
              <p className="text-lg">
                &#8377; {getFormattedCurrency(month.total)}
              </p>
            </div>

            {month.transactions?.map((transaction, idx) => (
              <div
                key={idx}
                className="flex justify-between px-4 py-2 hover:bg-accent rounded-lg"
              >
                <div className="flex flex-col">
                  <h3 className="">{transaction?.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {getFormattedTime(transaction.datetime)}
                  </p>
                </div>
                <div>&#8377; {getFormattedCurrency(transaction.amount)}</div>
              </div>
            ))}
          </div>
        ))}
        {/* </React.Fragment>
        ))} */}
      </div>
    </div>
  );
}
