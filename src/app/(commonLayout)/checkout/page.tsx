"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cartStorage, CartItem } from "@/lib/cart";
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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cart = cartStorage.get();

    if (!cart || cart.length === 0) {
      router.replace("/cart");
      return;
    }

    setCartItems(cart);
  }, [router]);

  const orderItems = useMemo(
    () =>
      cartItems.map((item) => ({
        medicineId: item.medicineId,
        quantity: item.quantity,
      })),
    [cartItems]
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = subtotal > 0 ? 0 : 0;
  const total = subtotal + delivery;

  const placeOrder = async () => {
    if (!address.trim()) {
      setError("Delivery address is required");
      return;
    }

    if (orderItems.length === 0) {
      setError("Cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await orderService.createOrder({
        address,
        items: orderItems,
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
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-white to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="text-sm text-slate-500">
            Review your order and confirm your delivery details.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-700">
                Delivery Address
              </h2>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House, street, city, district"
                className="mt-3 min-h-[140px] w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
                rows={4}
              />
              <p className="mt-2 text-xs text-slate-400">
                We only ship to verified addresses. Please include full details.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-700">
                Order Items
              </h2>
              <div className="mt-4 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.medicineId}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-primary">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-rose-500">{error}</p>}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-700">
                Order Summary
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span className="font-medium text-slate-800">
                    {delivery === 0 ? "Free" : formatCurrency(delivery)}
                  </span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary p-6 text-white shadow-sm">
              <p className="text-sm font-semibold">Secure payment</p>
              <p className="mt-2 text-xs text-white/80">
                Orders are verified by licensed pharmacists before dispatch.
              </p>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                loading
                  ? "bg-slate-300"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
