"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CATEGORIES,
  NECESSITY,
  TRANSACTION_TYPES,
  AUTOPAY_TYPES,
  type TransactionInterface,
} from "../../dashboard/chartsData";
import { titleCase } from "@/lib/data";
import { DynamicIcon } from "lucide-react/dynamic";
import { Card } from "@/components/ui/card";
import MerchantsSection from "./MerchantsSection";
import CurrentMerchant from "./CurrentMerchant";
import { Separator } from "@/components/ui/separator";

export default function NewTransaction() {
  return (
    <Card className="w-full h-[calc(100vh-12rem)] p-0 flex-row gap-0">
      <div className="w-1/2 h-full px-8 pt-6 overflow-y-auto">
        <MerchantsSection />
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/2 h-full px-8 pt-6 overflow-auto">
        <CurrentMerchant />
      </div>
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <div className="w-full flex gap-16">
            <div className="w-1/2 flex flex-col gap-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Transaction title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Transaction description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Transaction Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        {Object.entries(TRANSACTION_TYPES).map(
                          ([key, value]) => (
                            <FormItem
                              key={key}
                              className="flex flex-col items-center space-x-0 space-y-2"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={key}
                                  className="sr-only peer"
                                  id={`type-${key}`}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={`type-${key}`}
                                className="flex flex-col items-center cursor-pointer text-muted-foreground peer-aria-checked:text-primary [&>svg]:peer-aria-checked:text-primary"
                              >
                                <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full peer-aria-checked:border-primary">
                                  <DynamicIcon name={value.icon} size={20} />
                                </div>
                                <span className="text-sm">
                                  {titleCase(key)}
                                </span>
                              </FormLabel>
                            </FormItem>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 flex flex-col gap-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        // className="grid grid-cols-4 gap-4"
                        className="w-full flex gap-8 flex-wrap"
                      >
                        {Object.entries(CATEGORIES).map(([key, value]) => (
                          <FormItem
                            key={key}
                            className="flex flex-col items-center space-x-0 space-y-2"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={key}
                                className="sr-only peer"
                                id={`category-${key}`}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`category-${key}`}
                              className="flex flex-col items-center cursor-pointer text-muted-foreground peer-aria-checked:text-primary [&>svg]:peer-aria-checked:text-primary"
                            >
                              <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full peer-aria-checked:border-primary">
                                <DynamicIcon name={value.icon} size={20} />
                              </div>
                              <span className="text-sm">{titleCase(key)}</span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="necessity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Necessity</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        {Object.entries(NECESSITY).map(([key, value]) => (
                          <FormItem
                            key={key}
                            className="flex flex-col items-center space-x-0 space-y-2"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={key}
                                className="sr-only peer"
                                id={`necessity-${key}`}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`necessity-${key}`}
                              className="flex flex-col items-center cursor-pointer text-muted-foreground peer-aria-checked:text-primary [&>svg]:peer-aria-checked:text-primary"
                            >
                              <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full peer-aria-checked:border-primary">
                                <DynamicIcon name={value.icon} size={20} />
                              </div>
                              <span className="text-sm">{titleCase(key)}</span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autopay"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Autopay Type (Optional)</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        {Object.entries(AUTOPAY_TYPES).map(([key, value]) => (
                          <FormItem
                            key={key}
                            className="flex flex-col items-center space-x-0"
                          >
                            <FormControl>
                              <button
                                type="button"
                                onClick={() =>
                                  field.onChange(
                                    field.value === key ? undefined : key
                                  )
                                }
                                className={`flex flex-col items-center gap-2 p-2 ${
                                  field.value === key
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                              >
                                <div
                                  className={`w-10 h-10 flex items-center justify-center border-2 rounded-full ${
                                    field.value === key
                                      ? "border-primary"
                                      : "border-input"
                                  }`}
                                >
                                  <DynamicIcon name={value.icon} size={20} />
                                </div>
                                <span className="text-sm">
                                  {titleCase(key)}
                                </span>
                              </button>
                            </FormControl>
                          </FormItem>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-xl">
            Create Transaction
          </Button>
        </form>
      </Form> */}
    </Card>
  );
}
