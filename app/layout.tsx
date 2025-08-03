import "./globals.css";
import kumbhSans from "./font";

import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${kumbhSans.className} bg-bgPrimary`}>
        <SessionProvider refetchOnWindowFocus={false}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
