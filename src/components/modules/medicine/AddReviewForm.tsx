"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { SaveResponse } from "@/types";
import { toast } from "sonner";

type PropsForReview = {
  medicineId: string;
  onSubmit: (data: {
    medicineId: string;
    rating: number;
    content: string;
  }) => Promise<SaveResponse>;
};

export function AddReviewForm({ medicineId, onSubmit }: PropsForReview) {
  const [user, setUser] = useState<{ id: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <p className="text-sm text-gray-500">Loading session...</p>;
  }

  if (!user) {
    return (
      <p className="text-sm text-gray-500">Please login to add a review.</p>
    );
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("Review content cannot be empty.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await onSubmit({ medicineId, rating, content });

      if (res.success) {
        toast.success(res.message);
        setContent("");
      } else {
        setError(res.message || "Failed to save review.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
            {r} Star{r > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Write your experience..."
        rows={4}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`px-4 py-2 rounded text-white ${
          submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
