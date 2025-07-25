import prisma from "@/lib/prisma";
import SwiperAll from "@/app/ui/SwiperAll";

// this file is use to fetch book and load it to the swiper
export default async function Movie() {
  const movies = await prisma.review.findMany({ where: { type: "movie" } });

  return (
    <div>
      <SwiperAll reviews={movies} type="movie" />
    </div>
  );
}
