"use client";

import Description from "@/app/ui/Description";
import CollapsingContent from "@/app/ui/CollapsingContent";

import StarIcon from "@/public/star.svg";
import HeartFill from "@/public/heart-fill.svg";
import HeartBorder from "@/public/heart-border.svg";

import { motion, AnimatePresence } from "framer-motion";

import useUserStore from "@/store/userStore";

import { useState } from "react";

import { addToFavorites, removeFromFavorites } from "@/app/action";

export default function Review({ review }: { review: any }) {
  const { user, addToFavoritesStore, removeFromFavoritesStore } =
    useUserStore();

  const [isFavorite, setIsFavorite] = useState(
    user.data?.favoriteReviews.some((r: any) => r.id === review.id)
  );

  return (
    <div className="mt-12 w-full h-144  grid grid-cols-2">
      {/* change to image once hosted image on Cloudinary */}
      <div className="col-span-1 flex items-start justify-center">
        <img
          src={review.coverImage}
          alt={review.title}
          className="object-cover w-96 h-full max-h-114 rounded-xl"
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{review.title}</h1>
        <h2 className="mt-1">
          Author: <span className="font-semibold">{review.authorName}</span>
        </h2>
        <div className="mt-6 w-full pr-16">
          <Description text={review.description} />
        </div>

        <div className="mt-8 text-2xl">Rating:</div>
        <div className="text-[1.5rem] font-semibold flex items-center gap-1 w-full py-1 px-4">
          <StarIcon className="text-yellow-500 h-6 w-6" />
          {review.rating}/5
        </div>

        <div className="mt-6">
          <div>External Links:</div>
          <a
            href={review.ExternalLink}
            className="hover:text-link hover:underline"
          >
            {review.ExternalLink}{" "}
          </a>
        </div>

        {user.data && (
          <div className="mt-6 relative">
            <AnimatePresence>
              {!isFavorite ? (
                <motion.div
                  className="absolute top-0 left-0"
                  key="1"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <HeartBorder
                    className="w-8 h-8 text-red-500 cursor-pointer"
                    onClick={() => {
                      setIsFavorite(true);
                      addToFavorites({
                        reviewId: review.id,
                        userId: user.data.id,
                      });
                      addToFavoritesStore(review);
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="absolute top-0 left-0"
                  key="2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                >
                  <HeartFill
                    className="w-8 h-8 text-red-500 cursor-pointer"
                    onClick={() => {
                      setIsFavorite(false);
                      removeFromFavorites({
                        reviewId: review.id,
                        userId: user.data.id,
                      });
                      removeFromFavoritesStore(review);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="col-span-2 flex flex-col mt-8 gap-2 pb-8">
        <CollapsingContent title="Story" content={review.story} />
        <CollapsingContent title="Pros" content={review.pros} />
        <CollapsingContent title="Cons" content={review.cons} />
      </div>

      <div className="col-span-2 ml-32 mr-16 pb-12">
        <h1 className="text-3xl font-medium">Summary:</h1>
        <p className="mt-2">{review.summary}</p>
      </div>
    </div>
  );
}
