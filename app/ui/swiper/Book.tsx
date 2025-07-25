import prisma from "@/lib/prisma";
import SwiperAll from "@/app/ui/SwiperAll";
import { Suspense } from "react";
import SwiperSkeleton from "@/app/ui/skeleton/SwiperSkeleton";

// this file is use to fetch book and load it to the swiper
export default async function Book() {
  const books = await prisma.review.findMany({
    where: { type: "book" },
  });

  return (
    <Suspense fallback={<SwiperSkeleton />}>
      <SwiperAll reviews={books} type="book" />
    </Suspense>
  );
}
