import { env } from "@/env";
import { CreateMedicineInput } from "@/schema/medicine.schema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const sellerService = {
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
      revalidatePath("/seller-dashboard/medicines");
      return await res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete medicine");
    }
  },
};
