// src/app/berita/page.jsx
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function BeritaPage() {
  // Ambil data berita dari Supabase
  const { data: daftarBerita, error } = await supabase
    .from("berita")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching berita:", error);
    return <p className="text-red-500">Error loading news.</p>;
  }

  return (
    <div className="p-8 bg-amber-50 min-h-screen">
      <h1 className="text-gray-500 text-3xl font-bold">Berita Terbaru</h1>
      <p className="text-gray-600 mt-2">
        Berikut adalah berita terbaru dari desa kami.
      </p>
      {/* Daftar Berita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {daftarBerita.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada berita terbaru.</p>
        ) : (
          daftarBerita.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Placeholder Gambar */}
                <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400">
                  📷 No Image
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    {item.kategori}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-green-700 transition">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.isi}
                  </p>
                </div>
              </div>
              {/* Tombol Baca Selengkapnya */}
              <div className="px-5 pb-5 pt-2">
                <Link
                  href={`/berita/${item.id}`}
                  className="text-xs font-bold text-green-700 hover:text-green-600 transition"
                >
                  Baca Selengkapnya &rarr;
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
