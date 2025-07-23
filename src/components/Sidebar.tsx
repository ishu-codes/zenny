"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useSidebarOpen } from "@/store/sidebar";
import { useShallow } from "zustand/shallow";
import { NAVLINKS } from "./data";

const sidebarVariants = {
  open: {
    width: "240px",
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1], // equivalent to 'easeInOut'
    },
  },
  closed: {
    width: "64px",
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1],
    },
  },
} satisfies import("framer-motion").Variants;

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, toggleSidebar] = useSidebarOpen(
    useShallow((state) => [state.isOpen, state.toggleOpen])
  );

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isSidebarOpen ? "open" : "closed"}
      className="w-[64px] md:h-screen fixed bottom-0 md:sticky md:top-0 flex md:flex-col justify-between px-4 md:px-1 py-2 md:pt-0 md:pb-4 bg-primary overflow-hidden border-r z-40"
    >
      <div className="w-fit! md:w-auto flex md:flex-col md:gap-8 overflow-auto">
        <Link
          className="hidden md:flex justify-center py-4 border-b border-white/10"
          href={"/"}
        >
          <Logo full={isSidebarOpen} />
        </Link>

        <nav className="w-full md:w-auto flex justify-between md:flex-col md:justify-baseline gap-2">
          {NAVLINKS.map((nav) => (
            <Link
              className={`flex items-center gap-3 p-2 md:px-3 md:py-2 text-sm hover:bg-white/10 rounded-md ${
                pathname.includes(nav.url)
                  ? "bg-white/10 text-white"
                  : "text-white/70"
              }`}
              href={nav.url}
              key={nav.url}
              title={nav.title}
            >
              {nav.icon}{" "}
              {isSidebarOpen && (
                <span className="hidden md:inline">{nav.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="w-fit! hidden md:flex flex-col gap-2">
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
        <Button variant={"ghost"} asChild className="hover:text-white/70">
          <Link
            className="flex gap-3 px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-md"
            href="/logout"
            title="Log out"
          >
            <LogOut className="scale-80" />
            {isSidebarOpen && "Log out"}
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
