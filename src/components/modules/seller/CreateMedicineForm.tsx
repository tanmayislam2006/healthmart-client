"use client";

import { useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { CreateMedicineInput } from "@/schema/medicine.schema";

import { Category, SaveResponse } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  categories: Category[];
  onSubmit: (data: CreateMedicineInput) => Promise<SaveResponse>;
};

export function CreateMedicineForm({ categories, onSubmit }: Props) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateMedicineInput>();

  const submitHandler: SubmitHandler<CreateMedicineInput> = (data) => {
    startTransition(async () => {
      try {
        const res = await onSubmit(data);

        if (res.success) {
          toast.success("Medicine created successfully");
          reset();
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Failed to create medicine");
      }
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid max-w-xl gap-4"
      >
        {/* Name */}
        <div className="space-y-1">
          <Label>Name</Label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label>Description</Label>
          <Textarea {...register("description")} />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label>Stock</Label>
            <Input
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="text-sm text-destructive">{errors.stock.message}</p>
            )}
          </div>
        </div>

        {/* Manufacturer */}
        <div className="space-y-1">
          <Label>Manufacturer</Label>
          <Input {...register("manufacturer")} />
          {errors.manufacturer && (
            <p className="text-sm text-destructive">
              {errors.manufacturer.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1">
          <Label>Category</Label>
          <Select
            onValueChange={(value) =>
              setValue("categoryId", value, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.categoryId && (
            <p className="text-sm text-destructive">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <Button disabled={isPending}>
          {isPending ? "Creating..." : "Create Medicine"}
        </Button>
      </form>
    </div>
  );
}
