"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil Desa", href: "/profil" },
    { name: "Kabar Desa", href: "/berita" },
    { name: "Transparansi", href: "/transparansi" },
    { name: "Pengaduan", href: "/pengaduan" },
  ];

  return (
    <header className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-auto lg:max-w-7xl">
      <nav className="rounded-[1.25rem] border border-slate-200/80 bg-white/85 px-4 py-3 shadow-[0_16px_48px_-24px_rgba(2,6,23,0.35)] backdrop-blur md:px-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-desa-primary text-lg font-black text-white shadow-lg shadow-desa-primary/20">
              M
            </div>
            <div>
              <span className="block font-medium text-gray-900">
                Desa Mekarjaya
              </span>
              <span className="block text-[11px] font-medium text-slate-500">
                Kabupaten Karawang
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 p-1.5 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-[5rem] px-3.5 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-green-700 text-white shadow-sm"
                      : "text-slate-600 hover:bg-gray-100 hover:text-green-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex">
            <Link
              href="/login"
              className="rounded-2xl bg-[#a6fe9d] px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-[#fafafa]"
            >
              Login Admin
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-2xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-desa-primary md:hidden"
            aria-label="Toggle Navigation"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
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

        {isOpen && (
          <div className="mt-3 flex flex-col gap-1 border-t border-slate-100 pt-3 md:hidden">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-[5rem] px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-emerald-500"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-2xl bg-desa-accent px-4 py-2 text-center text-sm font-bold text-slate-950"
            >
              Masuk Admin Portal
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
