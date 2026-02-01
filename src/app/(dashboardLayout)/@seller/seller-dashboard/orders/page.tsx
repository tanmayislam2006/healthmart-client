
import { SellerOrdersTable } from "@/components/modules/seller/SellerOrdersTable";
import { sellerService } from "@/service/seller.service";


export const dynamic = "force-dynamic";

export default async function SellerOrdersPage() {
  const orders = await sellerService.getSellerOrders();

  if (!orders?.data) {
    return <div className="p-6">Failed to load orders</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Orders</h1>

      <SellerOrdersTable
        data={orders.data}
        onUpdateStatus={sellerService.updateOrderStatus}
      />
    </div>
  );
}
