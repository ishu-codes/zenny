import { IconName } from "lucide-react/dynamic";

export const SHORT_INFO = [
  {
    title: "Total Balance",
    currentPeriod: 432568,
    lastPeriod: 28940,
  },
  {
    title: "Change this month",
    currentPeriod: 245860,
    lastPeriod: 21230,
  },
  {
    title: "Expenses this month",
    currentPeriod: 12530,
    lastPeriod: 26340,
  },
  {
    title: "Income this month",
    currentPeriod: 42560,
    lastPeriod: 28940,
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
  labels: ["Food", "Travel", "Hygiene", "Entertainment", "Others"],
  values: [51200, 36600, 28030, 25400, 20100],
};
export const EXPENSES_BY_NECESSITY = {
  labels: ["Essential", "Desirable", "Trivial"],
  values: [51200, 36600, 28030],
};

export const MERCHANTS = [
  {
    id: "1ab629d5-f55a-44e1-9554-79027d058a63",
    name: "Domino's",
    img: "dominos.com",
    is_business: true,
  },
  {
    id: "42167ca2-8a69-418f-b52d-ac88e826bfea",
    name: "Dad",
    img: null,
    is_business: false,
  },
  {
    id: "5591f4de-8fc3-41cf-85be-07ce59ad5548",
    name: "KFC",
    img: "kfc.com",
    is_business: true,
  },
  {
    id: "6443abb5-b270-4fcd-8a3e-31b9ac4e7b44",
    name: "Uber",
    img: "uber.com",
    is_business: true,
  },
  {
    id: "9e45037c-dfd2-421a-bf39-2c6a7d5cd9f1",
    name: "Renter (Palam)",
    img: null,
    is_business: false,
  },
  {
    id: "b2ffbaa6-d34c-4b68-9847-5e5211ecd0e0",
    name: "BSES Rajdhani Power Ltd",
    img: "bsesdelhi.com",
    is_business: true,
  },
  {
    id: "d2d46db7-cf06-40d8-996c-6e2f34b9ead6",
    name: "Burger King",
    img: "bk.com",
    is_business: true,
  },
  {
    id: "feb0bda8-77e4-48aa-ac50-a0dd4c6c7cc9",
    name: "Youtube",
    img: "youtube.com",
    is_business: true,
  },
];

export const CARDS = [
  {
    id: "ab9a62d5-bf86-4d47-bd59-f823d52cef83",
    number: "1234567890123456",
    title: "Primary",
    name: "Mr. Coder",
    theme: "blue",
    created_at: "2025-07-07 10:46:36.942954",
  },
  {
    id: "c0e3d4d0-9f71-4af9-a490-7f79b5e43684",
    number: "2345678901234567",
    title: "Shared",
    name: "Mr. & Mrs. Coder",
    theme: "green",
    created_at: "2025-07-07 10:46:36.942954",
  },
  {
    id: "cc1851f0-3794-4129-80cc-91c22c3b0b57",
    number: "3456789012345678",
    title: "International Debit Card",
    name: "Mr. Coder",
    theme: "blue",
    created_at: "2025-07-07 10:46:36.942954",
  },
];

export const AUTOPAY_TYPES: { id: number; name: string; icon: IconName }[] = [
  { id: 1, name: "SUBSCRIPTION", icon: "podcast" },
  { id: 2, name: "EMI", icon: "coins" },
  { id: 3, name: "RENT", icon: "blend" },
  { id: 4, name: "BILL", icon: "circle-check" },
];

export const AUTOPAY: {
  id: string;
  title: string;
  amount: number;
  type: (typeof AUTOPAY_TYPES)[number];
  merchant: (typeof MERCHANTS)[number];
  card: (typeof CARDS)[number];
  start: string;
  end: string;
  active: boolean;
  created_at: string;
}[] = [
  {
    id: "2eba316c-b971-4e93-b858-2d57ad6fcdbc",
    title: "House Rent",
    amount: 10000,
    type: AUTOPAY_TYPES[2],
    merchant: MERCHANTS[4],
    card: CARDS[0],
    start: "2023-05-10 10:23:54",
    end: "2027-05-10 00:00:00",
    active: true,
    created_at: "2023-05-10 10:23:54",
  },
  {
    id: "3153d00c-1565-43f4-a8d0-xxxxxxxxxxxx",
    title: "Youtube Premium",
    amount: 79,
    type: AUTOPAY_TYPES[0],
    merchant: MERCHANTS[7],
    card: CARDS[0],
    start: "2024-04-23 10:23:54",
    end: "2024-09-22 00:00:00",
    active: false,
    created_at: "2024-03-28 20:23:54",
  },
  {
    id: "90b1e4e5-9b3b-4f94-bc61-xxxxxxxxxxxx",
    title: "Youtube Premium",
    amount: 89,
    type: AUTOPAY_TYPES[0],
    merchant: MERCHANTS[7],
    card: CARDS[0],
    start: "2024-10-22 10:23:54",
    end: "2025-04-22 00:00:00",
    active: false,
    created_at: "2024-10-22 10:23:54",
  },
  {
    id: "ac35b0e2-943a-44f6-9358-xxxxxxxxxxxx",
    title: "Youtube Premium",
    amount: 89,
    type: AUTOPAY_TYPES[0],
    merchant: MERCHANTS[7],
    card: CARDS[0],
    start: "2025-05-08 10:23:54",
    end: "2026-04-12 00:00:00",
    active: true,
    created_at: "2025-04-13 10:23:54",
  },
  {
    id: "eed598ab-fad0-48f5-a3fd-xxxxxxxxxxxx",
    title: "Electricity",
    amount: 2000,
    type: AUTOPAY_TYPES[3],
    merchant: MERCHANTS[5],
    card: CARDS[0],
    start: "2023-05-10 10:23:54",
    end: "2027-05-10 00:00:00",
    active: true,
    created_at: "2023-05-10 10:23:54",
  },
];

export const CATEGORIES: { id: number; name: string; icon: IconName }[] = [
  { id: 1, name: "FOOD", icon: "utensils" },
  { id: 2, name: "TRAVEL", icon: "plane" },
  { id: 3, name: "ENTERTAINMENT", icon: "drama" },
  { id: 4, name: "HYGIENE", icon: "bath" },
  { id: 5, name: "HEALTH", icon: "cross" },
  { id: 6, name: "GIFT", icon: "gift" },
  { id: 7, name: "HOME", icon: "house" },
  { id: 8, name: "WORK", icon: "briefcase-business" },
  { id: 9, name: "OTHER", icon: "circle-ellipsis" },
];

export const NECESSITY: { id: number; name: string; icon: IconName }[] = [
  { id: 1, name: "TRIVIAL", icon: "star-off" },
  { id: 2, name: "DESIRABLE", icon: "star" },
  { id: 3, name: "ESSENTIAL", icon: "sparkles" },
];

export const TRANSACTION_TYPES: { id: number; name: string; icon: IconName }[] =
  [
    { id: 1, name: "DEBIT", icon: "banknote-arrow-down" },
    { id: 2, name: "CREDIT", icon: "banknote-arrow-up" },
    { id: 3, name: "LENDING", icon: "helping-hand" },
  ];

export type TransactionInterface = {
  id: number;
  title: string;
  desc?: string;
  amount: number;
  category: (typeof CATEGORIES)[number];
  merchant: (typeof MERCHANTS)[number];
  necessity: (typeof NECESSITY)[number];
  type: (typeof TRANSACTION_TYPES)[number];
  autopay?: (typeof AUTOPAY)[number];
  datetime: string;
};

export const TRANSACTIONS: TransactionInterface[] = [
  {
    id: 1,
    title: "YouTube Premium",
    desc: "YouTube premium subscription for ads-free video & music streaming.",
    amount: 89,
    category: CATEGORIES[2],
    merchant: MERCHANTS[0],
    necessity: NECESSITY[1],
    type: TRANSACTION_TYPES[0],
    autopay: AUTOPAY[0],
    datetime: "2025-02-01 10:45",
  },
  {
    id: 5,
    title: "Gift",
    desc: "Gift from someone",
    amount: 501,
    category: CATEGORIES[2],
    merchant: MERCHANTS[0],
    necessity: NECESSITY[1],
    type: TRANSACTION_TYPES[0],
    autopay: AUTOPAY[0],
    datetime: "2025-02-01 10:45",
  },
  {
    id: 2,
    title: "Pizza",
    desc: "Pizaa at Domino's Pizza",
    amount: 350,
    category: CATEGORIES[2],
    merchant: MERCHANTS[0],
    necessity: NECESSITY[1],
    type: TRANSACTION_TYPES[0],
    autopay: AUTOPAY[0],
    datetime: "2025-03-04 20:45",
  },
  {
    id: 3,
    title: "Chicken at KFC",
    desc: "Fried Chicken at KFC",
    amount: 460,
    category: CATEGORIES[2],
    merchant: MERCHANTS[0],
    necessity: NECESSITY[1],
    type: TRANSACTION_TYPES[0],
    autopay: AUTOPAY[0],
    datetime: "2025-04-05 18:30",
  },
  {
    id: 4,
    title: "Cab for KFC",
    desc: "To & fro from KFC",
    amount: 100,
    category: CATEGORIES[2],
    merchant: MERCHANTS[0],
    necessity: NECESSITY[1],
    type: TRANSACTION_TYPES[0],
    autopay: AUTOPAY[0],
    datetime: "2025-04-05 18:30",
  },
  {
    id: 6,
    title: "Burger King",
    desc: "Burger from Burger King",
    amount: 120,
    category: CATEGORIES[2],
    merchant: MERCHANTS[0],
    necessity: NECESSITY[1],
    type: TRANSACTION_TYPES[0],
    autopay: AUTOPAY[0],
    datetime: "2025-05-27 20:30",
  },
];

export type BillInterface = {
  id: string;
  title: string;
  desc?: string;
  amount: number;
  category: (typeof CATEGORIES)[number];
  necessity: (typeof NECESSITY)[number];
  type: (typeof TRANSACTION_TYPES)[number];
  autopay?: (typeof AUTOPAY)[number];
  datetime: string;
};

export const PENDING_BILLS: BillInterface[] = [
  {
    id: "1",
    title: "House rent",
    amount: 10250,
    category: CATEGORIES[6],
    necessity: NECESSITY[2],
    type: TRANSACTION_TYPES[0],
    datetime: "2025-06-01 00:00",
  },
  {
    id: "2",
    title: "Electricity",
    amount: 2000,
    category: CATEGORIES[6],
    necessity: NECESSITY[2],
    type: TRANSACTION_TYPES[0],
    datetime: "2025-06-02 00:00",
  },
  {
    id: "3",
    title: "YouTube Premium",
    amount: 89,
    category: CATEGORIES[2],
    necessity: NECESSITY[2],
    type: TRANSACTION_TYPES[0],
    datetime: "2025-06-05 00:00",
  },
];

export const FREQUENCIES = {
  DAILY: {},
  WEEKLY: {},
  MONTHLY: {},
};

export type BudgetInterface = {
  id: string;
  title: string;
  desc?: string;
  category: (typeof CATEGORIES)[number];
  necessity?: (typeof NECESSITY)[number];
  amount: number;
  frequency: keyof typeof FREQUENCIES;
  frequencyValue: string;
  type: (typeof TRANSACTION_TYPES)[number];
  isFixed: boolean;
  autopay?: (typeof AUTOPAY)[number];
};

export const BUDGETS: BudgetInterface[] = [
  {
    id: "1",
    title: "House Rent",
    desc: "",
    category: CATEGORIES[6],
    necessity: NECESSITY[2],
    amount: 10250,
    frequency: "MONTHLY",
    frequencyValue: "1",
    type: TRANSACTION_TYPES[0],
    isFixed: true,
    autopay: AUTOPAY[0],
  },
  {
    id: "2",
    title: "Electricity Bill",
    desc: "",
    category: CATEGORIES[6],
    necessity: NECESSITY[2],
    amount: 2000,
    frequency: "MONTHLY",
    frequencyValue: "1",
    type: TRANSACTION_TYPES[0],
    isFixed: true,
    autopay: AUTOPAY[4],
  },
  {
    id: "3",
    title: "YouTube Subscription",
    desc: "",
    category: CATEGORIES[2],
    necessity: NECESSITY[1],
    amount: 89,
    frequency: "MONTHLY",
    frequencyValue: "13",
    type: TRANSACTION_TYPES[0],
    isFixed: true,
    autopay: AUTOPAY[3],
  },
  {
    id: "4",
    title: "Grocery",
    desc: "",
    category: CATEGORIES[0],
    necessity: NECESSITY[2],
    amount: 5000,
    frequency: "MONTHLY",
    frequencyValue: "13",
    type: TRANSACTION_TYPES[0],
    isFixed: false,
  },
  {
    id: "5",
    title: "Salary",
    desc: "",
    category: CATEGORIES[7],
    amount: 125000,
    frequency: "MONTHLY",
    frequencyValue: "2",
    type: TRANSACTION_TYPES[1],
    isFixed: true,
  },
];

export type GoalInterface = {
  id: string;
  title: string;
  desc: string;
  category: (typeof CATEGORIES)[number];
  necessity: (typeof NECESSITY)[number];
  completed: number;
  total: number;
};

export const GOALS: GoalInterface[] = [
  {
    id: "1",
    title: "Car",
    desc: "5 Seater Prime Sedan for family",
    category: CATEGORIES[1],
    necessity: NECESSITY[1],
    completed: 574000,
    total: 1200000,
  },
  {
    id: "2",
    title: "House",
    desc: "A new house in Vile Parle",
    category: CATEGORIES[6],
    necessity: NECESSITY[1],
    completed: 3260000,
    total: 12000000,
  },
  {
    id: "3",
    title: "Emergency Fund",
    desc: "For emergency needs",
    category: CATEGORIES[8],
    necessity: NECESSITY[2],
    completed: 482000,
    total: 600000,
  },
  {
    id: "4",
    title: "Bungalow",
    desc: "A lavish bungalow for my family",
    category: CATEGORIES[6],
    necessity: NECESSITY[0],
    completed: 5424860,
    total: 12500000,
  },
];

export type SMART_TIPS_INTERFACE = {
  title: string;
  desc: string;
};

export const SMART_TIPS: SMART_TIPS_INTERFACE[] = [
  {
    title: "You can save upto 40% of your monthly expenses",
    desc: "Reduce trivial food consumption (like burger) from 4 days to 2 days in a week.",
  },
  {
    title: "You can save upto 60% of your monthly expenses",
    desc: "Reduce trivial food consumption (like burger) from 4 days to 2 days in a week.",
  },
  {
    title: "You can save upto 80% of your monthly expenses",
    desc: "Reduce trivial food consumption (like burger) from 4 days to 2 days in a week.",
  },
];
