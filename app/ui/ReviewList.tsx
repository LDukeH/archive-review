"use client";

import { Review } from "@/app/generated/prisma";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

export default function ReviewList({ type }: { type: "book" | "movie" }) {
  const [reviews, setReviews] = useState([]);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const queryString = useMemo(() => params.toString(), [params]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/${type}` + `?${queryString}`);
      if (!response.ok) {
        console.error("Failed to fetch reviews");
        return;
      }
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, [queryString]);

  return (
    <div>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {reviews.map((review: Review) => (
            <div key={review.id}>
              <div className="flex flex-col items-center justify-center pb-8 gap-1">
                <Link
                  href={`review/${review.id}`}
                  className={`w-56 h-72 flex flex-col items-center justify-center p-4 mx-12 rounded-lg shadow-lg relative hover:scale-105 transition-all duration-300`}
                  style={{
                    backgroundImage: `url(${review.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Link>
                <div className="text-2xl">{review.title}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pl-12 py-6">No {type}s found</div>
      )}
    </div>
  );
}
