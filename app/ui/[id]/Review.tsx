import Description from "@/app/ui/Description";
import CollapsingContent from "@/app/ui/CollapsingContent";

import StarIcon from "@/public/star.svg";

export default function Review({ review }: { review: any }) {
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
            className="hover:text-accent hover:underline"
          >
            {review.ExternalLink}{" "}
          </a>
        </div>
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
