import Link from "next/link";
import {
  CheckCircle2,
  ClipboardList,
  Package,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import { LowStockTable } from "@/components/modules/seller/LowStockTable";
import { RecentSellerOrdersTable } from "@/components/modules/seller/RecentSellerOrdersTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sellerService } from "@/service/seller.service";

export const dynamic = "force-dynamic";

type SellerStatsData = {
  stats: {
    totalMedicines: number;
    totalOrders: number;
    deliveredOrders: number;
    pendingOrders: number;
    totalRevenue: number;
  };
  recentOrders: {
    id: string;
    customerName: string;
    total: number;
    status: "PLACED" | "SHIPPED" | "DELIVERED";
    createdAt: string;
  }[];
  lowStockMedicines: {
    id: string;
    name: string;
    stock: number;
  }[];
};

type SellerStatsResponse = {
  status: number;
  success: boolean;
  message: string;
  data: SellerStatsData;
};

export default async function SellerDashBoard() {
  let response: SellerStatsResponse | null = null;

  try {
    response = (await sellerService.getSellerStats()) as
      | SellerStatsResponse
      | null;
  } catch (error) {
    console.log(error);
  }

  const stats = response?.data?.stats ?? {
    totalMedicines: 0,
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  };
  const recentOrders = response?.data?.recentOrders ?? [];
  const lowStockMedicines = response?.data?.lowStockMedicines ?? [];
  const deliveredRate = stats.totalOrders
    ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100)
    : 0;
  const pendingRate = stats.totalOrders
    ? Math.round((stats.pendingOrders / stats.totalOrders) * 100)
    : 0;

  return (
    <div className="space-y-8 p-6">
      <div className="rounded-2xl border bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffffff_60%)] p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-600">
              Seller Control Room
            </p>
            <h1 className="text-2xl font-semibold">Marketplace Pulse</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track orders, revenue, and inventory signals in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
              <Sparkles className="h-3.5 w-3.5" />
              Growth: +18%
            </Badge>
            <Button asChild size="sm">
              <Link href="/seller-dashboard/medicines">Add Stock</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/seller-dashboard/orders">Review Orders</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="relative overflow-hidden border-0 bg-white shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-indigo-500" />
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-semibold">{stats.totalOrders}</div>
                <ClipboardList className="h-5 w-5 text-indigo-500" />
              </div>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Orders placed with you
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-white shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-emerald-500" />
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Delivered Orders
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-semibold">
                  {stats.deliveredOrders}
                </div>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {deliveredRate}% fulfillment rate
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-white shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Orders
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-semibold">
                  {stats.pendingOrders}
                </div>
                <Package className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {pendingRate}% need action
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-white shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-sky-500" />
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-semibold">
                  BDT {stats.totalRevenue}
                </div>
                <TrendingUp className="h-5 w-5 text-sky-500" />
              </div>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              All-time earnings
            </CardContent>
          </Card>
        </div>

        <Card className="border border-slate-200/70">
          <CardHeader>
            <CardTitle>Inventory Health</CardTitle>
            <CardDescription>Stock stability this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
              <div className="flex items-center gap-2">
                <TriangleAlert className="h-4 w-4" />
                <span>{lowStockMedicines.length} items need attention</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total medicines</span>
              <span className="font-medium">{stats.totalMedicines}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Delivered</span>
                <span>{deliveredRate}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: `${deliveredRate}%` }}
                />
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/seller-dashboard/medicines">Restock Inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="border border-slate-200/70">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest purchases from customers</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <RecentSellerOrdersTable data={recentOrders} />
          </CardContent>
        </Card>

        <Card className="border border-slate-200/70">
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Refill these items soon</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <LowStockTable data={lowStockMedicines} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
