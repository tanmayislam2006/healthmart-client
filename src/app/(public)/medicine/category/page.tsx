import { medicineService } from "@/service/medicine.service";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CategoryPage() {
  const { data: categories, error } = await medicineService.getCategories();

  if (error || !categories) {
     return <div className="container mx-auto p-4 text-red-500">Error loading categories</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link href={`/medicine?category=${cat.id}`} key={cat.id} className="block">
               <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                 <CardHeader>
                   <CardTitle>{cat.name}</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-gray-500">Browse medicines in {cat.name}</p>
                 </CardContent>
               </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
