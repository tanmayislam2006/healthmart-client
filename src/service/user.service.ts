import { env } from "@/env";
import { cookies } from "next/headers";
interface GetAllMedicinesParams {
  search?: string;
  category?: string;
  isFeatured?: string;
  page?: number;
  limit?: number;
}
export const userService = {
  safeJson: async (res: Response) => {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse JSON response:", {
        status: res.status,
        statusText: res.statusText,
        textPreview: text.slice(0, 200),
      });
      return null;
    }
  },
  getSessionUser: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "Session Is Missing" } };
      }
      return { data: session, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getCategories: async () => {
    try {
      const res = await fetch(`${env.BACKEND_URL}/medicine/category`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Failed to fetch categories:", res.status, res.statusText);
        return { data: [] };
      }

      return (await userService.safeJson(res)) ?? { data: [] };
    } catch (error) {
      console.log(error);
      throw new Error("Can not Get  the Categories");
    }
  },

  getAllMedicines: async ({
    search,
    category,
    isFeatured,
    page = 1,
    limit = 8,
  }: GetAllMedicinesParams = {}) => {
    const queryParams = new URLSearchParams();
    
    if (search) queryParams.append("search", search);
    if (category) queryParams.append("category", category);
    if (typeof isFeatured === "boolean")
      queryParams.append("isFeatured", String(isFeatured));
    if (page) queryParams.append("page", String(page));
    if (limit) queryParams.append("limit", String(limit));

    const url = `${env.BACKEND_URL}/medicine?${queryParams.toString()}`;

    const res = await fetch(url, {
      next: {
        revalidate: 10,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch medicines:", res.status, res.statusText);
      return { data: [] };
    }

    return (await userService.safeJson(res)) ?? { data: [] };
  },
  getMedicineById: async (id: string) => {
    const res = await fetch(`${env.BACKEND_URL}/medicine/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return (await userService.safeJson(res)) ?? null;
  },
};
