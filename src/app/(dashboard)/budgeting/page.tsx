import { Metadata } from "next";
import Cards from "./Cards";

export const metadata: Metadata = {
  title: "Budgeting | Zenny",
  description: "Create and manage your monthly or yearly budgets with ease.",
};

export default function BudgetingPage() {
  return (
    <div className="flex flex-col">
      <Cards />
    </div>
  );
}
