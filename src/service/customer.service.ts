import { env } from "@/env";
import { cookies } from "next/headers";

export const customerService = {
  getUserOrder: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${env.BACKEND_URL}/order`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    return await res.json()
  },
};
