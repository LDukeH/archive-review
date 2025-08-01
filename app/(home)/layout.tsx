import kumbhSans from "../font";
import Navbar from "@/app/ui/Navbar";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <div className={`antialiased ${kumbhSans.className} bg-bgPrimary`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>
        <div>{children}</div>
      </div>
    </div>
  );
}
