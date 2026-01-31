"use client";

import { useState, useTransition } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category, CategoryStatus } from "@/types";
import { EditCategoryDialog } from "@/components/EditCategoryDialog";


type CategoriesTableProps = {
  data: Category[];
  onUpdate: (
    id: string,
    data: { name?: string; description?: string; status?: CategoryStatus },
  ) => Promise<void>;
};

export function CategoriesTable({ data, onUpdate }: CategoriesTableProps) {
  const [editing, setEditing] = useState<Category | null>(null);
  const [isPending, startTransition] = useTransition();

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) =>
        row.original.description ? (
          <span className="text-muted-foreground">
            {row.original.description}
          </span>
        ) : (
          <span className="italic text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "ACTIVE" ? "default" : "secondary"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;
        return<Pencil onClick={() => setEditing(category)} className="mr-2 h-4 w-4" />
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />

      {/* Edit Modal */}
      <EditCategoryDialog
        category={editing}
        onClose={() => setEditing(null)}
        onSave={onUpdate}
        isPending={isPending}
      />
    </>
  );
}
