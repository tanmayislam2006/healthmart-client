import { getAllUsers } from "@/actions/admin.actions";
import { UsersTable } from "./users-table";

export default async function AdminUsersPage() {
  const { data, error } = await getAllUsers();

  if (error) {
     return <div className="p-6 text-red-500">Error loading users: {error.message || "Unknown error"}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      <UsersTable data={data || []} />
    </div>
  );
}
