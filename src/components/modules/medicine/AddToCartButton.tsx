"use client";

import { cartStorage } from "@/lib/cart";


export function AddToCartButton({ medicine }: any) {
  const handleAdd = () => {
    cartStorage.add({
      medicineId: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: 1,
    });

    alert("Added to cart");
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-orange-500 text-white px-6 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}
