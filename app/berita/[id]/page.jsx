// app/berita/[id]/page.jsx
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Camera } from "react-feather";

export default async function DetailBeritaPage({ params }) {
  // 1. Ambil ID berita dari URL parameter (wajib di-await di Next.js versi baru)
  const { id } = await params;

  // 2. Query ke Supabase untuk mengambil 1 data berita yang cocok dengan ID
  const { data: berita, error } = await supabase
    .from("berita")
    .select("*")
    .eq("id", id)
    .single();

  // 3. Jika berita tidak ditemukan atau ID ngawur, tampilkan halaman 404 bawaan Next.js yang rapi
  if (error || !berita) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Kontainer Utama */}
      <div className="max-w-3xl mx-auto px-6 pt-12 space-y-6">
        {/* Tombol Kembali */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-600 transition gap-1"
        >
          &larr; Kembali ke Beranda
        </Link>

        {/* Artikel Berita */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-4">
          {/* Kategori */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full">
              {berita.kategori}
            </span>
          </div>

          {/* Judul Utama */}
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
            {berita.judul}
          </h1>

          {/* Tanggal Rilis */}
          <p className="text-xs md:text-sm text-gray-400 border-b pb-4">
            Diterbitkan pada:{" "}
            <span className="font-medium text-gray-600">
              {new Date(berita.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              WIB
            </span>
          </p>

          {/* Placeholder Gambar Utama Berita */}
          <div className="w-full h-64 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200 shadow-inner">
            <span className="inline-flex items-center gap-2">
              <Camera size={18} aria-hidden="true" />
              Dokumentasi Kegiatan Desa
            </span>
          </div>

          {/* Isi Konten Berita */}
          <div className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line pt-4">
            {berita.isi}
          </div>
        </article>
      </div>
    </div>
  );
}
