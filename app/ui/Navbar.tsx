"use client";

import { usePathname } from "next/navigation";

import Image from "next/image";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import Logo from "@/public/logo.svg";
import UserIcon from "@/public/user.svg";
import ArrowLeft from "@/public/arrow-left.svg";

import Link from "next/link";

import Search from "@/app/ui/search/Search";

import useUserStore from "@/store/userStore";

import { signOut } from "next-auth/react";

export default function Navbar() {
  const section = usePathname().split("/")[1]; // "movie" from "/movie/naruto"
  const { user } = useUserStore();
  const isLoggedIn = user && user.data;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const signOutUser = async () => {
    if (user.type === "token") {
      await logOutToken();
    } else if (user.type === "oauth") {
      await signOut({ callbackUrl: "/" });
    }
    window.location.reload();
  };

  const logOutToken = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      console.error("Failed to log out");
      return;
    }
    console.log("Logged out successfully");
    window.location.reload();
    return;
  };

  return (
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
              <div className="relative w-full pr-12">
                <div className="flex items-center">
                  <div className="cursor-pointer ">
                    {user.type === "token" ? (
                      <div className="border-1 border-accent rounded-full p-2  hover:bg-accent hover:text-black hover:border-black  transition-all duration-300">
                        <UserIcon className="inline-block w-6 h-6" />
                      </div>
                    ) : (
                      <div className="border-1 border-accent rounded-full hover:border-black  transition-all duration-300">
                        <img
                          src={user.data.image}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}
                  </div>

                  <ArrowLeft
                    onClick={toggleMenu}
                    className={`ml-2 w-6 h-6 cursor-pointer transition-all duration-300 ${
                      !isOpen ? "-rotate-90" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.2,
                        type: "tween",
                        stiffness: 300,
                      }}
                      key="menu"
                      className="absolute top-12 border-1 w-full bg-bgPrimary rounded-lg"
                    >
                      <div className="flex flex-col gap-2 py-2 ">
                        <div className="menu-option" onClick={signOutUser}>
                          Log-out
                        </div>

                        <Link href={`/profile`} className="menu-option">
                          Profile
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
  );
}
