import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TRANSACTION_CATEGORIES,
  //   TRANSACTION_TYPES,
  EXPENSES_NECESSITY,
  //   AUTOPAY_TYPES,
  GoalInterface,
} from "../../dashboard/chartsData";
import { getFormattedCurrency } from "@/lib/currency";
import { titleCase } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
  currentGoal?: GoalInterface;
}

export default function CurrentGoal({ className, currentGoal }: Props) {
  return (
    <Card className={className}>
      {currentGoal ? (
        <>
          <CardContent>
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex gap-3">
                  <Badge
                    variant={"default"}
                    className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                  >
                    {currentGoal?.category}
                  </Badge>
                  {/* {currentGoal?.autopay && (
                  <Badge
                    variant={"default"}
                    className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                  >
                    {currentGoal?.autopay}
                  </Badge>
                )} */}
                </div>
                <div className="flex gap-2">
                  <div className="mb-auto p-4 rounded-full bg-primary/10">
                    {TRANSACTION_CATEGORIES[currentGoal?.category].icon}
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold">
                        {currentGoal?.title}
                      </h3>
                      {/* <p className="text-sm text-muted-foreground">
                      {currentGoal?.desc}
                    </p> */}
                    </div>
                    <p>
                      <span className="text-xl font-light">{"₹"}</span>
                      <span className="text-2xl font-semibold">
                        {" "}
                        {getFormattedCurrency(currentGoal?.completed)}
                      </span>
                    </p>
                  </div>
                </div>
                {currentGoal?.desc && (
                  <p className="text-muted-foreground">{currentGoal?.desc}</p>
                )}
                <div className="w-full pt-3 grid grid-cols-4">
                  {[
                    {
                      name: "category",
                      icon: TRANSACTION_CATEGORIES[currentGoal?.category].icon,
                      label: currentGoal?.category,
                      color: "red",
                    },
                  ].map((info, idx) => (
                    <div className="flex flex-col gap-2 items-center" key={idx}>
                      <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                        {info.icon}
                      </div>
                      <p className="text-sm">{titleCase(info.label)}</p>
                    </div>
                  ))}
                  {/* {currentGoal?.autopay && (
                  <div className="flex flex-col gap-2 items-center">
                    <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                      {AUTOPAY_TYPES[currentGoal?.autopay].icon}
                    </div>
                    <p className="text-wrap text-sm">
                      {titleCase(currentGoal?.autopay)}
                    </p>
                  </div>
                )} */}
                  {currentGoal?.necessity && (
                    <div className="flex flex-col gap-2 items-center">
                      <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                        {EXPENSES_NECESSITY[currentGoal?.necessity].icon}
                      </div>
                      <p className="text-wrap text-sm">
                        {titleCase(currentGoal?.necessity)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center mt-auto">
            <Button>Add amount</Button>
          </CardFooter>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          Select any budget to view its information!
        </div>
      )}
    </Card>
  );
}
