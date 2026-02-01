"use client";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Medicine, SaveResponse } from "@/types";
import {
  CreateMedicineInput,
} from "@/schema/medicine.schema";

type Props = {
  medicine: Medicine | null;
  onClose: () => void;
  onSave: (id: string, data: CreateMedicineInput) => Promise<SaveResponse>;
};

export function EditMedicineDialog({
  medicine,
  onClose,
  onSave,
}: Props) {
  const form = useForm<CreateMedicineInput>();

  useEffect(() => {
    if (!medicine) return;

    form.reset({
      name: medicine.name,
      description: medicine.description,
      price: medicine.price,
      stock: medicine.stock,
      manufacturer: medicine.manufacturer,
      categoryId: medicine.categoryId,
    });
  }, [medicine, form]);

  if (!medicine) return null;

  const submit: SubmitHandler<CreateMedicineInput> = async (data) => {
    await onSave(medicine.id, data);
    toast.success("Medicine updated");
    onClose();
  };

  return (
    <Dialog open={!!medicine} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Medicine</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...form.register("name")} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...form.register("description")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input type="number" {...form.register("price")} />
            <Input type="number" {...form.register("stock")} />
          </div>

          <div>
            <Label>Manufacturer</Label>
            <Input {...form.register("manufacturer")} />
          </div>

          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
