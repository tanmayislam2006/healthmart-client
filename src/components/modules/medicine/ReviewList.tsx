export function ReviewList({ reviews }: { reviews: any[] }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border rounded p-4 space-y-1"
        >
          <p className="font-medium">⭐ {review.rating}/5</p>
          <p className="text-gray-700">{review.content}</p>
        </div>
      ))}
    </div>
  );
}
