"use client";

import { useState, useEffect } from "react";
import { BUDGETS, BudgetInterface } from "../../dashboard/chartsData";
import Budget from "./Budget";
import CurrentBudget from "./CurrentBudget";

export default function Page() {
  const [fixedBudgets, setFixedBudgets] = useState<BudgetInterface[]>();
  const [variableBudgets, setVariableBudgets] = useState<BudgetInterface[]>();
  const [currentBudget, setCurrentBudget] = useState<BudgetInterface>(
    BUDGETS[0]
  );

  useEffect(() => {
    setFixedBudgets(
      BUDGETS.filter((b) => b.isFixed).sort((a, b) => b.amount - a.amount)
    );
    setVariableBudgets(
      BUDGETS.filter((b) => !b.isFixed).sort((a, b) => b.amount - a.amount)
    );
  }, []);
  return (
    <div className="grid grid-cols-3 gap-6">
      <Budget
        className="col-span-2"
        title="Fixed Budgets"
        budgets={fixedBudgets}
        currentBudget={currentBudget}
        setCurrentBudget={setCurrentBudget}
      />
      <CurrentBudget className="row-span-2" currentBudget={currentBudget} />
      <Budget
        className="col-span-2"
        title="Variable Budgets"
        budgets={variableBudgets}
        currentBudget={currentBudget}
        setCurrentBudget={setCurrentBudget}
      />
    </div>
  );
}
