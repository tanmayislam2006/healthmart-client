import { MedicinesTable } from "@/components/modules/seller/MedicinesTable";
import { sellerService } from "@/service/seller.service";

export const dynamic = "force-dynamic";
export default async function SellerMedicinesPage() {
  const { data } = await sellerService.getAllMedicineBySeller();
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Medicines</h1>
      <MedicinesTable
        data={data}
        onDelete={sellerService.deleteMedicine}
        onUpdate={sellerService.updateMedicineInfo}
      />
    </div>
  );
}
