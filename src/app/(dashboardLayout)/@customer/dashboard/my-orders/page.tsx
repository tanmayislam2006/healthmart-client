import { OrdersTable } from "@/components/modules/customer/OrdersTable";
import { customerService } from "@/service/customer.service";

export default async function OrdersPage() {
  const { data } = await customerService.getUserOrder();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      <OrdersTable data={data} />
    </div>
  );
}
