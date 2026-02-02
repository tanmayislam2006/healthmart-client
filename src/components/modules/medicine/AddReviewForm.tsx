"use client";

import { useEffect, useState } from "react";
import { userService } from "@/service/user.service";
import { authClient } from "@/lib/auth-client";

export function AddReviewForm({ medicineId }: { medicineId: string }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await authClient.getSession();

        if ("data" in res && res.data?.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  if (!user) {
    return (
      <p className="text-sm text-gray-500">Please login to add a review.</p>
    );
  }

  const handleSubmit = async () => {
    await fetch(`/api/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        medicineId,
        rating,
        content,
      }),
    });

    setContent("");
  };

  return (
    <div className="border rounded p-4 space-y-3">
      <h3 className="font-semibold">Write a Review</h3>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Star
          </option>
        ))}
      </select>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Write your experience..."
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit Review
      </button>
    </div>
  );
}
