"use client";

import type { Metadata } from "next";
import "./globals.css";
import kumbhSans from "./font";
import Navbar from "./ui/Navbar";
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${kumbhSans.className} bg-bgPrimary`}>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
