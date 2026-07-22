import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-desa-primary/20 bg-[#0b3f2b] text-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-10 grid gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-desa-accent text-lg font-black text-slate-950">
                M
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Desa Mekarjaya</h3>
                <p className="text-xs text-emerald-200">
                  Kecamatan Purwasari, Kabupaten Karawang
                </p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-emerald-100/80">
              Portal digital resmi desa untuk menyatukan informasi publik,
              pelayanan warga, dan transparansi pembangunan secara sederhana dan
              terpercaya.
            </p>
          </div>

          <div>
            <h4 className="mb-4 border-b border-emerald-700/60 pb-2 text-sm font-bold uppercase tracking-[0.24em] text-white">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
              <li>
                <Link href="/" className="transition hover:text-desa-accent">
                  Beranda Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/profil"
                  className="transition hover:text-desa-accent"
                >
                  Profil & Wilayah Desa
                </Link>
              </li>
              <li>
                <Link
                  href="/transparansi"
                  className="transition hover:text-desa-accent"
                >
                  Transparansi APBDes
                </Link>
              </li>
              <li>
                <Link
                  href="/pengaduan"
                  className="transition hover:text-desa-accent"
                >
                  Layanan Pengaduan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 border-b border-emerald-700/60 pb-2 text-sm font-bold uppercase tracking-[0.24em] text-white">
              Layanan Admin
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
              <li>
                <Link
                  href="/login"
                  className="transition hover:text-desa-accent"
                >
                  Portal Login Operator
                </Link>
              </li>
              <li>
                <Link
                  href="/peta-desa"
                  className="transition hover:text-desa-accent"
                >
                  Peta Spasial Desa
                </Link>
              </li>
              <li className="pt-2 text-emerald-200/70">
                📍 Kantor pelayanan Desa Mekarjaya
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-emerald-800/80 pt-6 text-sm text-emerald-200/70 sm:flex-row">
          <p>© 2026 Tim KKN Desa Mekarjaya. Semua hak cipta dilindungi.</p>
          <Link
            href="/login"
            className="font-semibold transition hover:text-desa-accent"
          >
            Masuk Sistem Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
