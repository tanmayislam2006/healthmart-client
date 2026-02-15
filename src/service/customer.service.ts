
import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CreateReviewPayload = {
  medicineId: string;
  rating: number;
  content: string;
};

type CreateSellerRequestPayload = {
  address: string;
};
export const customerService = {
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
  getUserOrder: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${env.BACKEND_URL}/order`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    return await res.json();
  },
  createReview: async (data: CreateReviewPayload) => {
    "use server"
    const cookieStore = await cookies();
    const res = await fetch(`${env.BACKEND_URL}/customer/reviews`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(data),
    });
    revalidatePath(`/medicines/${data.medicineId}`)
    return await res.json();
  },
  createSellerRequest: async (data: CreateSellerRequestPayload) => {
    "use server";
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/customer/seller-request`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ address: data.address }),
      });

      revalidatePath("/dashboard/seller-request");
      revalidatePath("/admin-dashboard/seller-requests");

      return await res.json();
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to send seller request" };
    }
  },
  getCustomerStats: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${env.BACKEND_URL}/customer/stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const result = await res.json()
    return result;
  },

};
