"use client";

// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  NotebookText,
  PiggyBank,
  CreditCard,
  ArrowRightLeft,
  TvMinimalPlay,
  FileText,
  Settings,
  Users,
  LogOut,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { inter } from "@/app/fonts";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useSidebarOpen } from "@/store/sidebar";
import { useShallow } from "zustand/shallow";

const navLinks = [
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    url: "/transactions",
    title: "Transactions",
    icon: <ArrowRightLeft size={20} />,
  },
  { url: "/budgeting", title: "Budgeting", icon: <NotebookText size={20} /> },
  //   { url: "/savings", title: "Savings", icon: <PiggyBank size={20} /> },
  //   { url: "/credits", title: "Credits", icon: <CreditCard size={20} /> },
  //   {
  //     url: "/subscriptions",
  //     title: "Subscriptions",
  //     icon: <TvMinimalPlay size={20} />,
  //   },
  //   {
  //     url: "/history",
  //     title: "History",
  //     icon: <History size={20} />,
  //   },
  //   {
  //     url: "/reports",
  //     title: "Reports",
  //     icon: <FileText size={20} />,
  //   },
  {
    url: "/social",
    title: "Social",
    icon: <Users size={20} />,
  },
  {
    url: "/settings",
    title: "Settings",
    icon: <Settings size={20} />,
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
        isSidebarOpen ? "w-56" : ""
      } h-screen sticky top-0 flex flex-col justify-between px-2 py-4 border-r transition-all duration-800`}
    >
      <div className="flex flex-col gap-8">
        <Link className="flex justify-center" href={"/"}>
          <Logo full={isSidebarOpen} />
        </Link>

        <nav className="flex flex-col">
          {navLinks.map((nav) => (
            <Link
              className={`flex gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md ${
                pathname.includes(nav.url)
                  ? "bg-accent"
                  : "text-muted-foreground dark:text-muted-foreground/60"
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

      <div className="flex flex-col gap-2">
        <Button
          variant={"ghost"}
          className="flex justify-start gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-accent rounded-md"
          onClick={toggleSidebar}
          title={isSidebarOpen ? "Collapse" : "Expand"}
        >
          {isSidebarOpen ? (
            <>
              <PanelLeftClose size={20} />
              Collapse
            </>
          ) : (
            <PanelLeftOpen size={20} />
          )}
        </Button>
        <Link
          className="flex gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-accent rounded-md"
          href="/logout"
          title="Log out"
        >
          <LogOut size={20} />
          {isSidebarOpen && "Log out"}
        </Link>
      </div>
    </div>
  );
}
