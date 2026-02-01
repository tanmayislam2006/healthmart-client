export const dynamic = "force-dynamic";

import { CreateMedicineForm } from "@/components/modules/seller/CreateMedicineForm";
import { sellerService } from "@/service/seller.service";
import { userService } from "@/service/user.service";


export default async function SellerMedicinesPage() {
  const {data} = await userService.getCategories();
  return (
  <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Add Medicine</h1>

      <CreateMedicineForm
        categories={data}
        onSubmit={sellerService.addMedicine}
      />
    </div>
  );
}
