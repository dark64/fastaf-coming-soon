import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type React from "react";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fastaf.sh - Shipping Your MVP Fast As F***",
  description: "The Fastest Way to Ship Your MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${_geist.className} antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
