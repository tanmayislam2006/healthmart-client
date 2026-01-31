import { medicineService } from "@/service/medicine.service";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MedicineDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { data: medicine, error } = await medicineService.getById(id);

  if (error || !medicine) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{medicine.name}</h1>
        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-gray-500 mb-4">Category: {medicine.category?.name || "N/A"}</p>
          <p className="text-2xl font-bold mb-6">${medicine.price}</p>
          <div className="mb-6 prose">
             <p>{medicine.description || "No description available."}</p>
          </div>
          <Button size="lg">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
