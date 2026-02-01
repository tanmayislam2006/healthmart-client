import { z } from "zod";

export const createMedicineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),

  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or more"),

  manufacturer: z.string().min(1, "Manufacturer is required"),
  categoryId: z.string().uuid("Category is required"),
});

export type CreateMedicineInput = z.infer<typeof createMedicineSchema>;
