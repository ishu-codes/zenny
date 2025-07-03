"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SMART_TIPS } from "./chartsData";
import { useState } from "react";

export default function SmartTips() {
  const [index, setIndex] = useState<number>(0);
  const increment = () => {
    setIndex(index + 1 >= SMART_TIPS.length ? 0 : index + 1);
  };
  const decrement = () => {
    setIndex(index - 1 < 0 ? SMART_TIPS.length - 1 : index - 1);
  };
  return (
    <Card className="overflow-x-hidden">
      <CardHeader>
        <CardTitle>Smart Tips</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6 min-h-20 relative">
        {SMART_TIPS?.map((tip, idx) => (
          <div
            key={idx}
            className="absolute inset-0 w-full space-y-2 px-6 transition-all duration-300"
            style={{ left: `${(idx - index) * 100}%` }}
          >
            <h3 className="text-md">{tip?.title}</h3>
            <p className="text-muted-foreground text-sm">{tip?.desc}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant={"outline"} onClick={decrement}>
          Previous
        </Button>

        {/* Tip Indicators */}
        <div className="flex justify-center gap-2">
          {Array.from(
            { length: Math.min(SMART_TIPS.length, 5) },
            (_, i) => i
          ).map((idx) => (
            <button
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                idx === index ? "w-10 bg-primary" : "w-2 bg-primary/20"
              }`}
              onClick={() => setIndex(idx)}
            />
          ))}
        </div>
        <Button onClick={increment}>Next</Button>
      </CardFooter>
    </Card>
  );
}
