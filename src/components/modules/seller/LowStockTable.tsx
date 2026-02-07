"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

export type LowStockMedicine = {
  id: string;
  name: string;
  stock: number;
};

export function LowStockTable({ data }: { data: LowStockMedicine[] }) {
  const columns: ColumnDef<LowStockMedicine>[] = [
    {
      accessorKey: "name",
      header: "Medicine",
      cell: ({ row }) => (
        <span className="text-sm font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.original.stock;
        const isCritical = stock <= 5;
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{stock}</span>
            <Badge variant={isCritical ? "destructive" : "secondary"}>
              {isCritical ? "Critical" : "Low"}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "SKU",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {row.original.id.slice(0, 8)}...
        </span>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
