import "./globals.css";
import kumbhSans from "./font";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? verifyToken(token) : null;

  console.log("User from token:", user);

  return (
    <html lang="en">
      <body className={`antialiased ${kumbhSans.className} bg-bgPrimary`}>
        {children}
      </body>
    </html>
  );
}
