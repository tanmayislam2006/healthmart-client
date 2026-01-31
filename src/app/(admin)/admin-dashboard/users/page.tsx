import { adminService } from "@/service/admin.service";
import { Button } from "@/components/ui/button";

export default async function UsersPage() {
  const { data: users, error } = await adminService.getUsers();

  if (error || !users) return <div className="text-red-500">Error loading users: {error?.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users Management</h2>
      <div className="bg-white rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
           <thead className="bg-gray-100 border-b">
             <tr>
               <th className="px-6 py-3 font-medium">Name</th>
               <th className="px-6 py-3 font-medium">Email</th>
               <th className="px-6 py-3 font-medium">Role</th>
               <th className="px-6 py-3 font-medium">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y">
             {users.length === 0 ? (
               <tr><td colSpan={4} className="p-4 text-center">No users found.</td></tr>
             ) : (
               users.map((u) => (
                 <tr key={u.id}>
                   <td className="px-6 py-4">{u.name}</td>
                   <td className="px-6 py-4">{u.email}</td>
                   <td className="px-6 py-4">{u.role}</td>
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
