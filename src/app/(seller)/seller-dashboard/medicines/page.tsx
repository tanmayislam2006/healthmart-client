import { sellerService } from "@/service/seller.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SellerMedicinesPage() {
  const { data: medicines, error } = await sellerService.getMedicines();

  if (error || !medicines) return <div className="text-red-500">Error loading medicines: {error?.message}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-2xl font-bold">My Medicines</h2>
         <Button asChild><Link href="/seller-dashboard/add-medicine">Add New</Link></Button>
      </div>

      <div className="bg-white rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
           <thead className="bg-gray-100 border-b">
             <tr>
               <th className="px-6 py-3 font-medium">Name</th>
               <th className="px-6 py-3 font-medium">Price</th>
               <th className="px-6 py-3 font-medium">Stock</th>
               <th className="px-6 py-3 font-medium">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y">
             {medicines.length === 0 ? (
               <tr><td colSpan={4} className="p-4 text-center text-gray-500">No medicines found.</td></tr>
             ) : (
               medicines.map((m) => (
                 <tr key={m.id} className="hover:bg-gray-50">
                   <td className="px-6 py-4 font-medium">{m.name}</td>
                   <td className="px-6 py-4">${m.price}</td>
                   <td className="px-6 py-4">{m.stock || 0}</td>
                   <td className="px-6 py-4 flex gap-2">
                     <Button variant="outline" size="sm">Edit</Button>
                     <Button variant="destructive" size="sm">Delete</Button>
                   </td>
                 </tr>
               ))
             )}
           </tbody>
        </table>
      </div>
    </div>
  );
}
