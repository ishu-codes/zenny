import { create } from "zustand";
import { MerchantInterface } from "@/app/(dashboard)/dashboard/chartsData";

type CurrentMerchant = {
  merchant: MerchantInterface | null;
  setMerchant: (newMerchant: MerchantInterface) => void;
};

const useCurrentMerchant = create<CurrentMerchant>((set) => ({
  merchant: null,
  setMerchant: (newMerchant: MerchantInterface) =>
    set(() => ({ merchant: newMerchant })),
}));

export { useCurrentMerchant };
