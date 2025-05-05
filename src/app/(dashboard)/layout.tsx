import { ReactNode } from "react";
import { Navbar, Sidebar } from "@/components";
import Footer from "@/components/Footer";
import ColorsDeclaration from "./ColorsDeclaration";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      <ColorsDeclaration />
      <Sidebar />
      <div className="w-full overflow-y-auto">
        <Navbar />
        <main className="p-4 md:p-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
