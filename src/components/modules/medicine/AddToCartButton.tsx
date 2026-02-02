"use client";

import { Button } from "@/components/ui/button";
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
    <Button
      onClick={handleAdd}
    >
      Add to Cart
    </Button>
  );
}
