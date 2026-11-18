import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rabbi Levi Wolosow",
  description:
    "Continuing the Torah legacy of Rabbi Levi Yitzchok Wolosow z\"l — over 500 recorded classes on Chumash, Talmud, Tanya, and more.",
  openGraph: {
    title: "Rabbi Levi Wolosow",
    description:
      "Over 500 recorded Torah classes by Rabbi Levi Wolosow z\"l",
    type: "website",
    images: [
      {
        url: "/rabbi-levi.jpg",
        width: 800,
        height: 600,
        alt: "Rabbi Levi Wolosow z\"l",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
