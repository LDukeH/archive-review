"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ArrowLeft from "@/public/arrow-left.svg";

export default function CollapsingContent({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative ml-32 mr-8  hover:text-accent">
      <div
        className="text-xl cursor-pointer transition border-2 border-primary p-1 flex items-center justify-between rounded-sm"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div>{title}</div>
        <ArrowLeft
          className={`transition-transform duration-300 h-4 w-4  ${
            isOpen ? "rotate-90 " : "rotate-0"
          }`}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={title}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-4 border-2 shadow z-10 w-full text-primary"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
