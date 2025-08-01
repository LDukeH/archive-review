import Movie from "@/app/ui/swiper/Movie";
import Book from "@/app/ui/swiper/Book";
import { Suspense } from "react";
import SwiperSkeleton from "../ui/skeleton/SwiperSkeleton";

export default function Home() {
  return (
    <div>
      <div className="text-xl text-center">Welcome to the Owl Review</div>
      <div className="w-full mt-24 flex flex-col gap-12">
        <Suspense fallback={<SwiperSkeleton />}>
          <Movie />
        </Suspense>

        <Suspense fallback={<SwiperSkeleton />}>
          <Book />
        </Suspense>
      </div>
    </div>
  );
}
