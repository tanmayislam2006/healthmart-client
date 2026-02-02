"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cartStorage } from "@/lib/cart";
import { env } from "@/env";

type OrderItemPayload = {
  medicineId: string;
  quantity: number;
};

type CreateOrderPayload = {
  address: string;
  items: OrderItemPayload[];
};

const orderService = {
  createOrder: async (data: CreateOrderPayload) => {
    const res = await fetch(`${env.NEXT_PUBLIC_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message || "Failed to place order");
    }

    return res.json();
  },
};

export default function CheckoutPage() {
  const router = useRouter();

  const [items, setItems] = useState<OrderItemPayload[]>([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cart = cartStorage.get();

    if (!cart || cart.length === 0) {
      router.replace("/cart");
      return;
    }

    // Keep ONLY backend-required fields
    const cleanedItems = cart.map((item: any) => ({
      medicineId: item.medicineId,
      quantity: item.quantity,
    }));

    setItems(cleanedItems);
  }, [router]);

  const placeOrder = async () => {
    if (!address.trim()) {
      setError("Delivery address is required");
      return;
    }

    if (items.length === 0) {
      setError("Cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await orderService.createOrder({
        address,
        items,
      });

      cartStorage.clear();
      router.push("/dashboard/my-orders");
    } catch (err: any) {
      setError(err.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* ORDER ITEMS (BACKEND SAFE VIEW) */}
      <div className="border rounded p-4 space-y-2">
        <h2 className="font-semibold">Order Items</h2>

        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-gray-700"
          >
            <span className="truncate">
              {item.medicineId}
            </span>
            <span>× {item.quantity}</span>
          </div>
        ))}
      </div>

      {/* ADDRESS INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Delivery Address
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Dhaka, Bangladesh"
          className="border w-full p-3 rounded resize-none"
          rows={3}
        />
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* PLACE ORDER BUTTON */}
      <button
        onClick={placeOrder}
        disabled={loading}
        className={`w-full py-3 rounded text-white font-medium ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
