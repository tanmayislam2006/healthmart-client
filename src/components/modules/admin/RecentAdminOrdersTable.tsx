"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types";

export type AdminRecentOrder = {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export function RecentAdminOrdersTable({
  data,
}: {
  data: AdminRecentOrder[];
}) {
  const columns: ColumnDef<AdminRecentOrder>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {row.original.id.slice(0, 8)}...
        </span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium">{row.original.customerName}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.customerEmail}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={
              status === "DELIVERED"
                ? "default"
                : status === "SHIPPED"
                ? "secondary"
                : "outline"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-medium">BDT {row.original.total}</span>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
