// src/components/modules/seller/orders-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTransition } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SellerOrder, OrderStatus } from "@/types";

type Props = {
  data: SellerOrder[];
  onUpdateStatus: (
    orderId: string,
    status: OrderStatus
  ) => Promise<void>;
};

const STATUS_OPTIONS: OrderStatus[] = [
  "PLACED",
  "SHIPPED",
  "DELIVERED",
];

export function SellerOrdersTable({ data, onUpdateStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  const columns: ColumnDef<SellerOrder>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.customer.name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.customer.email}
          </p>
        </div>
      ),
    },
    {
      header: "Items",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.orderItems.map((item) => (
            <p key={item.id} className="text-sm">
              {item.medicine.name} × {item.quantity}
            </p>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-medium">৳{row.original.total}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const currentStatus = row.original.status;

        return (
          <Select
            defaultValue={currentStatus}
            disabled={isPending || currentStatus === "DELIVERED"}
            onValueChange={(value) => {
              startTransition(async () => {
                try {
                  await onUpdateStatus(
                    row.original.id,
                    value as OrderStatus
                  );
                  toast.success("Order status updated");
                } catch {
                  toast.error("Failed to update order");
                }
              });
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  disabled={
                    status === "PLACED" &&
                    currentStatus !== "PLACED"
                  }
                >
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
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
