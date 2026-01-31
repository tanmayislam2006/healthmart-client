// src/routes/adminRoutes.ts
import { Route } from "@/types";
import {
  LayoutDashboard,
  Users,
  Store,
  ClipboardCheck,
  Package,
  Layers,
  Settings,
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: Users,
      },
      {
        title: "Seller Requests",
        url: "/admin-dashboard/seller-requests",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    title: "Marketplace",
    items: [
      {
        title: "Medicines",
        url: "/admin-dashboard/medicines",
        icon: Store,
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
        icon: Package,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: Layers,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: "/admin-dashboard/settings",
        icon: Settings,
      },
    ],
  },
];
