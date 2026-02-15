
import { Route } from "@/types";
import {
  LayoutDashboard,
  Pill,
  Package,
  PlusCircle,
  Settings,
  UserCircle,
} from "lucide-react";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Dashboard",
    items: [
      {
        title: "Overview",
        url: "/seller-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Medicines",
        url: "/seller-dashboard/medicines",
        icon: Pill,
      },
      {
        title: "Add Medicine",
        url: "/seller-dashboard/medicines-add",
        icon: PlusCircle,
      },
      {
        title: "Orders",
        url: "/seller-dashboard/orders",
        icon: Package,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/seller-dashboard/profile",
        icon: UserCircle,
      },
      {
        title: "Settings",
        url: "/seller-dashboard/settings",
        icon: Settings,
      },
    ],
  },
];
