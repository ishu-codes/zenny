"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Bell,
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
  Search,
  Check,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logo from "./Logo";
import { NAVLINKS } from "./data";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentNavName, setCurrentNavName] = useState<string>("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const navLink = NAVLINKS.find((nav) => pathname.includes(nav.url));
    if (navLink) setCurrentNavName(navLink.title);
  }, [pathname]);

  return (
    <div className="w-full flex items-center justify-between px-4 md:px-8 py-4 sticky top-0 z-40 backdrop-blur border-b">
      {/* Logo */}
      <Link className="flex md:hidden justify-center" href="/">
        <Logo
          full={true}
          pathColorClassName="fill-primary dark:fill-primary-foreground"
        />
      </Link>

      {/* Title */}
      <h1 className="hidden md:block w-36 font-bold text-xl">
        {currentNavName}
      </h1>

      {/* Search bar for lg-screen */}
      <SearchBar
        className="hidden md:flex"
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      <div className="flex gap-2 md:gap-4">
        {/* Search bar for mobile */}
        <SearchBar
          className="md:hidden"
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
        {/* Notification */}
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Notification</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex flex-row items-center justify-between">
              <DrawerTitle>Notifications</DrawerTitle>
              <DrawerClose asChild>
                <Button variant={"ghost"}>
                  <X />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="flex flex-col gap-4 px-4">
              <DrawerDescription>
                You can save around 40% on your food expenses
              </DrawerDescription>
              <DrawerDescription>
                You can save around 40% on your food expenses
              </DrawerDescription>
            </div>
            <DrawerFooter>
              <Button>
                <Check />
                Mark all as read
              </Button>
              <Button variant={"outline"}>Clear all</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Avatar */}
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="grid gap-4 bg-background">
            <div className="flex flex-col items-center space-y-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Avatar"
                  className="w-[5rem]"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4 className="font-medium leading-none">Ishu Coder</h4>
              <p className="text-sm text-muted-foreground">email@example.com</p>
            </div>
            <div className="flex justify-between">
              {[
                {
                  title: "Edit profile",
                  url: "/settings/profile",
                  variant: "outline",
                },
                { title: "Logout", url: "/logout", variant: "default" },
              ].map((option) => (
                <Button variant={option.variant} key={option.title}>
                  <Link href={option.url}>{option.title}</Link>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function SearchBar({
  className,
  searchOpen,
  setSearchOpen,
}: {
  className?: string;
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={className}>
      {/* for lg-scrren */}
      <Button
        variant="outline"
        className="w-80 hidden md:flex justify-between text-sm hover:bg-accent text-muted-foreground hover:text-muted-foreground px-4 py-2"
        onClick={() => setSearchOpen(true)}
      >
        <span className="flex gap-2 items-center text-muted-foreground">
          <Search /> Search here
        </span>
        <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* for mobile */}
      <Button
        variant="ghost"
        size={"icon"}
        className="md:hidden"
        onClick={() => setSearchOpen(true)}
      >
        <Search />
      </Button>
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
