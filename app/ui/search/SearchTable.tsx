"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { Review } from "@/app/type";

import StarIcon from "@/public/star.svg";

import Link from "next/link";

export default function SearchTable() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/review?search=${searchTerm}`);

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviews = await response.json();
        setReviews(reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [searchTerm]);

  if (searchTerm === null || searchTerm === "") {
    return <div></div>;
  }
  return (
    <div className="absolute top-10 border-2 w-full h-fit bg-bgSecondary">
      {reviews.length > 0 ? (
        <div className="flex flex-col items-center gap-2 p-2 divide-y divide-gray-500">
          {reviews.map((review, index) => (
            <Link className="w-full" key={index} href={`/${review.id}`}>
              <div className="w-full mb-2 flex items-center cursor-pointer hover:bg-gray-600 rounded-lg hover:text-accent p-2 transition duration-300">
                <img
                  src={review.coverImage}
                  alt={review.title}
                  className="w-16 h-16"
                />

                <div className="ml-2 flex flex-col">
                  <div>{review.title}</div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    {review.rating}/5
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-full w-full items-center justify-center flex p-1">
          No reviews found
        </div>
      )}
    </div>
  );
}
