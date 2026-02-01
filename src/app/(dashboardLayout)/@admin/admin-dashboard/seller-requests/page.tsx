export const dynamic = "force-dynamic";

import { SellerRequestTable } from "@/components/modules/admin/seller-req-table";
import { adminService } from "@/service/admin.service";

export default async function SellerRequestPage() {
  const { data } = await adminService.getAllSellerRequests();

  if (!data) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      <SellerRequestTable
        data={data}
        onToggle={adminService.updateSellerRequestStatus}
      />
    </div>
  );
}
