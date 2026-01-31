import { orderService } from "@/service/order.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { data: order, error } = await orderService.getCustomerOrderById(id);

  if (error || !order) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Order #{order.id}</h2>
        <Button variant="outline" asChild>
           <Link href="/dashboard/orders">Back to Orders</Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold text-lg">{order.status}</p>
           </div>
           <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-semibold text-lg">${order.totalAmount}</p>
           </div>
           <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className="font-semibold text-lg">{order.paymentStatus || "N/A"}</p>
           </div>
        </div>

        <div className="border-t pt-4">
           <h3 className="font-semibold mb-2">Order Items</h3>
           {order.items && order.items.length > 0 ? (
             <ul className="space-y-2">
               {order.items.map((item, idx) => (
                 <li key={idx} className="flex justify-between text-sm">
                    <span>{item.medicine?.name || "Medicine"} x {item.quantity}</span>
                    <span>${item.price}</span>
                 </li>
               ))}
             </ul>
           ) : (
             <p className="text-sm text-gray-500">No items info available.</p>
           )}
        </div>
      </div>
    </div>
  );
}
