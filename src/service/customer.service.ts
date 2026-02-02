import { revalidate } from "@/app/(commonLayout)/medicines/page";
import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CreateReviewPayload = {
  medicineId: string;
  rating: number;
  content: string;
};
export const customerService = {
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
    console.log(data.medicineId);
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
};
