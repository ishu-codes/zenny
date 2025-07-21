import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/db";
import { format, parseISO, isThisYear } from "date-fns";
import { TransactionInterface } from "@/app/(dashboard)/dashboard/chartsData";

export const useCards = () =>
  useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cards").select();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });

export const useTransactions = () =>
  useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select(
          `
          id, title, desc, amount,
          category (id, name, icon),
          merchant (id, name, img, is_business),
          necessity (id, name, icon),
          type (id, name, icon),
          autopay (id, title, type(name, icon)),
          datetime
        `
        )
        .order("datetime", { ascending: false });
      if (error) throw error;
      console.log(data);
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });

type GroupedByMonth = {
  month: string; // e.g. "July" or "July 2023"
  total: number;
  transactions: TransactionInterface[];
};

export const useTransactionsOfMerchant = (merchantId: string) =>
  useQuery<GroupedByMonth[]>({
    queryKey: ["transactions", merchantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select(
          `
          id, title, desc, amount,
          category (id, name, icon),
          merchant,
          necessity (id, name, icon),
          type (id, name, icon),
          autopay (id, title, type(name, icon)),
          datetime
        `
        )
        .eq("merchant", merchantId)
        .order("datetime", { ascending: false });

      if (error) throw error;

      const grouped: Record<string, TransactionInterface[]> = {};

      for (const txn of data) {
        const date = parseISO(txn.datetime);
        const key = format(date, "yyyy-MM");
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(txn);
      }

      const result: GroupedByMonth[] = Object.entries(grouped)
        .sort((a, b) => b[0].localeCompare(a[0])) // descending by month
        .map(([key, transactions]) => {
          const date = parseISO(transactions[0].datetime);
          const monthName = format(date, "MMMM");
          const year = format(date, "yyyy");
          const label = isThisYear(date) ? monthName : `${monthName} ${year}`;

          const total = transactions.reduce((sum, t) => sum + t.amount, 0);

          return {
            month: label,
            total,
            transactions,
          };
        });

      return result;
    },
    staleTime: 1000 * 60 * 60,
  });
