"use client";

import { FormEvent, useEffect, useState } from "react";
// import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMerchants } from "@/hooks/db";
import { BadgeCheck, Search, User } from "lucide-react";
import Image from "next/image";
import { MerchantInterface } from "../../dashboard/chartsData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentMerchant } from "@/store/transactions";
import { useShallow } from "zustand/shallow";

export default function MerchantsSection() {
  const { data: merchantsData, isLoading } = useMerchants();
  const [filteredMerchants, setFilteredMerchants] = useState<
    MerchantInterface[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [currentMerchant, setCurrentMerchant] = useState<MerchantInterface>();

  const [currentMerchant, setCurrentMerchant] = useCurrentMerchant(
    useShallow((state) => [state.merchant, state.setMerchant])
  );
  const [merchantType, setMerchantType] = useState<
    "all" | "business" | "people"
  >("all");

  const filterMerchants = () => {
    if (!merchantsData) return;

    const filteredMerchants = merchantsData?.filter((mer) => {
      const typeFilterPass =
        merchantType === "all" ||
        (merchantType == "business" && mer.is_business) ||
        (merchantType == "people" && !mer.is_business);

      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const searchFilterPass =
        searchTerm == "" ||
        mer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        (mer.img && mer.img.includes(lowerCaseSearchTerm));
      return typeFilterPass && searchFilterPass;
    });
    setCurrentMerchant(filteredMerchants[0]);
    setFilteredMerchants(filteredMerchants);
  };

  const handleInputChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterMerchants();
  };

  useEffect(() => {
    filterMerchants();
  }, [isLoading, merchantType]);

  useEffect(() => {
    if (searchTerm == "") filterMerchants();
  }, [searchTerm]);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between gap-2 pb-4 sticky top-0 border-b bg-card">
        {/* Search bar */}
        <form className="flex gap-2" onSubmit={(e) => handleInputChange(e)}>
          <Input
            className="w-60"
            placeholder="Search people or business.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">
            <Search />
          </Button>
        </form>

        {/* Merchant filter */}
        <Select
          defaultValue={merchantType}
          onValueChange={(value) => setMerchantType(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Card" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="people">People</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="py-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 8 }, (_, i) => i).map((i) => (
              <div className="flex gap-2" key={i}>
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-60 h-10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col gap-1 overflow-y-auto">
            {filteredMerchants?.map((merchant, idx) => (
              <div
                className={`flex gap-3 px-3 py-2 rounded-lg ${
                  currentMerchant?.id === merchant.id
                    ? "bg-primary/5"
                    : "hover:bg-muted/75 cursor-pointer"
                }`}
                onClick={() => setCurrentMerchant(merchant)}
                key={idx}
              >
                <div className="w-8 h-8">
                  {merchant.img && process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN ? (
                    <Image
                      className="w-full h-full rounded-md"
                      src={`https://img.logo.dev/${merchant.img}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&format=png`}
                      alt={merchant.img ?? ""}
                      width={128}
                      height={128}
                    />
                  ) : (
                    <div className="w-8 h-8 p-[8px] flex justify-center items-center bg-primary/10 rounded-full">
                      {/* <DynamicIcon name={currentTransaction?.category?.icon} /> */}
                      <User />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium text-sm">{merchant.name}</h3>
                    <div className="text-primary">
                      {merchant.is_business && <BadgeCheck size={16} />}
                    </div>
                  </div>
                  {merchant.is_business && (
                    <p className="text-xs text-muted-foreground -mt-1">
                      {merchant.img}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
