import { adminService } from "@/service/admin.service";
import { Button } from "@/components/ui/button";

export default async function SellerRequestsPage() {
  const { data: requests, error } = await adminService.getSellerRequests();

  if (error || !requests) return <div className="text-red-500">Error loading requests: {error?.message}</div>;

  return (
    <div>
       <h2 className="text-2xl font-bold mb-6">Seller Requests</h2>
       <div className="bg-white rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
           <thead className="bg-gray-100 border-b">
             <tr>
               <th className="px-6 py-3 font-medium">User</th>
               <th className="px-6 py-3 font-medium">Email</th>
               <th className="px-6 py-3 font-medium">Status</th>
               <th className="px-6 py-3 font-medium">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y">
             {requests.length === 0 ? (
               <tr><td colSpan={4} className="p-4 text-center">No pending requests.</td></tr>
             ) : (
               requests.map((r) => (
                 <tr key={r.id}>
                   <td className="px-6 py-4">{r.user?.name}</td>
                   <td className="px-6 py-4">{r.user?.email}</td>
                   <td className="px-6 py-4">{r.status}</td>
                   <td className="px-6 py-4 flex gap-2">
                     <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                     <Button size="sm" variant="destructive">Reject</Button>
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
