import { env } from "@/env";
import { ApiResponse, Medicine, Category } from "@/types";

export const medicineService = {
  getAll: async (): Promise<ApiResponse<Medicine[]>> => {
    try {
      const res = await fetch(`${env.API_URL}/medicine`, {
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch medicines" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },

  getById: async (id: string): Promise<ApiResponse<Medicine>> => {
    try {
      const res = await fetch(`${env.API_URL}/medicine/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) return { data: null, error: { message: "Medicine not found" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    try {
      const res = await fetch(`${env.API_URL}/medicine/category`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch categories" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },
};
