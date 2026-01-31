import { env } from "@/env";
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
    "use server"
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
};
