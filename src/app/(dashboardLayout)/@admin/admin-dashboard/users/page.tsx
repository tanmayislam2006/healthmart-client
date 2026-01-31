
import { adminService } from "@/service/admin.service";
import { UsersTable } from "./users-table";

export default async function AdminUsersPage() {
  const users = await adminService.getAllUser();
   console.log(users);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      <UsersTable data={users.data} />
    </div>
  );
}
