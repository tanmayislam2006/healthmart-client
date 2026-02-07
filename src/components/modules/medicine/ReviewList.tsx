function ReviewStars({ rating }: { rating: number }) {
  const value = Math.max(0, Math.min(5, Math.round(rating || 0)));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 ${
            i < value ? "fill-primary" : "fill-slate-200"
          }`}
        >
          <path d="M10 1.5l2.4 4.8 5.3.8-3.8 3.7.9 5.3L10 13.8 5.2 16.1l.9-5.3L2.3 7.1l5.3-.8L10 1.5z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500">{value}/5</span>
    </div>
  );
}

export function ReviewList({ reviews }: { reviews: any[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 text-sm text-slate-500 shadow-sm">
        No reviews yet. Be the first to share your experience.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => {
        const name = review?.user?.name || "Verified Customer";
        const createdAt = review?.createdAt
          ? new Date(review.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recently";

        return (
          <div
            key={index}
            className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">{name}</p>
                <p className="text-xs text-slate-400">{createdAt}</p>
              </div>
              <ReviewStars rating={review?.rating || 0} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {review?.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
