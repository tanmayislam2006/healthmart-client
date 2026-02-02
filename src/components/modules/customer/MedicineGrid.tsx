import { MedicineResponse } from "@/types";
import { MedicineCard } from "./MedicineCard";



export function MedicineGrid({ medicines }:{medicines:MedicineResponse[]}) {

  return (
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
      {medicines.map((m) => (
        <MedicineCard key={m.id} medicine={m} />
      ))}
    </div>
  );
}

