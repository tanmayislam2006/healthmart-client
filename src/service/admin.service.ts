import { env } from "@/env";
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
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateUserStatus: async (
    userId: string,
    status: "ACTIVE" | "BANNED"
  ) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.BACKEND_URL}/admin/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      return await res.json();
    } catch (error) {
      throw error;
    }
  },
};
