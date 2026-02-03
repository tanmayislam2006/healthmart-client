
import { MedicineGrid } from "@/components/modules/medicine/MedicineGrid";
import { userService } from "@/service/user.service";

export const revalidate = 10;
export default async function MedicinePages() {
  const { data } = await userService.getAllMedicines();
  const medicines = data?.data ?? [];
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-white to-transparent" />
      <div className="relative container mx-auto px-6 py-10 space-y-10">
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary">
            Trusted online pharmacy
          </span>
          <h1 className="text-3xl font-bold text-slate-900">
            Discover verified medicines
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Browse licensed sellers, transparent pricing, and pharmacist-verified
            products. Use the search bar above to quickly find what you need.
          </p>
        </div>

        {medicines.length === 0 ? (
          <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 text-sm text-slate-500 shadow-sm">
            No medicines available right now. Please check back soon.
          </div>
        ) : (
          <MedicineGrid medicines={medicines} />
        )}

        {/* <LoadMoreMedicines initialPage={2} /> */}
      </div>
    </div>
  );
}
