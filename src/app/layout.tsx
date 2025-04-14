import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// import providers heroui 
import { Providers } from "./providers";

// import statics components
import Navbar from "@/components/Navbar/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <Providers >

          <div className="">

            <Navbar />

            {children}

          </div>

        </Providers>
      </body>
    </html>
  );
}
