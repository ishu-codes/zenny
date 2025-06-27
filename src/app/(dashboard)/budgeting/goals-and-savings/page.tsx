"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar2 from "@/components/charts/ProgressBar2";
import { GoalInterface, GOALS } from "../../dashboard/chartsData";
import CurrentGoal from "./CurrentGoal";

export default function Page() {
  const [currentGoal, setCurrentGoal] = useState<GoalInterface>(GOALS[0]);

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardHeader className="flex justify-between">
          <CardTitle className="text-lg">Goals & Savings</CardTitle>
          <Link
            href={"/budgeting/goals-and-savings"}
            className="font-base text-xs text-muted-foreground border border-transparent hover:border-border px-3 py-2 rounded-md"
          >
            View all
          </Link>
        </CardHeader>
        <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 justify-between">
          {GOALS.sort((a, b) => b.total - a.total).map((progress, idx) => (
            <div
              className={`p-4 rounded-md cursor-pointer ${
                currentGoal?.id == progress.id
                  ? "bg-accent"
                  : "hover:bg-accent/60"
              }`}
              onClick={() => setCurrentGoal(progress)}
              key={idx}
            >
              <ProgressBar2 progress={progress} />
            </div>
          ))}
        </div>
      </Card>
      <CurrentGoal currentGoal={currentGoal} />
    </div>
  );
}
