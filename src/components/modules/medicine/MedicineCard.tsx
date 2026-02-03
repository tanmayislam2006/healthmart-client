// src/components/medicine/MedicineCard.tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MedicineResponse } from "@/types";

export function MedicineCard({ medicine }: { medicine: MedicineResponse }) {
  const isOutOfStock = medicine.stock === 0;

  return (
    <div className="group rounded-2xl border border-primary/10 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      {/* Category */}
      <Badge variant="secondary" className="mb-3 border border-primary/10 bg-primary/10 text-primary">
        {medicine.category.name}
      </Badge>

      {/* Name */}
      <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
        {medicine.name}
      </h3>

      {/* Manufacturer */}
      <p className="text-sm text-slate-500">
        {medicine.manufacturer}
      </p>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm text-slate-600">
        {medicine.description}
      </p>

      {/* Price & Stock */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">
          BDT {medicine.price}
        </span>

        {isOutOfStock ? (
          <span className="text-sm text-destructive">
            Out of stock
          </span>
        ) : (
          <span className="text-sm text-slate-500">
            Stock: {medicine.stock}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <Button
          asChild
          className="w-full bg-primary text-white hover:bg-primary/90"
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
