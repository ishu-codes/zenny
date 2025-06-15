"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NAVS = [
  { title: "Overview", href: "/budgeting" },
  { title: "Budgets", href: "/budgeting/budgets" },
  { title: "Goal & Savings", href: "/budgeting/goals-and-savings" },
  { title: "Create New", href: "/budgeting/new" },
];

export default function BudgetingLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col">
        <OpenCloseBtn
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* {sidebarOpen ? (
          <div className="">
            <NavLinks />
          </div>
        ) : (
          <div className="">
            <NavLinks />
          </div>
        )} */}
        <NavLinks sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      <section className="flex-1">{children}</section>
    </div>
  );
}

const NavLinks = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  return (
    <div
      className={`flex lg:flex flex-col gap-2 pr-8 border-r fixed lg:relative ${
        sidebarOpen ? "" : "hidden"
      }`}
    >
      {NAVS.map((nav, idx) => (
        <Link
          className={`pl-4 pr-10 py-2 rounded-md ${
            pathname == nav.href ? "bg-accent" : "text-foreground/60"
          }`}
          href={nav.href}
          key={idx}
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
};

const OpenCloseBtn = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Button
      className="group z-30 lg:hidden"
      variant="outline"
      size="icon"
      onClick={() => setSidebarOpen((prevState) => !prevState)}
      aria-expanded={sidebarOpen}
      aria-label={sidebarOpen ? "Close menu" : "Open menu"}
    >
      <svg
        className="pointer-events-none"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12L20 12"
          className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
          d="M4 12H20"
          className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
          d="M4 12H20"
          className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
      </svg>
    </Button>
  );
};
