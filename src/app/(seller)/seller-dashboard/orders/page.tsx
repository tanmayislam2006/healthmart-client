import { orderService } from "@/service/order.service";
import { Button } from "@/components/ui/button";

export default async function SellerOrdersPage() {
  const { data: orders, error } = await orderService.getSellerOrders();

  if (error || !orders) return <div className="text-red-500">Error loading orders: {error?.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Seller Orders</h2>
      <div className="bg-white rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
           <thead className="bg-gray-100 border-b">
             <tr>
               <th className="px-6 py-3 font-medium">Order ID</th>
               <th className="px-6 py-3 font-medium">Customer</th>
               <th className="px-6 py-3 font-medium">Total</th>
               <th className="px-6 py-3 font-medium">Status</th>
               <th className="px-6 py-3 font-medium">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y">
             {orders.length === 0 ? (
                <tr><td colSpan={5} className="p-4 text-center text-gray-500">No orders found.</td></tr>
             ) : (
                orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono">{o.id}</td>
                    <td className="px-6 py-4">{o.user?.name || "Unknown"}</td>
                    <td className="px-6 py-4 font-bold">${o.totalAmount}</td>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {o.status}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline">Update Status</Button>
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
