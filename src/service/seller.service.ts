import { env } from "@/env";
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
  addMedicine: async () => {},
  updateMedicineInfo: async () => {},
  deleteMedicine: async () => {},
};
