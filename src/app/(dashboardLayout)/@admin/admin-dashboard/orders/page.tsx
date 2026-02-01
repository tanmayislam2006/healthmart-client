export const dynamic = "force-dynamic";

import { OrderTable } from "@/components/modules/admin/order-table";
import { adminService } from "@/service/admin.service";

export default async function OrderPage() {
  const { data } = await adminService.getAllOrders();
  if (data) {
    <h1 className="text-red-400 text-2xl text-center">Can not Load Data</h1>;
  }
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      <OrderTable data={data} />
    </div>
  );
}
