import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Package,
  Sparkles,
} from "lucide-react";

import { RecentOrdersTable } from "@/components/modules/customer/RecentOrdersTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { customerService } from "@/service/customer.service";

export const dynamic = "force-dynamic";

type CustomerStatsResponse = {
  stats: {
    totalOrders: number;
    totalSpent: number;
    deliveredOrders: number;
    pendingOrders: number;
  };
  recentOrders: {
    id: string;
    total: number;
    status: "PLACED" | "SHIPPED" | "DELIVERED";
    createdAt: string;
  }[];
};

const demoStats: CustomerStatsResponse["stats"] = {
  totalOrders: 18,
  totalSpent: 15320,
  deliveredOrders: 12,
  pendingOrders: 6,
};

const demoRecentOrders: CustomerStatsResponse["recentOrders"] = [
  {
    id: "ORD-9A1B3C2D",
    total: 1420,
    status: "DELIVERED",
    createdAt: "2026-01-29T11:20:00.000Z",
  },
  {
    id: "ORD-72F8D0AA",
    total: 980,
    status: "SHIPPED",
    createdAt: "2026-01-24T15:05:00.000Z",
  },
  {
    id: "ORD-5D11BC44",
    total: 760,
    status: "PLACED",
    createdAt: "2026-01-19T09:45:00.000Z",
  },
  {
    id: "ORD-3399CD10",
    total: 2190,
    status: "DELIVERED",
    createdAt: "2026-01-12T18:30:00.000Z",
  },
  {
    id: "ORD-FF10C2EE",
    total: 540,
    status: "DELIVERED",
    createdAt: "2026-01-04T08:25:00.000Z",
  },
];

export default async function DashboardPage() {
  let response: CustomerStatsResponse | null = null;

  try {
    response = (await customerService.getCustomerStats()) as
      | CustomerStatsResponse
      | null;
  } catch (error) {
    console.log(error);
  }

  const stats = response?.stats ?? demoStats;
  const recentOrders = response?.recentOrders ?? demoRecentOrders;
  const deliveredRate = stats.totalOrders
    ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100)
    : 0;
  const pendingRate = stats.totalOrders
    ? Math.round((stats.pendingOrders / stats.totalOrders) * 100)
    : 0;
  const nextOrder =
    recentOrders.find((order) => order.status !== "DELIVERED") ??
    recentOrders[0] ??
    null;

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Welcome back to HealthMart
          </p>
          <h1 className="text-2xl font-semibold">Customer Dashboard</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="gap-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            <Sparkles className="h-3.5 w-3.5" />
            Loyalty: Silver
          </Badge>
          <Button asChild size="sm">
            <Link href="/dashboard/my-orders">View All Orders</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-0 bg-gradient-to-br from-sky-50 to-white shadow-sm">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <Package className="h-5 w-5 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              All-time purchases
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Delivered Orders
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {stats.deliveredOrders}
            </div>
            <p className="text-xs text-muted-foreground">
              {deliveredRate}% fulfillment rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-amber-50 to-white shadow-sm">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Orders
            </CardTitle>
            <Clock className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              {pendingRate}% still in progress
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-indigo-50 to-white shadow-sm">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
            <CreditCard className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">BDT {stats.totalSpent}</div>
            <p className="text-xs text-muted-foreground">Across all orders</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border border-slate-200/70">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest activity from your account</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <RecentOrdersTable data={recentOrders} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border border-slate-200/70">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Delivery progress overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivered</span>
                  <span className="font-medium">{deliveredRate}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${deliveredRate}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium">{pendingRate}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-amber-500"
                    style={{ width: `${pendingRate}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/70">
            <CardHeader>
              <CardTitle>Next Delivery</CardTitle>
              <CardDescription>Keep an eye on incoming packages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextOrder ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Order #{nextOrder.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: {nextOrder.status}
                    </p>
                  </div>
                  <Badge variant="secondary">In transit</Badge>
                </div>
              ) : (
                <div className="rounded-lg bg-slate-50 p-3 text-xs text-muted-foreground">
                  No active deliveries right now.
                </div>
              )}
              {nextOrder ? (
                <>
                  <div className="rounded-lg bg-slate-50 p-3 text-xs text-muted-foreground">
                    Estimated arrival within 2-3 days. We will notify you when
                    the delivery is at your door.
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/dashboard/my-orders">Track All Orders</Link>
                  </Button>
                </>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/my-orders">View Order History</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
