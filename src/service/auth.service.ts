import { env } from "@/env";

export const authService = {
  signIn: async (data: { email: string; password: string; name?: string }) => {
    const res = await fetch(`${env.AUTH_URL}/sign-in/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  },

  signUp: async (data: { email: string; password: string; name: string; role?: string }) => {
    const res = await fetch(`${env.AUTH_URL}/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  },

  signOut: async () => {
    const res = await fetch(`${env.AUTH_URL}/sign-out`, {
      method: "POST",
    });
    return res;
  },
};
