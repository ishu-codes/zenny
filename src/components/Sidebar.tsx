"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  NotebookText,
  ArrowRightLeft,
  Settings,
  Users,
  LogOut,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
// import { inter } from "@/app/fonts";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useSidebarOpen } from "@/store/sidebar";
import { useShallow } from "zustand/shallow";

const navLinks = [
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard className="md:scale-80" />,
  },
  {
    url: "/transactions",
    title: "Transactions",
    icon: <ArrowRightLeft className="md:scale-80" />,
  },
  {
    url: "/budgeting",
    title: "Budgeting",
    icon: <NotebookText className="md:scale-80" />,
  },
  {
    url: "/social",
    title: "Social",
    icon: <Users className="md:scale-80" />,
  },
  {
    url: "/settings",
    title: "Settings",
    icon: <Settings className="md:scale-80" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, toggleSidebar] = useSidebarOpen(
    useShallow((state) => [state.isOpen, state.toggleOpen])
  );

  return (
    <div
      className={`${
        isSidebarOpen ? "md:w-56" : ""
      } w-full md:w-auto md:h-screen fixed bottom-0 md:sticky md:top-0 flex md:flex-col justify-between px-4 md:px-1 py-2 md:pt-0 md:pb-4 bg-primary border-r transition-all duration-800 z-40`}
    >
      <div className="w-full md:w-auto flex md:flex-col md:gap-8 overflow-auto">
        <Link
          className="hidden md:flex justify-center py-4 border-b border-white/10"
          href={"/"}
        >
          <Logo full={isSidebarOpen} />
        </Link>

        <nav className="w-full md:w-auto flex justify-between md:flex-col md:justify-baseline gap-2">
          {navLinks.map((nav) => (
            <Link
              className={`flex items-center gap-3 p-4 md:px-3 md:py-2 text-sm hover:bg-white/10 rounded-md ${
                pathname.includes(nav.url)
                  ? "bg-white/10 text-white"
                  : "text-white/70"
              }`}
              href={nav.url}
              key={nav.url}
              title={nav.title}
            >
              {nav.icon} {isSidebarOpen && nav.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="hidden md:flex flex-col gap-2">
        <Button
          variant={"ghost"}
          className="flex justify-start gap-3 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white/70 rounded-md"
          onClick={toggleSidebar}
          title={isSidebarOpen ? "Collapse" : "Expand"}
        >
          {isSidebarOpen ? (
            <>
              <PanelLeftClose />
              Collapse
            </>
          ) : (
            <PanelLeftOpen />
          )}
        </Button>
        <Link
          className="flex gap-3 px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-md"
          href="/logout"
          title="Log out"
        >
          <LogOut className="scale-80" />
          {isSidebarOpen && "Log out"}
        </Link>
      </div>
    </div>
  );
}
