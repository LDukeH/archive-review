import "./globals.css";
import kumbhSans from "./font";
import Navbar from "./ui/Navbar";

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
