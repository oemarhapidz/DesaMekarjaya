"use client"; // 1. WAJIB ditambahkan paling atas agar tombol kliknya berfungsi

import React, { useState } from "react"; // 2. Import useState untuk buka/tutup menu
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  // State untuk melacak apakah menu mobile sedang terbuka atau tertutup
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="id">
      <body className="bg-gray-50 flex flex-col min-h-screen font-sans text-gray-800">
        {/* NAVBAR */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo Desa */}
            <Link
              href="/"
              className="text-xl font-bold text-green-600 hover:opacity-80 transition"
            >
              <span className="text-lg md:text-xl font-bold leading-tight">
                Desa Mekarjaya
              </span>
              <span className="text-lg md:text-base text-gray-500 block">
                Kecamatan Purwasari, Kabupaten Karawang
              </span>
            </Link>

            {/* MENU DEKTOP (Muncul di tablet/laptop, hilang di HP) */}
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-green-600 transition">
                Beranda
              </Link>
              <Link href="/profil" className="hover:text-green-600 transition">
                Profil Desa
              </Link>
              <Link href="/berita" className="hover:text-green-600 transition">
                Kabar Desa
              </Link>
              <Link href="/login" className="hover:text-green-600 transition">
                Masuk Admin
              </Link>
            </div>

            {/* TOMBOL HAMBURGER MOBILE (Hanya muncul di HP/Screen kecil) */}
            <button
              onClick={() => setIsOpen(!isOpen)} // Membalikkan nilai true/false saat diklik
              className="md:hidden text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {/* Gambar garis tiga pake SVG murni */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  // Logo 'X' jika menu terbuka
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Logo 'Garis Tiga' jika menu tertutup
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* MENU MOBILE INTERAKTIF (Hanya muncul jika isOpen = true) */}
          {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 flex flex-col text-sm font-medium text-gray-600 animate-fadeIn">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-600 transition py-1"
              >
                Beranda
              </Link>
              <Link
                href="/profil"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-600 transition py-1"
              >
                Profil Desa
              </Link>
              <Link
                href="/berita"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-600 transition py-1"
              >
                Kabar Desa
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-600 transition py-1"
              >
                Masuk Admin
              </Link>
            </div>
          )}
        </nav>

        {/* KONTEN DINAMIS */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER BERSAMA (Sudah responsif otomatis) */}
        <footer className="bg-gray-900 text-gray-400 text-sm py-8 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p>© 2026 Tim KKN Universitas - Hak Cipta Dilindungi.</p>
            <div className="flex gap-4">
              <Link
                href="/admin/login"
                className="hover:underline text-xs text-gray-500"
              >
                Portal Admin Desa
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
