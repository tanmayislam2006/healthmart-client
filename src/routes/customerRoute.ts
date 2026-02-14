
import { Route } from "@/types";
import { LayoutDashboard, Package, Store, User } from "lucide-react";

export const customerRoutes: Route[] =[
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Orders",
        url: "/dashboard/my-orders",
        icon: Package,
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
      },
      {
        title: "Seller Request",
        url: "/dashboard/seller-request",
        icon: Store,
      },
    ],
  },
];
