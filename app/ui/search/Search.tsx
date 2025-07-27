"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

import SearchIcon from "@/public/search.svg";

import SearchTable from "@/app/ui/search/SearchTable";

export default function Search() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 200);

  return (
    <div className="relative">
      <div className="border-1 px-3 py-1 rounded-2xl border-white focus:outline-none hover:border-accent duration-500 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("search") || ""}
          className="focus:outline-none"
        />
        <SearchIcon className="w-4 h-4 text-white cursor-pointer" />
      </div>
      <SearchTable />
    </div>
  );
}
