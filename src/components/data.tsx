import {
  LayoutDashboard,
  NotebookText,
  ArrowRightLeft,
  Settings,
  Users,
} from "lucide-react";

export const NAVLINKS = [
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard className="scale-90 md:scale-80" />,
  },
  {
    url: "/transactions",
    title: "Transactions",
    icon: <ArrowRightLeft className="scale-90 md:scale-80" />,
  },
  {
    url: "/budgeting",
    title: "Budgeting",
    icon: <NotebookText className="scale-90 md:scale-80" />,
  },
  {
    url: "/social",
    title: "Social",
    icon: <Users className="scale-90 md:scale-80" />,
  },
  {
    url: "/settings",
    title: "Settings",
    icon: <Settings className="scale-90 md:scale-80" />,
  },
];
