import BookByTags from "@/app/ui/book/BookByTag";

export default function BookPage() {
  return (
    <div className="h-full w-full mt-12">
      <div className="text-2xl font-medium ml-12">Book List</div>
      <div>
        <BookByTags />
      </div>
    </div>
  );
}
