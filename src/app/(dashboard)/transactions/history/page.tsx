"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardInterface, CARDS } from "../../dashboard/data";
import { TRANSACTIONS } from "../../dashboard/chartsData";

import TransactionHistory from "./TransactionHistory";
import { useCards, useTransactions } from "@/hooks/db";

export default function History() {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const { data: cardsData, isLoading: isCardLoading } = useCards();
  const [currentCardNum, setCurrentCardNum] = useState<string>("all");

  const { data: transactionsData, isLoading: isTransactionsLoading } =
    useTransactions();

  useEffect(() => {
    setCards([
      {
        title: "All cards",
        name: "",
        number: "all",
        theme: "",
      },
      ...(cardsData ?? CARDS),
    ]);
  }, [cardsData]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-60 flex flex-col gap-2">
        <Select
          defaultValue={currentCardNum}
          onValueChange={(value) => setCurrentCardNum(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Card" />
          </SelectTrigger>
          <SelectContent>
            {cards?.map((card, idx) => (
              <SelectItem key={idx} value={card.number}>
                {card.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col">
          <TransactionHistory transactions={transactionsData ?? TRANSACTIONS} />
        </div>
      </div>
    </div>
  );
}
