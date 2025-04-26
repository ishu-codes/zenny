"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { CARDS, TRANSACTIONS, CATEGORIES } from "./data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getFormattedDateTime } from "@/lib/date";

export function CardTab() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

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

  return (
    <div className="space-y-6">
      {/* To colored cards */}
      <div className="hidden">
        {[
          "bg-card-green",
          "bg-card-green-light",
          "bg-card-blue",
          "bg-card-blue-light",
        ].map((color) => (
          <div key={color} className={color}></div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div
            className="w-full flex gap-4 transition-transform duration-300 ease-in-out"
            // style={{
            //   transform: `translateX(calc(-${currentCardIndex * 100}% - ${
            //     currentCardIndex * 1
            //   }rem))`,
            // }}
          >
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
                  <SwiperSlide key={idx}>
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
        <div className="w-full flex justify-between">
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

      <div className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <Link
            href={"/transactions"}
            className="text-sm text-muted-foreground"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col">
          {TRANSACTIONS?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center py-2"
            >
              <div className="flex gap-2 items-center">
                <div className="text-secondary-foreground p-3 bg-accent rounded-full">
                  {CATEGORIES[transaction.category]}
                </div>
                <div className="">
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {/* {getFormattedDateTime(transaction.date)} */}
                    {getFormattedDateTime(transaction.date)}
                  </p>
                </div>
              </div>
              <p
                className={` ${
                  transaction.amount > 0
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {/* &#8377; */}
                {transaction.amount > 0 ? " +" : " "}
                {transaction.amount.toFixed(2)}
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
