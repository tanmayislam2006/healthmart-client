"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { CartItem, cartStorage } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCart(cartStorage.get());
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.medicineId}
          className="flex justify-between border p-4 rounded"
        >
          <p>{item.name}</p>
          <p>Qty: {item.quantity}</p>
          <p>৳{item.price * item.quantity}</p>
        </div>
      ))}

      <div className="text-xl font-semibold">
        Total: ৳{total}
      </div>

      <button
        onClick={() => router.push("/checkout")}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
