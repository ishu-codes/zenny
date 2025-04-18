import { ReactNode } from "react";
import { Navbar, Sidebar } from "@/components";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="h-[90%] p-2 md:p-8">{children}</main>
      </div>
    </div>
  );
}
