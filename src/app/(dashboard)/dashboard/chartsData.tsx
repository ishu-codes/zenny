import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Bath,
  // Bolt,
  CircleEllipsis,
  Coins,
  // ChevronLast,
  // ChevronsDown,
  // ChevronsUp,
  Cross,
  Drama,
  Gift,
  House,
  // HouseIcon,
  Plane,
  Podcast,
  Sparkles,
  Star,
  StarOff,
  Utensils,
} from "lucide-react";

export const SHORT_INFO = [
  {
    title: "Total Balance",
    value: "4,32,568",
    percentageChange: 3.12,
    lastMonth: "28,940",
  },
  {
    title: "Change this month",
    value: "2,45,860",
    percentageChange: 1.98,
    lastMonth: "21,230",
  },
  {
    title: "Expenses this month",
    value: "2,530",
    percentageChange: -4.78,
    lastMonth: "26,340",
  },
  {
    title: "Income this month",
    value: "24,560",
    percentageChange: 2.84,
    lastMonth: "28,940",
  },
];

export const MONTHLY_EXPENSES = {
  labels: ["Dec", "Jan", "Feb", "Mar", "Apr"],
  values: [
    { name: "Expenses", data: [150, 200, 180, 220, 170] },
    { name: "Revenue", data: [170, 180, 210, 120, 170] },
  ],
};
export const EXPENSES_BY_CATEGORIES = {
  labels: ["Food", "Travel", "Hygiene", "Others"],
  values: [100, 80, 60, 20],
};

export const TRANSACTION_CATEGORIES = {
  FOOD: { id: 1, icon: <Utensils /> },
  TRAVEL: { id: 2, icon: <Plane /> },
  ENTERTAINMENT: { id: 3, icon: <Drama /> },
  HYGIENE: { id: 4, icon: <Bath /> },
  HEALTH: { id: 5, icon: <Cross /> },
  GIFT: { id: 5, icon: <Gift /> },
  HOME: { id: 6, icon: <House /> },
  OTHER: { id: 7, icon: <CircleEllipsis /> },
};

export const EXPENSES_NECESSITY = {
  TRIVIAL: { icon: <StarOff /> },
  DESIRABLE: { icon: <Star /> },
  ESSENTIAL: { icon: <Sparkles /> },
};

export const TRANSACTION_TYPES = {
  DEBIT: { icon: <BanknoteArrowDown /> },
  CREDIT: { icon: <BanknoteArrowUp /> },
};

export const AUTOPAY_TYPES = {
  SUBSCRIPTION: { icon: <Podcast /> },
  EMI: { icon: <Coins /> },
  RENT: { icon: <House /> },
};

export type TransactionInterface = {
  id: number;
  title: string;
  desc?: string;
  category: keyof typeof TRANSACTION_CATEGORIES;
  necessity?: keyof typeof EXPENSES_NECESSITY;
  amount: number;
  dateTime: Date;
  type: keyof typeof TRANSACTION_TYPES;
  autopay?: keyof typeof AUTOPAY_TYPES;
};

export const TRANSACTIONS: TransactionInterface[] = [
  {
    id: 1,
    title: "YouTube Premium",
    desc: "YouTube premium subscription for ads-free video & music streaming.",
    category: "ENTERTAINMENT",
    necessity: "DESIRABLE",
    amount: 89,
    dateTime: new Date("2025-02-01 10:45"),
    type: "DEBIT",
    autopay: "SUBSCRIPTION",
  },
  {
    id: 5,
    title: "Gift",
    desc: "Gift from someone",
    category: "GIFT",
    amount: 501,
    dateTime: new Date("2025-02-01 10:45"),
    type: "CREDIT",
  },
  {
    id: 2,
    title: "Pizza",
    desc: "Pizaa at Domino's Pizza",
    category: "FOOD",
    necessity: "TRIVIAL",
    amount: 350,
    dateTime: new Date("2025-03-04 20:45"),
    type: "DEBIT",
  },
  {
    id: 3,
    title: "Chicken at KFC",
    desc: "Fried Chicken at KFC",
    category: "FOOD",
    necessity: "DESIRABLE",
    amount: 460,
    dateTime: new Date("2025-04-05 18:30"),
    type: "DEBIT",
  },
  {
    id: 4,
    title: "Cab for KFC",
    desc: "To & fro from KFC",
    category: "TRAVEL",
    necessity: "ESSENTIAL",
    amount: 100,
    dateTime: new Date("2025-04-05 18:30"),
    type: "DEBIT",
  },
  {
    id: 6,
    title: "Burger King",
    desc: "Burger from Burger King",
    category: "FOOD",
    necessity: "TRIVIAL",
    amount: 120,
    dateTime: new Date("2025-05-27 20:30"),
    type: "DEBIT",
  },
];

export type BillInterface = {
  id: string;
  title: string;
  desc?: string;
  category: keyof typeof TRANSACTION_CATEGORIES;
  necessity?: keyof typeof EXPENSES_NECESSITY;
  amount: number;
  dateTime: Date;
  type: keyof typeof TRANSACTION_TYPES;
  autopay?: keyof typeof AUTOPAY_TYPES;
};

export const PENDING_BILLS: BillInterface[] = [
  {
    id: "1",
    title: "House rent",
    amount: 10250,
    category: "HOME",
    type: "DEBIT",
    dateTime: new Date("2025-06-01 00:00"),
  },
  {
    id: "2",
    title: "Electricity",
    amount: 2000,
    category: "HOME",
    type: "DEBIT",
    dateTime: new Date("2025-06-02 00:00"),
  },
  {
    id: "3",
    title: "YouTube Premium",
    amount: 89,
    category: "ENTERTAINMENT",
    type: "DEBIT",
    dateTime: new Date("2025-06-05 00:00"),
  },
];
