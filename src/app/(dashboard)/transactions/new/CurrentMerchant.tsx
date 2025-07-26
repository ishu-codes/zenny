"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  BadgeCheck,
  BanknoteArrowDown,
  BanknoteArrowUp,
  EllipsisVertical,
  HandCoins,
  User,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useAutopayTypes, useCategories } from "@/hooks/db";
import { useCurrentMerchant } from "@/store/transactions";
import { NECESSITY, TRANSACTION_TYPES } from "../../dashboard/chartsData";
import { Input } from "@/components/ui/input";
import { getFormattedCurrencyAmount } from "@/lib/currency";
import { Textarea } from "@/components/ui/textarea";

function getDynamicWidth(amount: string): string {
  const digits = amount.replace(/[^0-9]/g, "").length;
  const commas = amount.replace(/[^,\.]/g, "").length;
  const width = digits * 1 + commas * 0.3 + 2;
  return `${width.toFixed(2)}ch`;
}

export default function CurrentMerchant() {
  const merchant = useCurrentMerchant(useShallow((state) => state.merchant));
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const { data: autopayTypesData, isLoading: autopayTypesLoading } =
    useAutopayTypes();

  const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    desc: z.string().optional(),
    category: z.enum(
      categoriesData?.map((c) => c.name) as [string, ...string[]]
    ),
    necessity: z
      .enum(Object.keys(NECESSITY) as [string, ...string[]])
      .optional(),
    amount: z.string().min(1, "Amount must be positive"),
    type: z.enum(Object.keys(TRANSACTION_TYPES) as [string, ...string[]]),
    autopay: z.enum(autopayTypesData as [string, ...string[]]).optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      amount: "",
      type: "DEBIT",
      category: "FOOD",
      necessity: "TRIVIAL",
      autopay: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const transaction: Partial<TransactionInterface> = {
      ...values,
      datetime: new Date().toString(),
      id: Date.now(),
    };
    console.log(transaction);
    // TODO: Handle transaction submission
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Logo + Merchant name */}
      <div className="flex items-center gap-2 pb-2 border-b-2 sticky top-0 bg-card">
        <div className="w-10 h-10">
          {merchant?.img && process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ? (
            <Image
              className="w-full h-full rounded-md"
              src={`https://img.logo.dev/${merchant?.img}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&format=png`}
              alt={merchant.img ?? ""}
              width={128}
              height={128}
            />
          ) : (
            <div className="w-10 h-10 p-[10px] flex justify-center items-center bg-primary/10 rounded-full">
              <User size={20} />
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-between">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1">
              <h3 className="text-lg font-semibold">{merchant?.name}</h3>
              <div className="text-primary">
                {merchant?.is_business && <BadgeCheck size={18} />}
              </div>
            </div>
            {merchant?.is_business && (
              <p className="text-xs -mt-1 text-muted-foreground">
                {merchant.img}
              </p>
            )}
          </div>
        </div>

        <div
          className="w-10 h-10 p-[10px] flex justify-center items-center rounded-full cursor-pointer hover:bg-accent/40"
          onClick={() => console.log("more info")}
        >
          <EllipsisVertical size={20} />
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex relative"
        >
          {/* <section className="h-full flex relative"> */}
          <div
            className="w-full flex flex-col gap-6 absolute inset-0 transition-transform duration-300 bg-amber-500"
            style={{
              transform: `translateX(${currentPageIndex == 0 ? "0" : "-110%"})`,
            }}
          >
            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="mx-auto flex justify-center gap-2">
                  <FormLabel className="text-3xl font-normal text-muted-foreground">
                    &#8377;
                  </FormLabel>
                  <FormControl className="">
                    <Input
                      type="text"
                      placeholder="0"
                      autoComplete="off"
                      className="min-w-12 h-16 pl-4 text-3xl! border-0 outline-0 focus:outline-0 focus:border-0 shadow-none"
                      style={{
                        width: getDynamicWidth(form.watch("amount") || "0"),
                      }}
                      {...field}
                      onFocus={(e) => {
                        const raw = e.target.value.replace(/,/g, "");
                        form?.setValue("amount", raw);
                      }}
                      onBlur={(e) => {
                        const raw = e.target.value.replace(/,/g, "");
                        const num = Number(raw);
                        if (!isNaN(num) && raw !== "") {
                          const formatted = getFormattedCurrencyAmount(num);
                          form?.setValue("amount", formatted, {
                            shouldValidate: true,
                          });
                        }
                      }}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const sanitized = raw.replace(/[^\d.-]/g, "");
                        if (/^-?\d*\.?\d*$/.test(sanitized)) {
                          field.onChange(sanitized);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Title</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Desc */}
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Description</FormLabel> */}
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transaction type */}
            <div className=" flex flex-col">
              <p>Transaction type</p>
              <div className="w-full pt-3 grid grid-cols-2">
                {[
                  {
                    label: "Debit",
                    items: [
                      {
                        icon: <BanknoteArrowDown size={20} />,
                        label: "Expense",
                        desc: "You're giving money",
                        action: () => null,
                      },
                      {
                        icon: <HandCoins size={20} />,
                        label: "Lend",
                        desc: "You're giving money to get back later",
                        action: () => null,
                      },
                    ],
                  },
                  {
                    label: "Credit",
                    items: [
                      {
                        icon: <BanknoteArrowUp size={20} />,
                        label: "Revenue",
                        desc: "You're getting money",
                        action: () => null,
                      },
                      {
                        icon: <HandCoins size={20} />,
                        label: "Borrow",
                        desc: "You're getting money to repay later",
                        action: () => null,
                      },
                    ],
                  },
                ].map((type, index) => (
                  <div
                    className={`${index !== 0 ? "border-l pl-6" : "pr-6"}`}
                    key={index}
                  >
                    <p className="text-center text-sm">{type.label}</p>
                    <div className="grid grid-cols-2 gap-6">
                      {type.items.map((info, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger>
                            <div
                              className="flex flex-col gap-2 px-2 py-2 items-center cursor-pointer hover:bg-accent group rounded-lg"
                              key={idx}
                              onClick={info.action}
                            >
                              <div className="w-10 h-10 p-[10px] bg-primary/5 dark:bg-primary/10 group-hover:bg-transparent rounded-full">
                                {info.icon}
                              </div>
                              <p className="text-sm text-balance text-center">
                                {info.label}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            className="bg-accent text-foreground"
                            side="bottom"
                          >
                            <p>{info.desc}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-12">
              <Button variant={"outline"} onClick={() => null}>
                Reset
              </Button>
              <Button onClick={() => setCurrentPageIndex(1)}>Next</Button>
            </div>
          </div>

          <div
            className="w-full flex flex-col absolute inset-0 transition-transform duration-300 bg-amber-500"
            style={{
              transform: `translateX(${currentPageIndex == 1 ? "0" : "110%"})`,
            }}
          ></div>
        </form>
      </Form>
      {/* </section> */}
    </div>
  );
}
