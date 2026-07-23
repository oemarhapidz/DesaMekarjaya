import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Atur bobot font yang dibutuhkan
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Website Desa Mekarjaya Kecamatan Purwasari",
  description:
    "Website resmi Desa Mekarjaya - Pelayanan publik mandiri, transparansi APBDes, pengaduan warga, dan peta spasial interaktif.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="bg-[#F8FAFC] text-slate-800 flex flex-col min-h-screen font-sans antialiased selection:bg-[#0D5C3A] selection:text-white">
        {/* FLOATING NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
