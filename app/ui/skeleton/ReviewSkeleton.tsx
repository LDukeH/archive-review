export default function MovieReview() {
  return (
    <div className="mt-12 w-full h-144 px-12 grid grid-cols-2">
      {/* change to image once hosted image on Cloudinary */}
      <div className="col-span-1 flex items-start justify-center">
        <div className="animate-pulse w-96 h-full max-h-114 rounded-xl bg-gray-200"></div>
      </div>

      <div className="flex flex-col">
        <div className="animate-pulse w-96 h-8 rounded-sm bg-gray-200"></div>
        <div className="animate-pulse w-24 h-6 rounded-sm bg-gray-200 mt-2"></div>
        <div className="animate-pulse w-full h-24 rounded-sm bg-gray-200 mt-6"></div>

        <div className="animate-pulse w-24 h-12 rounded-sm bg-gray-200 mt-8">
          Rating:
        </div>

        <div className="animate-pulse w-112 h-12 rounded-sm bg-gray-200 mt-12"></div>
      </div>
    </div>
  );
}
