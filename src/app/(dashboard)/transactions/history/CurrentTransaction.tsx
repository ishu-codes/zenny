"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { ArrowLeftRight, BadgeCheck, User } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Badge } from "@/components/ui/badge";
import { TransactionInterface } from "../../dashboard/chartsData";
import { getFormattedCurrency } from "@/lib/currency";
import { getFormattedTime } from "@/lib/date";
import { titleCase } from "@/lib/data";

export default function CurrentTransaction({
  currentTransaction,
  setCurrentRightSection,
}: {
  currentTransaction: TransactionInterface;
  setCurrentRightSection: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
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
              {/* <DynamicIcon name={currentTransaction?.category?.icon} /> */}
              <User />
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">
                {currentTransaction.merchant.name}
              </h3>
              <div className="text-primary">
                {currentTransaction.merchant.is_business && (
                  <BadgeCheck size={22} />
                )}
              </div>
            </div>
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

      <div className="flex flex-col">
        <p className="text-lg">{currentTransaction?.title}</p>
        {currentTransaction?.desc && (
          <p className="text-sm text-muted-foreground">
            {currentTransaction?.desc}
          </p>
        )}
      </div>
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
            <div className="w-10 h-10 p-[10px] bg-primary/5 dark:bg-primary/10 rounded-full">
              <DynamicIcon size={20} name={info.icon} />
            </div>
            <p className="text-sm">{titleCase(info.label)}</p>
          </div>
        ))}
        {currentTransaction?.autopay && (
          <div className="flex flex-col gap-2 items-center">
            <div className="w-10 h-10 p-[10px] bg-primary/5 dark:bg-primary/10 rounded-full">
              <DynamicIcon
                size={20}
                name={currentTransaction?.autopay.type.icon}
              />
            </div>
            <p className="text-wrap text-sm">
              {titleCase(currentTransaction?.autopay.type.name)}
            </p>
          </div>
        )}
        {currentTransaction?.necessity && (
          <div className="flex flex-col gap-2 items-center">
            <div className="w-10 h-10 p-[10px] bg-primary/5 dark:bg-primary/10 rounded-full">
              <DynamicIcon
                size={20}
                name={currentTransaction?.necessity?.icon}
              />
            </div>
            <p className="text-wrap text-sm">
              {titleCase(currentTransaction?.necessity.name)}
            </p>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <p>Actions</p>
        <div className="w-full pt-3 grid grid-cols-4">
          {[
            {
              name: "type",
              icon: <ArrowLeftRight size={20} />,
              label: "Past transactions",
              action: () => setCurrentRightSection(1),
            },
            {
              name: "type",
              icon: <ArrowLeftRight size={20} />,
              label: "Past transactions",
              action: () => setCurrentRightSection(2),
            },
          ].map((info, idx) => (
            <div
              className="w-24 flex flex-col gap-2 px-2 py-2 items-center cursor-pointer hover:bg-accent group rounded-lg"
              key={idx}
              onClick={info.action}
            >
              <div className="w-10 h-10 p-[10px] bg-primary/5 dark:bg-primary/10 group-hover:bg-transparent rounded-full">
                {info.icon}
              </div>
              <p className="text-sm text-balance text-center">
                {titleCase(info.label)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
