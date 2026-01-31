import { env } from "@/env";
import { CategoryStatus } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const adminService = {
  getAllUser: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/admin/users`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await res.json();
      return { data: users, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateUserStatus: async (userId: string, status: "ACTIVE" | "BANNED") => {
    "use server";
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      revalidatePath("/admin-dashboard/users");
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  // ! fetch All Category

  getCategory: async () => {
    try {
      const res = await fetch(`${env.BACKEND_URL}/medicine/category`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const category = await res.json();
      return { data: category, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  createCategory: async (data: { name?: string; description?: string }) => {
    "use server";
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/admin/categories`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      revalidatePath("/admin-dashboard/categories");

      return await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Can not Create the category");
    }
  },

  updateCategory: async (
    id: string,
    data: { name?: string; description?: string; status?: CategoryStatus },
  ) => {
    "use server";
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/admin/categories/${id}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      revalidatePath("/admin-dashboard/categories");

      return await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Can not Update the category");
    }
  },

  getAllSellerRequests: async () => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/admin/seller-req`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      return await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Can not Update the category");
    }
  },

  updateSellerRequestStatus: async (
    id: string,
    status: "PENDING" | "APPROVED" | "REJECT",
  ) => {
    "use server";
    console.log(id,status);
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/admin/update/${id}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({status}),
      });

      revalidatePath("/admin-dashboard/seller-requests");
      return await res.json()
    } catch (error) {
      console.log(error);
      throw new Error("Can not Update the category");
    }
  },
};
