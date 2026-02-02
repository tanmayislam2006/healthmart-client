"use client";


import { cartStorage } from "@/lib/cart";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const cart = cartStorage.get();

  const placeOrder = async () => {
    // await orderService.createOrder({
    //   address,
    //   items: cart.map((item) => ({
    //     medicineId: item.medicineId,
    //     quantity: item.quantity,
    //   })),
    // });

    cartStorage.clear();
    router.push("/my-orders");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Delivery Address"
        className="border w-full p-2 rounded"
      />

      <button
        onClick={placeOrder}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

