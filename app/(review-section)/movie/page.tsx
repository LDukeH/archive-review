import MovieByTags from "@/app/ui/movie/MovieByTags";

export default function MoviePage() {
  return (
    <div className="h-full w-full mt-12">
      <div className="text-2xl font-medium ml-12">Movie List</div>
      <div>
        <MovieByTags />
      </div>
    </div>
  );
}
