import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
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
};
