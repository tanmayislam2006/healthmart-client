import { medicineService } from "@/service/medicine.service";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function MedicinePage() {
  const { data: medicines, error } = await medicineService.getAll();

  if (error || !medicines) {
    return <div className="container mx-auto p-4 text-red-500">Error loading medicines: {error?.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Medicines</h1>
      {medicines.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {medicines.map((medicine) => (
            <Card key={medicine.id}>
              <CardHeader>
                <CardTitle className="truncate">{medicine.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">{medicine.category?.name || "Uncategorized"}</p>
                <p className="font-bold text-lg">${medicine.price}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/medicine/${medicine.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
