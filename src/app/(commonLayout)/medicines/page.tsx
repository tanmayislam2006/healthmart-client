
import { MedicineGrid } from "@/components/modules/medicine/MedicineGrid";
import { userService } from "@/service/user.service";

export const revalidate = 10;
export default async function MedicinePages() {
  const { data } = await userService.getAllMedicines();
  const medicines = data?.data ?? [];
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">All Medicines</h1>

      <MedicineGrid medicines={medicines} />

  
      {/* <LoadMoreMedicines initialPage={2} /> */}
    </div>
  );
}
