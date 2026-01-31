"use client";

import { useEffect, useState } from "react";
import { Category, CategoryStatus } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type FormState = {
  name: string;
  description: string;
  status: CategoryStatus;
};
type SaveResponse = {
  success: boolean;
  message: string;
  data: any;
};

export function EditCategoryDialog({
  category,
  onClose,
  onSave,
  isPending,
}: {
  category: Category | null;
  onClose: () => void;
  onSave: (
    id: string,
    data: { name: string; description?: string; status?: CategoryStatus },
  ) => Promise<SaveResponse>;
  isPending: boolean;
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    status: CategoryStatus.ACTIVE,
  });

  useEffect(() => {
    if (!category) return;

    setForm({
      name: category.name,
      description: category.description ?? "",
      status: category.status,
    });
  }, [category]);

  if (!category) return null;

const handleSubmit = async () => {
  const r = await onSave(category.id, {
    name: form.name,
    description: form.description || undefined,
    status: form.status,
  });

  if (r.success) {
    toast.success(r.message);
  }

  onClose();
};

  return (
    <Dialog open={!!category} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm((f) => ({
                  ...f,
                  status: value as CategoryStatus,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="DISABLED">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
