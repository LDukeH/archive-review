"use client";

import { usePathname } from "next/navigation";
import Logo from "@/public/logo.svg";
import Link from "next/link";

import Search from "@/app/ui/search/Search";

export default function Navbar() {
  const section = usePathname().split("/")[1]; // "movie" from "/movie/naruto"

  return (
    <div className="w-full">
      <div className="w-full gap-6 pl-8 h-24 border-b-bgSecondary border-b-2 flex items-center mx-auto text-primary">
        <Link href={"/"} className="flex items-center h-full w-60">
          <Logo className="text-white h-full w-60 hover:text-accent cursor-pointer transition-all duration-300" />
        </Link>

        {/* sites */}
        <div className="font-semibold justify-between gap-8 h-full flex">
          <Link
            href="/movie"
            className={`site ${section === "movie" ? "highlight" : ""}`}
          >
            Movie
          </Link>
          <Link
            href="/book"
            className={`site ${section === "book" ? "highlight" : ""}`}
          >
            Book
          </Link>
        </div>

        {/* information */}
        <div className="font-semibold justify-between items-center gap-8 h-full flex ml-auto mr-24">
          <div>
            <Search />
          </div>
          <button className="site">Contact</button>
        </div>
      </div>
    </div>
  );
}
