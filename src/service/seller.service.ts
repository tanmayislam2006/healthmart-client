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
  updateMedicineInfo: async () => {},
  deleteMedicine: async () => {},
};
