"use client";

import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getFormattedCurrency } from "@/lib/currency";

export default function ProgressBar2({
  progress,
}: {
  progress: {
    title: string;
    total: number;
    completed: number;
  };
}) {
  const [value, setValue] = useState<number>(5);
  const percentage =
    Math.round((progress.completed / progress.total) * 1000) / 10;

  useEffect(() => {
    setTimeout(() => setValue(percentage), 300);
  }, [percentage]);
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{progress.title}</dt>
      <dd className="text-2xl font-semibold text-foreground">
        &#8377; {getFormattedCurrency(progress.completed)}
      </dd>
      <Progress value={value} className="mt-6 h-2" />
      <dd className="mt-2 flex items-center justify-between text-sm">
        <span className="text-primary">{percentage}%</span>
        <span className="text-muted-foreground">
          &#8377; {getFormattedCurrency(progress.total)}
        </span>
      </dd>
    </div>
  );
}
