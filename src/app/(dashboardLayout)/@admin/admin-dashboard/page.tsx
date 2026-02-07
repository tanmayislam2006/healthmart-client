import Link from "next/link";
import {
  Activity,
  Database,
  FolderOpen,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

import { RecentAdminOrdersTable } from "@/components/modules/admin/RecentAdminOrdersTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminService } from "@/service/admin.service";

export const dynamic = "force-dynamic";

type AdminStatsData = {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    totalMedicines: number;
    totalCategories: number;
    deliveredOrders: number;
  };
  recentOrders: {
    id: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: "PLACED" | "SHIPPED" | "DELIVERED";
    createdAt: string;
  }[];
};

type AdminStatsResponse = {
  status: number;
  success: boolean;
  message: string;
  data: AdminStatsData;
};

export default async function AdminDashBoard() {
  let response: AdminStatsResponse | null = null;

  try {
    response = (await adminService.getAdminStats()) as
      | AdminStatsResponse
      | null;
  } catch (error) {
    console.log(error);
  }

  const stats = response?.data?.stats ?? {
    totalOrders: 0,
    totalRevenue: 0,
    totalMedicines: 0,
    totalCategories: 0,
    deliveredOrders: 0,
  };
  const recentOrders = response?.data?.recentOrders ?? [];
  const deliveredRate = stats.totalOrders
    ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100)
    : 0;

  return (
    <div className="space-y-6 p-4 sm:p-5">
      <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Admin Overview
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              HealthMart Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Compact view of revenue, orders, and inventory health.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5" />
              Stable
            </Badge>
            <Button asChild size="sm">
              <Link href="/admin-dashboard/orders">Orders</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin-dashboard/categories">Categories</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin-dashboard/users">Users</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-slate-200/70 bg-white">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Revenue
                </CardTitle>
                <div className="rounded-md bg-teal-100 p-2 text-teal-700">
                  <PackageCheck className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-slate-900">
                BDT {stats.totalRevenue}
              </div>
              <p className="text-xs text-muted-foreground">
                Net sales across the platform
              </p>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200/70 bg-white">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Delivered
                </CardTitle>
                <div className="rounded-md bg-emerald-100 p-2 text-emerald-700">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-slate-900">
                {stats.deliveredOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                {deliveredRate}% fulfillment rate
              </p>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200/70 bg-white">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Orders
                </CardTitle>
                <div className="rounded-md bg-sky-100 p-2 text-sky-700">
                  <Database className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-slate-900">
                {stats.totalOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                Live marketplace activity
              </p>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200/70 bg-white">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Medicines
                </CardTitle>
                <div className="rounded-md bg-amber-100 p-2 text-amber-700">
                  <FolderOpen className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-slate-900">
                {stats.totalMedicines}
              </div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200/70 bg-white">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Categories
                </CardTitle>
                <div className="rounded-md bg-indigo-100 p-2 text-indigo-700">
                  <FolderOpen className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-slate-900">
                {stats.totalCategories}
              </div>
              <p className="text-xs text-muted-foreground">
                Active catalog groups
              </p>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200/70 bg-white">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Fulfillment
                </CardTitle>
                <div className="rounded-md bg-rose-100 p-2 text-rose-700">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-slate-900">
                {deliveredRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                On-time delivery rate
              </p>
            </CardHeader>
          </Card>
        </div>

        <Card className="border border-slate-200/70 bg-white">
          <CardHeader>
            <CardTitle>System Signals</CardTitle>
            <CardDescription>Short status snapshot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-slate-200/70 bg-slate-50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Category Health</span>
                <Badge variant="secondary">Stable</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.totalCategories} active categories
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/70 bg-slate-50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Fulfillment</span>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  Healthy
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {deliveredRate}% delivered on time
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/70 bg-slate-50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Inventory</span>
                <Badge variant="secondary">Synced</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.totalMedicines} items listed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-slate-200/70 bg-white">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer purchases</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <RecentAdminOrdersTable data={recentOrders} />
        </CardContent>
      </Card>
    </div>
  );
}
