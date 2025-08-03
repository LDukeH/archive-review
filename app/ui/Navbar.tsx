"use client";

import { usePathname } from "next/navigation";
import Logo from "@/public/logo.svg";
import Link from "next/link";

import Search from "@/app/ui/search/Search";

import useUserStore from "@/store/userStore";

import { signOut } from "next-auth/react";

import { SessionProvider } from "next-auth/react";

export default function Navbar() {
  const section = usePathname().split("/")[1]; // "movie" from "/movie/naruto"
  const { user } = useUserStore();
  const isLoggedIn = user && user.data;

  const logOutToken = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      console.error("Failed to log out");
      return;
    }
    console.log("Logged out successfully");
    window.location.reload();
    return;
  };

  // require session provider to signOut, don't know why, don't change it
  return (
    <SessionProvider>
      <div className="w-full bg-bgPrimary">
        <div className="w-full gap-6 pl-8 h-24 border-b-bgSecondary border-b-2 flex items-center mx-auto text-primary">
          <Link href={"/"} className="flex items-center h-full w-60">
            <Logo className="text-white h-full w-60 hover:text-accent cursor-pointer transition-all duration-300" />
          </Link>

          {/* sites */}
          <div className="font-semibold justify-between gap-8 h-full flex">
            <Link
              href="/review/movie"
              className={`site ${section === "movie" ? "highlight" : ""}`}
            >
              Movie
            </Link>
            <Link
              href="/review/book"
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
            <div>
              {isLoggedIn ? (
                <div
                  onClick={() => {
                    if (user.type === "token") {
                      logOutToken();
                    } else if (user.type === "oauth") {
                      signOut({ callbackUrl: "/" });
                    }
                    window.location.reload();
                  }}
                  className="cursor-pointer border-2 border-white  w-fit h-fit px-6 py-2 rounded-3xl hover:bg-accent hover:text-bgPrimary hover:border-bgPrimary focus:outline-0 focus:bg-accent focus:text-bgPrimary focus:border-bgPrimary transition-all duration-300"
                >
                  Sign out
                </div>
              ) : (
                <Link
                  href="/login"
                  className="cursor-pointer border-2 border-white  w-fit h-fit px-6 py-2 rounded-3xl hover:bg-accent hover:text-bgPrimary hover:border-bgPrimary focus:outline-0 focus:bg-accent focus:text-bgPrimary focus:border-bgPrimary transition-all duration-300"
                >
                  Log-In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
