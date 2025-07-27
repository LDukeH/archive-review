import "./globals.css";
import kumbhSans from "./font";
import Navbar from "./ui/Navbar";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${kumbhSans.className} bg-bgPrimary`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>
        <div>{children}</div>
      </body>
    </html>
  );
}
