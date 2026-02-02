"use client";

import { useState } from "react";

import { env } from "@/env";
import { MedicineGrid } from "../medicine/MedicineGrid";

export function LoadMoreMedicines({ initialPage }:{initialPage:number}) {
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState([]);

  const loadMore = async () => {
    const res = await fetch(`${env.NEXT_PUBLIC_URL}/api/medicines?page=${page}&limit=6`);
    const {data} = await res.json();

    setPage((p) => p + 1);
  };

  return (
    <>
      <MedicineGrid medicines={items} />

      <button onClick={loadMore} className="btn-primary">
        Load More
      </button>
    </>
  );
}
