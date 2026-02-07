"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem, cartStorage } from "@/lib/cart";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCart(cartStorage.get());
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const updateQuantity = (medicineId: string, nextQuantity: number) => {
    cartStorage.updateQuantity(medicineId, nextQuantity);
    setCart(cartStorage.get());
  };

  const removeItem = (medicineId: string) => {
    cartStorage.remove(medicineId);
    setCart(cartStorage.get());
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-white to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
          <p className="text-sm text-slate-500">
            Review your medicines before heading to checkout.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 text-sm text-slate-500 shadow-sm">
                Your cart is empty. Start browsing medicines to add items.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.medicineId}
                  className="rounded-2xl border border-primary/10 bg-white/70 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                        <span>Quantity</span>
                        <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-white px-2 py-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.medicineId, item.quantity - 1)
                            }
                            className="h-6 w-6 rounded-full border border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary"
                          >
                            -
                          </button>
                          <span className="min-w-[24px] text-center text-xs font-semibold text-slate-700">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.medicineId, item.quantity + 1)
                            }
                            className="h-6 w-6 rounded-full border border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-base font-semibold text-primary">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Price {formatCurrency(item.price)} each
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.medicineId)}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
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
                  <span className="font-medium text-slate-800">Free</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              disabled={cart.length === 0}
              className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                cart.length === 0
                  ? "bg-slate-300"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
