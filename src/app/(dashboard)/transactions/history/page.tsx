"use client";

import { FormEvent, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { CARDS } from "../../dashboard/data";
import {
  CategoryInterface,
  CardInterface,
  CARDS,
} from "../../dashboard/chartsData";

import TransactionHistory from "./TransactionHistory";
import {
  TransactionByMonth,
  useCards,
  useCategories,
  useTransactions,
} from "@/hooks/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function History() {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const { data: cardsData, isLoading: isCardLoading } = useCards();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories();

  const { data: transactionsData, isLoading: isTransactionsLoading } =
    useTransactions();

  // Fiter section
  const [currentCardId, setCurrentCardId] = useState<string>("0");
  const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] =
    useState<TransactionByMonth[]>();

  const updateFilter = () => {
    setFilteredTransactions(
      transactionsData
        ?.map((month) => ({
          ...month,
          transactions: month.transactions.filter((transaction) => {
            const cardMatch =
              !currentCardId ||
              currentCardId == "0" ||
              currentCardId === transaction.card.id;

            const categoryMatch =
              !currentCategoryId ||
              currentCategoryId == 0 ||
              currentCategoryId === transaction.category.id;

            const queryMatch =
              !searchTerm ||
              transaction.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              transaction.desc
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

            return cardMatch && categoryMatch && queryMatch;
          }),
        }))
        .filter((month) => month.transactions.length > 0)
    );
  };

  const handleInputChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted!");
    updateFilter();
  };

  useEffect(() => {
    setCards([
      {
        id: "0",
        title: "All cards",
        name: "",
        number: "all",
        theme: "",
      },
      ...(cardsData ?? CARDS),
    ]);
  }, [cardsData]);

  useEffect(() => {
    setCategories([
      {
        id: 0,
        name: "All categories",
        icon: "gallery-horizontal",
      },
      ...(categoriesData ?? []),
    ]);
  }, [categoriesData]);

  useEffect(() => {
    if (searchTerm == "") updateFilter();
  }, [searchTerm]);

  useEffect(() => {
    updateFilter();
  }, [isTransactionsLoading, currentCardId, currentCategoryId]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between gap-2">
        {/* Card filter */}
        <Select
          defaultValue={currentCardId}
          onValueChange={(value) => setCurrentCardId(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Card" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            {cards?.map((card, idx) => (
              <SelectItem key={idx} value={card.id}>
                {card.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search bar */}
        <form className="flex gap-2" onSubmit={(e) => handleInputChange(e)}>
          <Input
            className="w-60"
            placeholder="Search transaction.."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">
            <Search />
          </Button>
        </form>

        {/* Category Filter */}
        <Select
          defaultValue={currentCategoryId.toString()}
          onValueChange={(value) => setCurrentCategoryId(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            {categories?.map((category, idx) => (
              <SelectItem key={idx} value={category.id.toString()}>
                {category.name.charAt(0) + category.name.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col">
          <TransactionHistory
            transactionsByMonth={filteredTransactions}
            isTransactionLoading={isTransactionsLoading}
          />
        </div>
      </div>
    </div>
  );
}
