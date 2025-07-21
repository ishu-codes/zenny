"use server";

import { supabase } from "./db";

export const summaryQueryFn = async (period?: "year" | "month" | "week") => {
  const { data, error } = await supabase.rpc("get_summary", {
    period: period ?? "month",
  });

  if (error) throw error;
  const result = data[0];
  // console.log(result);

  return [
    {
      title: "Total Balance",
      currentPeriod: result.total_balance_this,
      lastPeriod: result.total_balance_last,
    },
    {
      title: "Change this " + period,
      currentPeriod: result.balance_change_this,
      lastPeriod: result.balance_change_last,
    },
    {
      title: "Expenses this " + period,
      currentPeriod: result.expenses_this,
      lastPeriod: result.expenses_last,
    },
    {
      title: "Income this " + period,
      currentPeriod: result.income_this,
      lastPeriod: result.income_last,
    },
  ];
};

type ExpenseRevenueTrend = {
  label: string[];
  expenses: number[];
  revenue: number[];
};
export const expensesRevenueTrend = async (
  period?: "month" | "week" | "day",
  offset?: number
) => {
  const { data, error } = await supabase.rpc("get_expense_revenue_trend", {
    period: period ?? "month",
    count: offset ?? 6,
  });

  if (error) throw error;
  // console.log(data);

  return {
    labels: data.map((d: ExpenseRevenueTrend) => d.label),
    values: [
      {
        name: "Expenses",
        data: data.map((d: ExpenseRevenueTrend) => Number(d.expenses)),
      },
      {
        name: "Revenue",
        data: data.map((d: ExpenseRevenueTrend) => Number(d.revenue)),
      },
    ],
  };
};

type ExpenseCategory = {
  label: string;
  value: number;
};
export const expensesByCategory = async (
  period?: "year" | "month" | "week",
  offset?: number
) => {
  const { data, error } = await supabase.rpc("get_expenses_by_category", {
    period: period ?? "month",
    period_offset: offset ?? 0,
  });

  if (error) throw error;
  console.log(data);

  return {
    labels: data.map((d: ExpenseCategory) => d.label),
    values: data.map((d: ExpenseCategory) => Number(d.value)),
  };
};

type ExpenseByNecessity = {
  label: string;
  value: number;
};
export const expensesByNecessity = async (
  period?: "year" | "month" | "week",
  offset?: number
) => {
  const { data, error } = await supabase.rpc("get_expenses_by_necessity", {
    period: period ?? "month",
    period_offset: offset ?? 0,
  });

  if (error) throw error;
  console.log(data);

  return {
    labels: data.map((d: ExpenseByNecessity) => d.label),
    values: data.map((d: ExpenseByNecessity) => Number(d.value)),
  };
};
