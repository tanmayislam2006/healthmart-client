import { env } from "@/env";
import { cookies } from "next/headers";
import { ApiResponse, Order } from "@/types";

export const orderService = {
  // Customer
  createOrder: async (data: any): Promise<ApiResponse<Order>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) return { data: null, error: { message: "Failed to create order" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getCustomerOrders: async (): Promise<ApiResponse<Order[]>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/order`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch orders" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },

  getCustomerOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/order/${id}`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: null, error: { message: "Order not found" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // Seller
  getSellerOrders: async (): Promise<ApiResponse<Order[]>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/seller/orders`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch seller orders" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },

  // Admin
  getAdminOrders: async (): Promise<ApiResponse<Order[]>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/admin/orders`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch admin orders" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },
};
