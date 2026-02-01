"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { toast } from "sonner";
import { MoreHorizontal, Eye } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CustomerInfo = {
  id: string;
  name: string;
  email: string;
};

export type OrderRow = {
  id: string;
  customer: CustomerInfo;
  total: string;
  status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
};

type Props = {
  data: OrderRow[];
};

export function OrderTable({ data }: Props) {
  const columns: ColumnDef<OrderRow>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.id}</span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <div>
            <p className="font-medium">{row.original?.customer?.name}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.customer?.email}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-semibold">{row.original.total}</span>
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
                : status === "CANCELLED"
                  ? "destructive"
                  : "secondary"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), "dd MMM yyyy"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const order = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  toast.info("Order details clicked", {
                    description: `Order ID: ${order.id}`,
                  })
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
