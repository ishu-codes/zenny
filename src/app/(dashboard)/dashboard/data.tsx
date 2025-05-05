import { Bath, BriefcaseBusiness, Plane, Utensils } from "lucide-react";

export type Event = {
  id: number;
  title: string;
  date: Date;
  description: string;
  importance: "HIGH" | "MEDIUM" | "LOW";
};

export const COLORS = {
  HIGH: "red-500",
  MEDIUM: "yellow-500",
  LOW: "blue-500",
};
export const EVENTS: Event[] = [
  {
    id: 1,
    title: "Team Meeting",
    date: new Date("2025-5-4 20:40"),
    description: "Monthly team sync with all departments",
    importance: "MEDIUM",
  },
  {
    id: 2,
    title: "Project Deadline",
    date: new Date("2025-5-6"),
    description: "Final submission for Q1 project",
    importance: "HIGH",
  },
  {
    id: 3,
    title: "Budget Review",
    date: new Date("2025-5-7"),
    description: "Monthly budget review meeting",
    importance: "LOW",
  },
];

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
