import { Button } from "@/components/ui/button";

export function MedicineInfo({ medicine }: any) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{medicine.name}</h1>

      <p className="text-gray-600">{medicine.description}</p>

      <p className="text-xl font-semibold text-green-600">
        ৳ {medicine.price}
      </p>

      <p>
        <span className="font-medium">Manufacturer:</span>{" "}
        {medicine.manufacturer}
      </p>

      <p
        className={
          medicine.stock > 0 ? "text-green-600" : "text-red-500"
        }
      >
        {medicine.stock > 0 ? `In Stock ${medicine.stock}` : "Out of Stock"}
      </p>

      {/* CLIENT ACTIONS */}
      <div className="flex gap-4 pt-4">
        <Button >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
