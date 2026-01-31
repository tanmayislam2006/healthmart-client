"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddCategoryDialog } from "./add-category-dialog";
import { SaveResponse } from "@/components/EditCategoryDialog";
import { toast } from "sonner";

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
      const res = await onCreate(data);
      setOpen(false);
      if (res.success) toast.success(`${res.message}`);
      else {
        toast.error(`${res.message}`);
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
