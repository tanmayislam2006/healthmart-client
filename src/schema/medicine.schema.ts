import { z } from "zod";

export const createMedicineSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(5, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  categoryId: z.string().uuid("Invalid category"),
});

export type CreateMedicineInput = z.infer<typeof createMedicineSchema>;
