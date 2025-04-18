"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  value: number;
  max?: number;
  color?: string;
}

const Progress: React.FC<ProgressProps> = ({
  color = "#000",
  className,
  value,
  max = 100,
  ...props
}) => {
  const [progress, setProgress] = React.useState<number>(1);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 250);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/10",
        className
      )}
      value={value}
      max={max}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          `bg-primary h-full transition-all duration-300 rounded-xl`
        )}
        style={{
          transform: `translateX(-${100 - (progress / max) * 100}%)`,
          backgroundColor: color,
        }}
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress };
