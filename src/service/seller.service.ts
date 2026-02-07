import { env } from "@/env";
import { CreateMedicineInput } from "@/schema/medicine.schema";
import { OrderStatus } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const sellerService = {
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
  getAllMedicineBySeller: async () => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/seller/medicine`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      return await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Can not Get  the Medicine");
    }
  },
  addMedicine: async (data: CreateMedicineInput) => {
    "use server";
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.BACKEND_URL}/seller/medicine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      revalidatePath("/seller-dashboard/medicines");

      return res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Can not Add Medicine");
    }
  },
  updateMedicineInfo: async (id: string, data: CreateMedicineInput) => {
    "use server";
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.BACKEND_URL}/seller/medicine/${id}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      revalidatePath("/seller-dashboard/medicines");
      return result;
    } catch (error) {
      throw new Error("Failed to update medicine");
    }
  },
  deleteMedicine: async (id: string) => {
    "use server";
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/seller/medicine/${id}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });

      return await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete medicine");
    }
  },

  getSellerOrders: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.BACKEND_URL}/seller/orders`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return res.json();
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    "use server";

    const cookieStore = await cookies();

    const res = await fetch(`${env.BACKEND_URL}/seller/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error("Failed to update order");
    }

    revalidatePath("/seller-dashboard/orders");
  },
  getSellerStats: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${env.BACKEND_URL}/seller/stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },
};
