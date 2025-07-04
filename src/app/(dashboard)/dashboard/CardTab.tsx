"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CARDS } from "./data";
import {
  AUTOPAY_TYPES,
  EXPENSES_NECESSITY,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
  TransactionInterface,
  TRANSACTIONS,
} from "./chartsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { getFormattedDateTime, getFormattedRelativeDateTime } from "@/lib/date";
import { getFormattedCurrency } from "@/lib/currency";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { titleCase } from "@/lib/data";
import Image from "next/image";
import { getFormattedRelativeDateTime } from "@/lib/date";

export function CardTab() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionInterface | null>();
  const [transactionDialogVisible, setTransactionDialogVisible] =
    useState<boolean>(false);

  const handlePrevCard = () => {
    const newIndex =
      currentCardIndex > 0 ? currentCardIndex - 1 : CARDS.length - 1;
    swiperInstance?.slideTo(newIndex);
  };
  const handleNextCard = () => {
    const newIndex =
      currentCardIndex < CARDS.length - 1 ? currentCardIndex + 1 : 0;
    swiperInstance?.slideTo(newIndex);
  };
  const moveTo = (index: number) => {
    swiperInstance?.slideTo(index);
  };

  const handleTransactionDialog = (
    transaction: TransactionInterface | null
  ) => {
    if (transaction == null) {
      setTransactionDialogVisible(false);
      setTimeout(setSelectedTransaction, 300);
    } else {
      setSelectedTransaction(transaction);
      setTransactionDialogVisible(true);
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-2">
        <div className="flex whitespace-nowrap">
          <div className="w-full flex gap-4 transition-transform duration-300 ease-in-out">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              onSwiper={setSwiperInstance}
              onSlideChange={(e) => setCurrentCardIndex(e.activeIndex)}
              // active
              // navigation
              // pagination={{ clickable: true }}
              className="cursor-grab active:cursor-grabbing"
            >
              {CARDS?.map((card, idx) => {
                const digitsToVisible = 4;
                return (
                  <SwiperSlide key={idx} className="px-6">
                    <Card
                      key={card.number}
                      className={`w-full shrink-0 relative text-white overflow-hidden bg-card-${card.theme}`}
                    >
                      <CardHeader className="z-10">
                        <CardTitle className="text-xl">{card.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="mt-4 space-y-2 z-10">
                        <p className="text-lg tracking-[.3rem] md:tracking-[.5rem]">
                          {"●●●● ●●●● ●●●● "}
                          {/* &#9679; */}
                          {card.number.slice(
                            card.number.length - digitsToVisible
                          )}
                        </p>
                      </CardContent>
                      <CardFooter className="border-t border-white/20 z-10">
                        <p>{card.name}</p>
                      </CardFooter>
                      <CardTriangle color={card.theme} />
                    </Card>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full flex justify-between px-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/50 hover:bg-background/80"
            onClick={handlePrevCard}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Card Indicators */}
          <div className="flex justify-center gap-2 mt-4 z-20">
            {CARDS.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                  index === currentCardIndex
                    ? "w-10 bg-primary"
                    : "w-2 bg-primary/20"
                }`}
                onClick={() => moveTo(index)}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/50 hover:bg-background/80"
            onClick={handleNextCard}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col px-6">
        <div className="flex justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <Link
            href={"/transactions/history"}
            className="font-base text-xs text-muted-foreground border border-transparent hover:border-border px-3 py-2 rounded-md"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-col">
          {/* Transaction Dialog */}
          <Dialog
            open={transactionDialogVisible}
            onOpenChange={() => handleTransactionDialog(null)}
          >
            <DialogContent className="flex flex-col gap-4">
              <DialogHeader className="h-0">
                <DialogTitle className="sr-only">
                  {selectedTransaction?.title}
                </DialogTitle>
              </DialogHeader>
              <div className="flex gap-3 -mt-4">
                <Badge
                  variant={"default"}
                  className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                >
                  {selectedTransaction?.category}
                </Badge>
                {selectedTransaction?.autopay && (
                  <Badge
                    variant={"default"}
                    className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                  >
                    {selectedTransaction?.autopay}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-12">
                  {selectedTransaction?.img !== "" &&
                  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ? (
                    <Image
                      className="w-full h-full rounded-md"
                      src={`https://img.logo.dev/${selectedTransaction?.img}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&format=png`}
                      alt={selectedTransaction?.img || "logo"}
                      width={128}
                      height={128}
                    />
                  ) : (
                    <div className="w-12 h-12 p-3 flex justify-center items-center bg-primary/10 rounded-full">
                      {selectedTransaction && (
                        <DynamicIcon
                          name={
                            TRANSACTION_CATEGORIES[
                              selectedTransaction?.category
                            ].icon
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 flex justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-semibold">
                      {selectedTransaction?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTransaction?.dateTime.toLocaleString()}
                    </p>
                  </div>
                  <p>
                    <span className="text-2xl font-light">{"₹"}</span>
                    <span className="text-3xl font-semibold">
                      {" "}
                      {getFormattedCurrency(
                        selectedTransaction?.amount || 0,
                        true
                      )}
                    </span>
                  </p>
                </div>
              </div>
              {selectedTransaction?.desc && (
                <p className="text-muted-foreground">
                  {selectedTransaction?.desc}
                </p>
              )}
              <div className="w-full grid grid-cols-4">
                {[
                  {
                    name: "type",
                    icon: TRANSACTION_TYPES[
                      selectedTransaction?.type || "DEBIT"
                    ].icon,
                    label: selectedTransaction?.type,
                    color: "red",
                  },
                  {
                    name: "category",
                    icon: TRANSACTION_CATEGORIES[
                      selectedTransaction?.category || "OTHER"
                    ].icon,
                    label: selectedTransaction?.category,
                    color: "red",
                  },
                ].map((info, idx) => (
                  <div className="flex flex-col gap-2 items-center" key={idx}>
                    <div className="w-12 h-12 p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                      <DynamicIcon name={info.icon} />
                    </div>
                    <p>{titleCase(info?.label || "OTHER")}</p>
                  </div>
                ))}
                {selectedTransaction?.autopay && (
                  <div className="flex flex-col gap-2 items-center">
                    <div className="w-12 h-12 p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                      <DynamicIcon
                        name={AUTOPAY_TYPES[selectedTransaction?.autopay].icon}
                      />
                    </div>
                    <p className="text-wrap">
                      {titleCase(selectedTransaction?.autopay)}
                    </p>
                  </div>
                )}
                {selectedTransaction?.necessity && (
                  <div className="flex flex-col gap-2 items-center">
                    <div className="w-12 h-12 p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                      <DynamicIcon
                        name={
                          EXPENSES_NECESSITY[selectedTransaction?.necessity]
                            .icon
                        }
                      />
                    </div>
                    <p className="text-wrap">
                      {titleCase(selectedTransaction?.necessity)}
                    </p>
                  </div>
                )}
              </div>

              {/* <div className="flex mt-4"> */}
              <Button variant={"outline"} asChild>
                <Link
                  href={`/transactions/history?id=${selectedTransaction?.id}`}
                  className="w-full mt-4"
                >
                  View transaction history
                </Link>
              </Button>
              {/* </div> */}
            </DialogContent>
          </Dialog>

          {TRANSACTIONS?.slice(0, 3).map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-accent/50"
              onClick={() => handleTransactionDialog(transaction)}
            >
              <div className="flex gap-2 items-center">
                <div className="text-secondary-foreground p-3 bg-accent rounded-full">
                  <DynamicIcon
                    name={TRANSACTION_CATEGORIES[transaction.category].icon}
                    size={24}
                  />
                </div>
                <div className="">
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {/* {getFormattedDateTime(transaction.date)} */}
                    {getFormattedRelativeDateTime(transaction.dateTime)}
                  </p>
                </div>
              </div>
              <p
                className={` ${
                  transaction.type === "CREDIT"
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {/* &#8377; {transaction.amount.toFixed(2)} */}
                &#8377; {getFormattedCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardTriangle(props: { color?: string }) {
  const [color] = [props.color ?? "#5F9A67"];

  return (
    <div
      className={`absolute left-2/3 top-2/3 -translate-y-1/2 w-full h-full rotate-45 bg-card-${color}-light`}
      // style={{ backgroundColor: color }}
    ></div>
  );
}
