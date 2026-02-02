import { notFound } from "next/navigation";
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

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* <MedicineGallery /> */}
        <MedicineInfo medicine={medicine.data} />
      </div>

      {/* REVIEWS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <ReviewList reviews={medicine.data.reviews} />
        <AddReviewForm medicineId={medicine.data.id} onSubmit={customerService.createReview} />
      </section>
    </div>
  );
}