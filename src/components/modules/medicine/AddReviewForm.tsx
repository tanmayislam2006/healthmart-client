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

const ratingLabels = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

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
    return <p className="text-sm text-slate-500">Loading session...</p>;
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 text-sm text-slate-500 shadow-sm">
        Please log in to add a review.
      </div>
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
    <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Write a Review
        </h3>
        <p className="text-xs text-slate-500">
          Your feedback helps other customers and improves our marketplace.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">
          Your rating: {rating} / 5
        </p>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            const isActive = value <= rating;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-pressed={isActive}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                  isActive
                    ? "border-primary/40 bg-primary/10"
                    : "border-slate-200 bg-white"
                }`}
                title={ratingLabels[value - 1]}
              >
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className={`h-5 w-5 ${
                    isActive ? "fill-primary" : "fill-slate-200"
                  }`}
                >
                  <path d="M10 1.5l2.4 4.8 5.3.8-3.8 3.7.9 5.3L10 13.8 5.2 16.1l.9-5.3L2.3 7.1l5.3-.8L10 1.5z" />
                </svg>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500">
          {ratingLabels[rating - 1]}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-500">
          Your review
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
          placeholder="Share details like dosage experience, delivery, and overall satisfaction."
          rows={4}
        />
      </div>

      {error && <p className="text-sm text-rose-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
          submitting
            ? "bg-slate-300"
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
