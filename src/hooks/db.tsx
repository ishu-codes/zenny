import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/db";

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
