"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ReviewList from "@/app/ui/ReviewList";

export default function MovieByTags() {
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagChange = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    const currentTags = params.getAll("tags");

    if (currentTags.includes(tag)) {
      const newTags = currentTags.filter((t) => t !== tag);
      params.delete("tags");
      newTags.forEach((t) => params.append("tags", t));
    } else {
      params.append("tags", tag);
    }

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/tag");
      if (!response.ok) {
        console.error("Failed to fetch tags");
        return;
      }
      const data = await response.json();
      setTags(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-row w-full h-full justify-between items-start relative">
      <div>
        <ReviewList type="book" />
      </div>

      <div className="absolute top-0 right-4">
        <h2 className="text-2xl font-semibold mb-4">Filter by Tags</h2>
        <div className="h-60 scroll-container flex flex-col gap-2">
          {tags.map((tag: any, index) => {
            return (
              <div key={index} className="flex border-2 pl-1 rounded-lg">
                <input
                  type="checkbox"
                  id={tag.name}
                  name="tags"
                  value={tag.name}
                  className="mr-2 peer hidden"
                  checked={searchParams.getAll("tags").includes(tag.name)}
                  onChange={() => handleTagChange(tag.name)}
                />
                <label
                  htmlFor={tag.name}
                  className="w-fit  inline-block peer-checked:text-accent peer-checked:font-bold cursor-pointer hover:brightness-120 transition-all duration-300"
                >
                  {tag.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
