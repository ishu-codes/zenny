import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
  EXPENSES_NECESSITY,
  AUTOPAY_TYPES,
  BudgetInterface,
} from "../../dashboard/chartsData";
import { getFormattedCurrency } from "@/lib/currency";
import { titleCase } from "@/lib/data";

interface Props {
  className?: string;
  currentBudget?: BudgetInterface;
}

export default function CurrentBudget({ className, currentBudget }: Props) {
  return (
    <Card className={className}>
      {currentBudget ? (
        <CardContent>
          <div className="flex flex-col">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex gap-3">
                <Badge
                  variant={"default"}
                  className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                >
                  {currentBudget?.category}
                </Badge>
                {currentBudget?.autopay && (
                  <Badge
                    variant={"default"}
                    className="bg-primary/10 dark:bg-emerald-900 text-foreground"
                  >
                    {currentBudget?.autopay}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <div className="mb-auto p-4 rounded-full bg-primary/10">
                  {TRANSACTION_CATEGORIES[currentBudget?.category].icon}
                </div>
                <div className="flex-1 flex justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">
                      {currentBudget?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {/* {getFormattedDateTime(currentBudget?.dateTime)} */}
                      Every month on 1st.
                    </p>
                  </div>
                  <p>
                    <span className="text-xl font-light">{"₹"}</span>
                    <span className="text-2xl font-semibold">
                      {" "}
                      {getFormattedCurrency(currentBudget?.amount)}
                    </span>
                  </p>
                </div>
              </div>
              {currentBudget?.desc && (
                <p className="text-muted-foreground">{currentBudget?.desc}</p>
              )}
              <div className="w-full pt-3 grid grid-cols-4">
                {[
                  {
                    name: "type",
                    icon: TRANSACTION_TYPES[currentBudget?.type].icon,
                    label: currentBudget?.type,
                    color: "red",
                  },
                  {
                    name: "category",
                    icon: TRANSACTION_CATEGORIES[currentBudget?.category].icon,
                    label: currentBudget?.category,
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
                {currentBudget?.autopay && (
                  <div className="flex flex-col gap-2 items-center">
                    <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                      {AUTOPAY_TYPES[currentBudget?.autopay].icon}
                    </div>
                    <p className="text-wrap text-sm">
                      {titleCase(currentBudget?.autopay)}
                    </p>
                  </div>
                )}
                {currentBudget?.necessity && (
                  <div className="flex flex-col gap-2 items-center">
                    <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-full">
                      {EXPENSES_NECESSITY[currentBudget?.necessity].icon}
                    </div>
                    <p className="text-wrap text-sm">
                      {titleCase(currentBudget?.necessity)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          No Buget Selected!
        </div>
      )}
    </Card>
  );
}
