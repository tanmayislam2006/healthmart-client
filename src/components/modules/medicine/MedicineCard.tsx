// src/components/medicine/MedicineCard.tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MedicineResponse } from "@/types";

export function MedicineCard({ medicine }: { medicine: MedicineResponse }) {
  const isOutOfStock = medicine.stock === 0;

  return (
    <div className="group rounded-xl border bg-background p-4 transition hover:shadow-lg">
      {/* Category */}
      <Badge variant="secondary" className="mb-2">
        {medicine.category.name}
      </Badge>

      {/* Name */}
      <h3 className="line-clamp-1 text-lg font-semibold">
        {medicine.name}
      </h3>

      {/* Manufacturer */}
      <p className="text-sm text-muted-foreground">
        {medicine.manufacturer}
      </p>

      {/* Description */}
      <p className="mt-2 line-clamp-2 text-sm">
        {medicine.description}
      </p>

      {/* Price & Stock */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold">
          ${medicine.price}
        </span>

        {isOutOfStock ? (
          <span className="text-sm text-destructive">
            Out of stock
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">
            Stock: {medicine.stock}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <Button
          asChild
          className="w-full"
          disabled={isOutOfStock}
        >
          <Link href={`/medicines/${medicine.id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </div>
  );
}
