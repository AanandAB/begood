import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://AanandAB.github.io"),
  title: {
    default: "Be Good Event Consulting — Make It A Moment",
    template: "%s — Be Good",
  },
  description:
    "Be Good Event Consulting turns ideas into precisely executed experiences — corporate events, startup launches and brand experiences across Kerala and beyond.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerif.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <LenisProvider>
          <Cursor />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
