import { use } from "react";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { summaryQueryFn } from "@/lib/dbData";
import { getFormattedCurrency } from "@/lib/currency";
import { queryClient } from "@/lib/react-query";

interface Props {
  period?: "year" | "month" | "week";
}

export default function SummaryData({ period }: Props) {
  const data = use(
    queryClient.fetchQuery({
      queryKey: ["summaryData", period ?? "month"],
      queryFn: () => summaryQueryFn(period ?? "month"),
      staleTime: 1000 * 60 * 60, // 1hr
    })
  );

  return (
    <div className="grid gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
      {data.map((info) => (
        <Card key={info.title}>
          <CardHeader>
            <CardDescription>{info.title}</CardDescription>
            <CardTitle className="text-2xl">
              &#8377; {getFormattedCurrency(info.currentPeriod)}
            </CardTitle>
          </CardHeader>
          {/* <Separator orientation="horizontal" className="px-4" /> */}
          {/* {info?.lastPeriod && info?.lastPeriod != 0 ? ( */}
          <CardFooter className="flex justify-between flex-wrap items-start text-sm">
            <CardDescription>
              <PercentageChange
                initial={info?.lastPeriod}
                final={info?.currentPeriod}
              />
            </CardDescription>
            <CardDescription>
              Last {period ?? "month"}:&nbsp;&nbsp;&#8377;{" "}
              {getFormattedCurrency(info?.lastPeriod)}
            </CardDescription>
          </CardFooter>
          {/* ) : (
            ""
          )} */}
        </Card>
      ))}
    </div>
  );
}

const PercentageChange = ({
  initial,
  final,
}: {
  initial: number;
  final: number;
}) => {
  const percentageChange = (final / initial - 1) * 100;
  if (percentageChange < 0 || (initial == 0 && final < 0))
    return (
      <div className="flex gap-1 text-sm text-red-600 dark:text-red-400">
        <TrendingDown size={20} />
        <span className="font-medium">
          {initial == 0 ? "Drop" : <>{percentageChange.toFixed(1)}&#37;</>}
        </span>
      </div>
    );
  if (initial == final || percentageChange == 0)
    return (
      <div className="flex gap-1 text-sm">
        <MoveRight size={20} />
        <span className="font-medium">No change</span>
      </div>
    );
  return (
    <div className="flex gap-1 text-sm text-emerald-600 dark:text-emerald-400">
      <TrendingUp size={20} />
      <span className="font-medium">
        {initial == 0 ? "Surge" : <>{percentageChange.toFixed(1)}&#37;</>}
      </span>
    </div>
  );
};
