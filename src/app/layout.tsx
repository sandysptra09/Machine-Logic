import { Poppins } from "next/font/google";
import "./globals.css";

// import providers heroui 
import { Providers } from "./providers";

// import statics components
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BGMSoundPlayer from "@/components/BGM/BGMSoundPlayer";

export const metadata = {
  title: "Machine Logic",
  description: "Spin the logic reels, master boolean expressions, and boost your brain power!",
};

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

          <BGMSoundPlayer />

          <div className="">

            <Navbar />

            {children}

            <Footer />

          </div>

        </Providers>
      </body>
    </html>
  );
}
