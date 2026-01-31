import { orderService } from "@/service/order.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function OrdersPage() {
  const { data: orders, error } = await orderService.getCustomerOrders();

  if (error || !orders) {
    return <div className="text-red-500">Error loading orders: {error?.message}</div>;
  }

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold">My Orders</h2>
       <div className="rounded-md border bg-white overflow-hidden">
         <table className="w-full text-sm text-left">
           <thead className="bg-gray-100 border-b">
             <tr>
               <th className="px-6 py-3 font-medium">Order ID</th>
               <th className="px-6 py-3 font-medium">Status</th>
               <th className="px-6 py-3 font-medium">Total</th>
               <th className="px-6 py-3 font-medium">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y">
             {orders.length === 0 ? (
               <tr>
                 <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No orders found.</td>
               </tr>
             ) : (
               orders.map((order) => (
                 <tr key={order.id} className="hover:bg-gray-50">
                   <td className="px-6 py-4 font-mono">{order.id}</td>
                   <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {order.status}
                      </span>
                   </td>
                   <td className="px-6 py-4 font-bold">${order.totalAmount}</td>
                   <td className="px-6 py-4">
                      <Button variant="outline" size="sm" asChild>
                         <Link href={`/dashboard/orders/${order.id}`}>View</Link>
                      </Button>
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
