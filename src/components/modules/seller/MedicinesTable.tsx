"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { Medicine, SaveResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { EditMedicineDialog } from "./EditMedicineDialog";
import { CreateMedicineInput } from "@/schema/medicine.schema";

type MedicinesTableProps = {
  data: Medicine[];
  onDelete: (id: string) => Promise<SaveResponse>;
  onUpdate: (id: string, data: CreateMedicineInput) => Promise<SaveResponse>;
};

export function MedicinesTable({
  data,
  onDelete,
  onUpdate,
}: MedicinesTableProps) {
  const [editing, setEditing] = useState<Medicine | null>(null);
  const [isPending, startTransition] = useTransition();

  const columns: ColumnDef<Medicine>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "stock", header: "Stock" },
    {
      header: "Category",
      cell: ({ row }) => row.original.category?.name ?? "—",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const medicine = row.original;

        return (
          <div className="flex gap-2">
            {/* Edit */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setEditing(medicine)}
            >
              <Pencil className="h-4 w-4 cursor-pointer" />
            </Button>

            {/* Delete */}
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive cursor-pointer"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await onDelete(medicine.id);
                  toast.success("Medicine deleted");
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />

      {/* Edit Dialog */}
      <EditMedicineDialog
        medicine={editing}
        onClose={() => setEditing(null)}
        onSave={onUpdate}
      />
    </>
  );
}
