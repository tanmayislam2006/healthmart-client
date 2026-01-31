import { adminService } from "@/service/admin.service";
import { Button } from "@/components/ui/button";

export default async function AdminMedicinesPage() {
  const { data: medicines, error } = await adminService.getMedicines();

  if (error || !medicines) return <div className="text-red-500">Error loading medicines: {error?.message}</div>;

  return (
    <div>
       <h2 className="text-2xl font-bold mb-6">Medicines Management</h2>
       <div className="bg-white rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
           <thead className="bg-gray-100 border-b">
             <tr>
               <th className="px-6 py-3 font-medium">Name</th>
               <th className="px-6 py-3 font-medium">Seller</th>
               <th className="px-6 py-3 font-medium">Price</th>
               <th className="px-6 py-3 font-medium">Stock</th>
               <th className="px-6 py-3 font-medium">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y">
             {medicines.length === 0 ? (
               <tr><td colSpan={5} className="p-4 text-center">No medicines found.</td></tr>
             ) : (
               medicines.map((m) => (
                 <tr key={m.id}>
                   <td className="px-6 py-4">{m.name}</td>
                   <td className="px-6 py-4">{m.seller?.name || "Unknown"}</td>
                   <td className="px-6 py-4">${m.price}</td>
                   <td className="px-6 py-4">{m.stock}</td>
                   <td className="px-6 py-4">
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
