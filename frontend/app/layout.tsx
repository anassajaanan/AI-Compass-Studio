import React from "react";
import Providers from "./providers";
import type { Metadata } from "next";
import { Poppins, Courgette, Montserrat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const courgette = Courgette({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-courgette",
});

export const metadata: Metadata = {
  title: "MyCo",
  description: "Watch Movies & Videos Online | Watch it Earn It",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${poppins.variable} ${courgette.variable} ${montserrat.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
