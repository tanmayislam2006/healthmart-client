"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddCategoryDialog } from "./add-category-dialog";
import { toast } from "sonner";
import type { SaveResponse } from "@/types";

type Props = {
  onCreate: (data: {
    name: string;
    description?: string;
  }) => Promise<SaveResponse>;
};

export function AddCategoryButton({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCreate = (data: { name: string; description?: string }) => {
    startTransition(async () => {
      try {
        const res = await onCreate(data);

        if (res?.success) {
          toast.success(res.message);
          setOpen(false);
        } else {
          toast.error(res?.message ?? "Failed to create category");
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Category
      </Button>

      <AddCategoryDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleCreate}
        isPending={isPending}
      />
    </>
  );
}
