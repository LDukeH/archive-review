export default function SwiperSkeleton() {
  return (
    <div className="px-12 mt-12">
      <div className="flex flex-row items-center mb-8 justify-between">
        <div className="animate-pulse w-1/8 h-6 bg-gray-300 rounded"></div>
        <div className="animate-pulse w-1/16 h-6 bg-gray-300 rounded"></div>
      </div>

      <div className="flex justify-around">
        <div className="animate-pulse w-56 h-72 bg-gray-300 rounded"></div>
        <div className="animate-pulse w-56 h-72 bg-gray-300 rounded"></div>
        <div className="animate-pulse w-56 h-72 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
