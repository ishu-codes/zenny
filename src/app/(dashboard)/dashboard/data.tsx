import { Bath, BriefcaseBusiness, Plane, Utensils } from "lucide-react";

export type CardInterface = {
  title: string;
  number: string;
  name: string;
  theme: string;
};

export const CARDS: CardInterface[] = [
  {
    title: "Personal",
    number: "1234-5678-1234-5678",
    name: "Mr. Coder",
    theme: "blue",
  },
  {
    title: "Shared",
    number: "5678-1234-5678-1234",
    name: "Mr. & Mrs. Coder",
    theme: "green",
  },
  {
    title: "International",
    number: "3456-7812-3456-7812",
    name: "Mr. & Mrs. Coder",
    theme: "blue",
  },
];

export const CATEGORIES = {
  food: <Utensils size={20} />,
  travel: <Plane size={20} />,
  hygiene: <Bath size={20} />,
  work: <BriefcaseBusiness size={20} />,
};
// { name: "hygiene", icon: <Utensils /> },

export const TRANSACTIONS: {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: keyof typeof CATEGORIES;
  date: string;
}[] = [
  {
    id: 1,
    title: "Coffee",
    description: "Coffee Shop",
    amount: -32.5,
    category: "food",
    date: "2024-04-23",
  },
  {
    id: 2,
    title: "Salary Deposit",
    description: "Salary Deposit",
    amount: 5000.0,
    category: "work",
    date: "2024-04-22",
  },
  {
    id: 3,
    title: "Eggs & bread",
    description: "Grocery Store",
    amount: -128.75,
    category: "food",
    date: "2024-04-21",
  },
];
