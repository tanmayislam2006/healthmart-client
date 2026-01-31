import { adminService } from "@/service/admin.service";
import { Button } from "@/components/ui/button";

export default async function AdminCategoriesPage() {
  const { data: categories, error } = await adminService.getCategories();

  if (error || !categories) return <div className="text-red-500">Error loading categories: {error?.message}</div>;

  return (
    <div>
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Button>Add Category</Button>
       </div>
       <div className="bg-white rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
           <thead className="bg-gray-100 border-b">
             <tr>
               <th className="px-6 py-3 font-medium">ID</th>
               <th className="px-6 py-3 font-medium">Name</th>
               <th className="px-6 py-3 font-medium">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y">
             {categories.length === 0 ? (
               <tr><td colSpan={3} className="p-4 text-center">No categories found.</td></tr>
             ) : (
               categories.map((c) => (
                 <tr key={c.id}>
                   <td className="px-6 py-4 font-mono">{c.id}</td>
                   <td className="px-6 py-4">{c.name}</td>
                   <td className="px-6 py-4">
                     <Button variant="outline" size="sm">Edit</Button>
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
