import { env } from "@/env";
import { cookies } from "next/headers";
import { ApiResponse, User, Medicine, Category, SellerRequest } from "@/types";

export const adminService = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/users`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch users" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },

  getMedicines: async (): Promise<ApiResponse<Medicine[]>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/medicines`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch medicines" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },

  getSellerRequests: async (): Promise<ApiResponse<SellerRequest[]>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/seller-req`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch seller requests" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },

  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/categories`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch categories" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },
};
