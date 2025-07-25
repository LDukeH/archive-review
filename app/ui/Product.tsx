"use client";

import { useState } from "react";
import Image from "next/image";
import PlusIcon from "@/public/icon-plus.svg";
import MinusIcon from "@/public/icon-minus.svg";
import PrevIcon from "@/public/icon-previous.svg";
import NextIcon from "@/public/icon-next.svg";

import CartIcon from "@/public/icon-cart.svg";

export default function Product() {
  return (
    <div className="h-148 w-7/10 mobile:mx-auto mobile:mt-18 flex mobile:grid-cols-2 gap-8 flex-col mobile:grid">
      <div className="w-full">
        {/* Product Images */}
        <div className="flex flex-col items-center gap-8 w-screen mobile:w-full h-full relative ">
          {/*change on mobile*/}
          <div className="mobile:hidden absolute z-1 top-1/2 w-full flex justify-between">
            <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center">
              <PrevIcon />
            </div>

            <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center">
              <NextIcon />
            </div>
          </div>

          {/*  */}
          <button className="relative h-150 w-screen mobile:h-full mobile:w-full mobile:rounded-2xl overflow-hidden cursor-pointer hover:brightness-70 transition-all duration-300 focus:outline-none focus:brightness-70">
            <Image
              src="/image-product-1.jpg"
              alt="Product Image"
              fill={true}
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </button>

          {/* image selector */}
          <div className="grid-cols-4 h-24 items-center w-full gap-12 hidden mobile:grid"></div>
        </div>
      </div>
      {/*  */}

      {/* Product Details */}
      <div className="h-full w-screen px-12 py-4 mobile:p-4 text-2xl  mobile:h-full mobile:w-full">
        <div className="h-full w-full flex flex-col gap-4">
          <div className="text-secondary font-bold tracking-[0.15rem] mobile:text-sm text-2xl">
            COMPANY
          </div>

          <div className="text-black text-5xl font-bold">NAME</div>

          <div className="text-secondary tracking-wider mt-4 mobile:mt-0 font-base">
            DESCRIPTION
          </div>

          <div>RATING</div>
        </div>
      </div>
    </div>
  );
}
