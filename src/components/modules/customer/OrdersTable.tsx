"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Order } from "@/types";

export function OrdersTable({ data }: { data: Order[] }) {
  const columns: ColumnDef<Order>[] = [
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
      header: "Items",
      cell: ({ row }) =>
        row.original.orderItems.map((item) => (
          <div key={item.id} className="text-sm">
            {item.medicine.name} × {item.quantity}
          </div>
        )),
    },

    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-medium">৳ {row.original.total}</span>
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
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;

        return (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => toast.info(`Order ID: ${order.id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
