import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewTransaction from "./NewTransaction";
import History from "./History";

export const metadata: Metadata = {
  title: "Transactions | Zenny",
  description: "View and Manage your transactions with ease.",
};

export default function TransactionsPage() {
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-background">
          <TabsTrigger value="new">New Transaction</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-2" value="new">
          <NewTransaction />
        </TabsContent>
        <TabsContent className="pt-2" value="history">
          <History />
        </TabsContent>
      </Tabs>
    </div>
  );
}
