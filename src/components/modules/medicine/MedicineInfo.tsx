import { AddToCartButton } from "./AddToCartButton";

export function MedicineInfo({ medicine }: any) {
  const reviews = Array.isArray(medicine?.reviews) ? medicine.reviews : [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + (r?.rating || 0), 0) /
        reviews.length
      : 0;
  const formatRating = averageRating ? averageRating.toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-primary" />
        Licensed sellers only
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {medicine.name}
        </h1>
        <p className="mt-2 text-base text-slate-600">
          {medicine.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <p className="text-2xl font-semibold text-primary">
          BDT {medicine.price}
        </p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            medicine.stock > 0
              ? "bg-primary/10 text-primary"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {medicine.stock > 0 ? `In stock · ${medicine.stock}` : "Out of stock"}
        </span>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={`h-4 w-4 ${
                  i < Math.round(averageRating)
                    ? "fill-primary"
                    : "fill-slate-200"
                }`}
              >
                <path d="M10 1.5l2.4 4.8 5.3.8-3.8 3.7.9 5.3L10 13.8 5.2 16.1l.9-5.3L2.3 7.1l5.3-.8L10 1.5z" />
              </svg>
            ))}
          </div>
          <span>{formatRating}</span>
          <span>({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-2xl border bg-white/70 p-4 text-sm text-slate-700 shadow-sm sm:grid-cols-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Manufacturer</span>
          <span className="font-medium">{medicine.manufacturer}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Category</span>
          <span className="font-medium">{medicine.category?.name ?? "N/A"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Seller</span>
          <span className="font-medium">
            {medicine.seller?.name ?? "Verified Seller"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Updated</span>
          <span className="font-medium">
            {medicine.updatedAt
              ? new Date(medicine.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recently"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <AddToCartButton medicine={medicine} />
      </div>

      <div className="grid grid-cols-1 gap-4 text-xs text-slate-500 sm:grid-cols-3">
        {[
          {
            title: "Verified sourcing",
            detail: "Every seller is vetted for compliance",
          },
          {
            title: "Temperature safe",
            detail: "Stored and shipped with care",
          },
          {
            title: "Fast support",
            detail: "Licensed pharmacists available",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border bg-white/60 p-4 shadow-sm"
          >
            <p className="font-semibold text-slate-700">{item.title}</p>
            <p className="mt-1 text-slate-500">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
