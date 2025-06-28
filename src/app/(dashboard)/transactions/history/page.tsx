"use client";

import { useEffect, useState } from "react";

import { CardInterface, CARDS } from "../../dashboard/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import TransactionHistory from "./TransactionHistory";

export default function History() {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [currentCardNum, setCurrentCardNum] = useState<string>("all");

  useEffect(() => {
    setCards([
      {
        title: "All cards",
        name: "",
        number: "all",
        theme: "",
      },
      ...CARDS,
    ]);
  }, []);

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
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}
