import { env } from "@/env";
import { cookies } from "next/headers";
import { ApiResponse, Medicine } from "@/types";

export const sellerService = {
  getMedicines: async (): Promise<ApiResponse<Medicine[]>> => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/seller/medicine`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      if (!res.ok) return { data: [], error: { message: "Failed to fetch seller medicines" } };
      return { data: await res.json(), error: null };
    } catch (error) {
      return { data: [], error: { message: "Something went wrong" } };
    }
  },
};
