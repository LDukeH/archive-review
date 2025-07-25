import { useState } from "react";

const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default function Description({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pl-4 w-full whitespace-pre-wrap">
      <div className="">{expanded ? text : text.slice(0, 150) + "..."}</div>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="text-accent hover:underline cursor-pointer"
      >
        {expanded ? "<" : "Read More"}
      </button>
    </div>
  );
}
