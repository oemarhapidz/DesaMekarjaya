import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function BeritaPage() {
  // Ambil data berita dari Supabase
  const { data: daftarBerita, error } = await supabase
    .from("berita")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="-mt-24 min-h-screen bg-[#F8FAFC] pb-20">
      {/* 🚀 1. HERO HEADER HIJAU DENGAN LENGKUNGAN (WAVE) */}
      <section className="relative bg-[#0D5C3A] pt-36 pb-28 text-center text-white px-6">
        <div className="mx-auto max-w-3xl space-y-3 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Berita & Informasi Desa
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Dapatkan kabar terbaru, pengumuman resmi, dan ragam kegiatan seputar
            Desa Mekarjaya.
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

      {/* 🚀 2. KONTEN DAFTAR BERITA */}
      <section className="mx-auto max-w-6xl px-6 pt-6 space-y-8">
        {/* Subtitle & Judul Section */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-600">
            Kabar Terkini
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Berita Terbaru Desa
          </h2>
        </div>

        {/* Handling Error */}
        {error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
            Gagal memuat berita. Silakan coba beberapa saat lagi.
          </div>
        ) : !daftarBerita || daftarBerita.length === 0 ? (
          /* Handling Data Kosong */
          <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center text-slate-500 shadow-sm">
            Belum ada berita terbaru yang diterbitkan.
          </div>
        ) : (
          /* Grid Berita (3 Kolom Desktop, 2 Kolom Tablet, 1 Kolom Mobile) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {daftarBerita.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Gambar / Placeholder */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden flex items-center justify-center text-slate-400">
                    {item.gambar_url ? (
                      <img
                        src={item.gambar_url}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Isi Konten Berita */}
                  <div className="p-6 space-y-3">
                    {/* Badge Kategori & Tanggal */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        {item.kategori || "Umum"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Judul Berita */}
                    <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-600 transition line-clamp-2">
                      {item.judul}
                    </h3>

                    {/* Ringkasan/Isi Berita */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {item.isi}
                    </p>
                  </div>
                </div>

                {/* Tombol Baca Selengkapnya */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/berita/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
                  >
                    <span>Baca Selengkapnya</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 group-hover:translate-x-1 transition"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
