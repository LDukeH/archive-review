"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";

import { Review } from "@/app/type";

export default function SwiperAll({
  reviews,
  type,
}: {
  reviews: any[];
  type: string;
}) {
  return (
    <div>
      {reviews.length > 0 ? (
        <div>
          <div className="flex flex-row items-center mb-8 justify-between px-12">
            <h1 className="text-2xl text-primary font-bold text-center select-none">
              {type.charAt(0).toUpperCase() + type.slice(1)} List
            </h1>
            <Link href="review/book" className="hover:text-accent">
              All {type.charAt(0).toUpperCase() + type.slice(1)}s
            </Link>
          </div>

          <div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {reviews.map((review: Review) => (
                //
                <SwiperSlide key={review.id}>
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
                </SwiperSlide>
              ))}
              {/*  */}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="w-full text-center">No reviews found</div>
      )}
    </div>
  );
}
