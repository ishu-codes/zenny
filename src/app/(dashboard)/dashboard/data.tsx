export const EVENT_IMPORTANCE = {
  HIGH: { color: "red-500", icon: "sparkles" },
  MEDIUM: { color: "yellow-500", icon: "star" },
  LOW: { color: "blue-500", icon: "star-off" },
} as const;
export type EventInterface = {
  id: number;
  title: string;
  date: Date;
  desc: string;
  importance: keyof typeof EVENT_IMPORTANCE;
};

export const EVENTS: EventInterface[] = [
  {
    id: 1,
    title: "Team Meeting",
    date: new Date("2025-5-4 20:40"),
    desc: "Monthly team sync with all departments",
    importance: "MEDIUM",
  },
  {
    id: 2,
    title: "Project Deadline",
    date: new Date("2025-5-6"),
    desc: "Final submission for Q1 project",
    importance: "HIGH",
  },
  {
    id: 3,
    title: "Budget Review",
    date: new Date("2025-5-7"),
    desc: "Monthly budget review meeting",
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
    title: "International Debit Card",
    number: "3456-7812-3456-7812",
    name: "Mr. & Mrs. Coder",
    theme: "blue",
  },
];
