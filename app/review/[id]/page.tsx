"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Review } from "@/app/type";

import ReviewSkeleton from "@/app/ui/skeleton/ReviewSkeleton";
import ReviewPage from "@/app/ui/[id]/Review";

export default function MovieReview() {
  const { id } = useParams();
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`/api/${id}`);
      if (!response.ok) {
        console.error("Failed to fetch review");
        return;
      }
      const data = await response.json();
      setReview(data);
    };

    fetchReview();
  }, [id]);

  return !review ? (
    <ReviewSkeleton />
  ) : (
    <div>
      <ReviewPage review={review} />
    </div>
  );
}
