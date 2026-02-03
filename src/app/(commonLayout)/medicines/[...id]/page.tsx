import { notFound } from "next/navigation";
import Link from "next/link";
// import { MedicineGallery } from '@/components/medicine/MedicineGallery';
import { MedicineInfo } from "@/components/modules/medicine/MedicineInfo";
import { ReviewList } from "@/components/modules/medicine/ReviewList";
import { AddReviewForm } from "@/components/modules/medicine/AddReviewForm";
import { userService } from "@/service/user.service";
import { customerService } from "@/service/customer.service";

export const revalidate = 60;

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const { id } = await params;
  const medicine = await userService.getMedicineById(id);
  if (!medicine) notFound();
  const relatedResponse = await userService.getAllMedicines({ limit: 8 });
  const relatedMedicines = (relatedResponse?.data?.data ?? [])
    .filter((item: any) => item?.id !== id)
    .slice(0, 4);

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-white to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-10 space-y-12">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Home</span>
          <span>/</span>
          <span>Medicines</span>
          <span>/</span>
          <span className="text-slate-700">{medicine.data.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-primary/10 bg-white/70 p-8 shadow-lg">
            <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-white to-slate-100">
              <div className="absolute inset-0 rounded-2xl border border-white/60" />
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white text-2xl font-semibold">
                  {medicine.data.name?.slice(0, 1) ?? "M"}
                </div>
                <p className="mt-4 text-sm font-medium text-slate-600">
                  Verified medicine packaging
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-slate-600 sm:grid-cols-2">
              {[
                "Secure cold-chain handling",
                "Quality checked before dispatch",
                "Pharmacist verified dosage",
                "Discreet delivery packaging",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-primary/10 bg-white px-4 py-3 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <MedicineInfo medicine={medicine.data} />
        </div>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Customer Reviews
              </h2>
              <p className="text-sm text-slate-500">
                Share your experience to help others choose confidently.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <ReviewList reviews={medicine.data.reviews} />
            <AddReviewForm
              medicineId={medicine.data.id}
              onSubmit={customerService.createReview}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Related Medicines
              </h2>
              <p className="text-sm text-slate-500">
                Similar items customers often purchase together.
              </p>
            </div>
          </div>
          {relatedMedicines.length === 0 ? (
            <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 text-sm text-slate-500 shadow-sm">
              No related medicines available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedMedicines.map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-primary/10 bg-white/70 p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold text-primary/80">
                    {item.category?.name ?? "Category"}
                  </p>
                  <p className="mt-2 line-clamp-1 text-base font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.manufacturer}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-primary">
                    BDT {item.price}
                  </p>
                  <Link
                    href={`/medicines/${item.id}`}
                    className="mt-4 inline-flex items-center text-xs font-semibold text-primary hover:text-primary/80"
                  >
                    View details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
