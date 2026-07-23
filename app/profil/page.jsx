"use client";
import { useState } from "react";
import { Maximize2, X } from "feather-icons-react"; // atau lucide-react
export default function ProfilPage() {
  const misiList = [
    "Meningkatkan Profesionalisme Pelayanan Publik.",
    "Meningkatkan Kualitas Sumber Daya Manusia bagi Aparatur Pemerintahan Desa.",
    "Meningkatkan Pembangunan Fisik dan Non fisik di berbagai Bidang.",
    "Menumbuhkenbangkan nilai-nilai Keagamaan dan melastarikan Seni dan Budaya serta kearifan lokal.",
    "Meningkatkan Ketersediaaan dan kualitas Infrastruktur Pemerintahan Desa.",
    "Penertiban Adminitrasi Pemerintahan Desa",
    "Meningkatkan Pertisipasi Swadaya Masyarakat dan Sektor Swasta dalam Kegiatan Pembangunan dan Kegiatan Kemasyarakatan Desa",
    "Menggali Potensi Desa dalam rangka Peningkatan Pendapatan Asli Desa",
    "Meningkatkan Kerukunan kerjasama antar Lembaga Desa",
    "Peningkatan Pemberdayaan Masyarakat dan Kemampuan Daya Saing Sosial ekonomi",
    "Meningkatkan Kepedulian Sosial Masyarakat",
  ];
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="-mt-24 min-h-screen bg-[#F8FAFC] pb-20">
      {/* 1. HERO HEADER HIJAU DENGAN LENGKUNGAN (WAVE) */}
      <section className="relative bg-[#0D5C3A] pt-36 pb-28 text-center text-white px-6">
        <div className="mx-auto max-w-3xl space-y-3 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Profile Desa Mekarjaya
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Mengenal lebih dekat sejarah, visi misi, dan potensi Desa Mekarjaya
            yang menjadi kebanggaan masyarakat.
          </p>
        </div>

        {/* Shape Lengkungan Putih di Bawah Header */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-0 pointer-events-none">
          <svg
            className="relative block w-full h-12 sm:h-20 text-[#F8FAFC]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      {/* 2. KONTEN VISI & MISI */}
      <section className="space-y-8 mx-auto max-w-6xl px-6 pt-6">
        {/* Subtitle & Judul Section */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-600">
            Arah Pembangunan
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Visi & Misi Desa Mekarjaya
          </h2>
        </div>

        {/* Sejarah Desa */}
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Sejarah Singkat Desa
          </h3>
          <p className="text-sm text-justify leading-relaxed text-slate-600">
            Desa Mekarjaya memiliki sejarah yang kaya dan menarik. Dengan
            perkembangan zaman, desa ini terus berinovasi untuk mencapai tujuan
            pembangunan yang berkelanjutan. Desa Mekarjaya berdiri pada tahun
            1980, Yang di Pimpin Kepala Desa Pertama M. Ranu dan terjadi
            Pemekaran Pada Tahun 2005 dari Kecamatan Cikampek Ke Kacamatan
            Purwasari terbentuk Pemimpin Desa atau Kepala. Desa Mekarjaya di
            bagi menjadi 4 Dusun yaitu : Karajan, Tamelang, Serang dan Cilalung.
          </p>
        </div>

        {/* Grid 2 Kolom Visi & Misi */}
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* CARD VISI */}
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            {/* Ikon Matahari/Lampu */}
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/60 text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Visi</h3>

            {/* Kutipan Visi dengan Garis Vertikal */}
            <div className="border-l-2 border-emerald-500 pl-4 py-1">
              <p className="text-sm italic leading-relaxed text-slate-600">
                “Menjadi Desa Mekarjaya yang Aman Mendiri, Maju Sejatera dan
                berakhlakul Karimah.”
              </p>
            </div>
          </div>

          {/* CARD MISI */}
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            {/* Ikon List */}
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/60 text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Misi</h3>

            {/* List Misi Berpenomoran Hijau */}
            <ul className="space-y-4">
              {misiList.map((misi, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-emerald-600 pt-0.5 min-w-[20px]">
                    {index + 1}.
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                    {misi}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-125 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Struktur Organisasi
            </h3>
            <button
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer"
            >
              <Maximize2 size={14} />
              <span>Lihat Gambar</span>
            </button>
            <img
              src="/struktur-organisasi-desa.jpeg"
              alt="Struktur Organisasi Desa Mekarjaya"
              className="w-full h-auto rounded-lg"
            />
          </div>
          {/* Modal / Popup Fullscreen */}
          {isFullscreen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setIsFullscreen(false)} // Klik di luar area untuk menutup
            >
              <div
                className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-2xl bg-white p-2"
                onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat gambar diklik
              >
                {/* Tombol Tutup (X) */}
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Gambar Full Resolution */}
                <img
                  src="/struktur-organisasi-desa.jpeg"
                  alt="Struktur Organisasi Desa Mekarjaya Full"
                  className="h-auto max-h-[85vh] w-auto rounded-xl object-contain mx-auto"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
