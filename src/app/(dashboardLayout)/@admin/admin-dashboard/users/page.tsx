
export const dynamic = "force-dynamic";

import { UsersTable } from "@/components/modules/admin/users-table";
import { adminService } from "@/service/admin.service";



export default async function AdminUsersPage() {
  const users = await adminService.getAllUser();

  if (!users.data) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      <UsersTable
        data={users.data.data}
        onToggle={adminService.updateUserStatus}
      />
    </div>
  );
}
