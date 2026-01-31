"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MedicineFormData {
  name: string;
  price: number;
  stock: number;
  description: string;
}

export default function AddMedicineForm() {
  const { register, handleSubmit } = useForm<MedicineFormData>();

  const onSubmit = async (data: MedicineFormData) => {
    // In a real app, this would call a Server Action or API
    console.log(data);
    alert("Medicine added (simulated)");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <div className="space-y-2">
         <Label htmlFor="name">Medicine Name</Label>
         <Input id="name" {...register("name", { required: true })} placeholder="e.g. Paracetamol" />
       </div>

       <div className="space-y-2">
         <Label htmlFor="price">Price ($)</Label>
         <Input id="price" {...register("price", { required: true })} type="number" step="0.01" />
       </div>

       <div className="space-y-2">
         <Label htmlFor="stock">Stock Quantity</Label>
         <Input id="stock" {...register("stock", { required: true })} type="number" />
       </div>

       <div className="space-y-2">
         <Label htmlFor="description">Description</Label>
         <Input id="description" {...register("description")} />
       </div>

       <Button type="submit" className="w-full">Add Medicine</Button>
    </form>
  );
}
