import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Route } from "@/types";
import { Role } from "@/constant/role";
import { customerRoutes } from "@/routes/customerRoute";
import { adminRoutes } from "@/routes/adminRoute";
import { sellerRoutes } from "@/routes/sellerRoutes";

type AppSidebarProps = {
  user: {
    role: string;
  };
} & React.ComponentProps<typeof Sidebar>;

const logo = {
  href: "/",
  src: "/health-mart.png",
  title: "Health Mart",
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  let navItems: Route[] = [];

  switch (user?.role) {
    case Role.admin:
      navItems = adminRoutes;
      break;
    case Role.seller:
      navItems = sellerRoutes;
      break;
    case Role.customer:
      navItems = customerRoutes;
      break;
    default:
      navItems = [];
  }

  return (
    <Sidebar {...props}>
      {/* Logo */}
      <SidebarHeader className="border-b px-4 py-3">
        <Link href={logo.href} className="flex items-center gap-3">
          <Image
            src={logo.src}
            alt="Health Mart Logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-semibold tracking-tight">
            {logo.title}
          </span>
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2 py-4">
        {navItems.map((group) => (
          <SidebarGroup key={group.title}>
            <p className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
              {group.title}
            </p>

            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="flex items-center gap-3 rounded-md px-3 py-2 transition hover:bg-accent"
                    >
                      <Link href={item.url}>
                        {Icon && (
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
