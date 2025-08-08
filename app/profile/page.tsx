"use client";

import Link from "next/link";

import useUserStore from "@/store/userStore";

import { Review } from "@/app/type";

export default function ProfilePage() {
  const { user } = useUserStore();
  const reviews = user.data?.favoriteReviews || [];

  return (
    <div>
      <div className="text-2xl font-bold p-4">Favorite Reviews: </div>
      <div>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {reviews.map((review: Review) => (
              <div key={review.id}>
                <div className="flex flex-col items-center justify-center pb-8 gap-1">
                  <Link
                    href={`/review/${review.id}`}
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
          <div className="pl-12 py-6">No reviews found</div>
        )}
      </div>
    </div>
  );
}
