// app/admin/dashboard/tambah-berita/page.jsx
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { Send } from "react-feather";

export default function TambahBeritaPage() {
  // Logika menyimpan berita langsung ke Supabase
  async function handleTambahBerita(formData) {
    "use server"; // Berjalan di sisi server

    const judul = formData.get("judul");
    const kategori = formData.get("kategori");
    const isi = formData.get("isi");

    // Validasi sederhana agar data tidak kosong
    if (!judul || !kategori || !isi) return;

    // Masukkan data ke tabel 'berita' di Supabase
    const { error } = await supabase.from("berita").insert([
      {
        judul: judul,
        kategori: kategori,
        isi: isi,
      },
    ]);

    if (error) {
      console.error("Gagal menambah berita:", error);
      return;
    }

    // Jika sukses memasukkan data, lempar admin kembali ke dashboard utama
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Header Form */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tulis Berita Desa
            </h1>
            <p className="text-sm text-gray-500">
              Isi formulir di bawah untuk menerbitkan berita terbaru.
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-3 py-2 rounded-lg transition"
          >
            Batal
          </Link>
        </div>

        {/* Form Input Berita */}
        <form action={handleTambahBerita} className="space-y-5">
          {/* 1. Input Judul */}
          <div className="space-y-1">
            <label
              htmlFor="judul"
              className="block text-sm font-semibold text-gray-700"
            >
              Judul Berita
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              placeholder="Contoh: Kerja Bakti Perbaikan Saluran Air Dusun II"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm transition"
              required
            />
          </div>

          {/* 2. Pilihan Kategori */}
          <div className="space-y-1">
            <label
              htmlFor="kategori"
              className="block text-sm font-semibold text-gray-700"
            >
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm transition"
              required
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="Kegiatan Desa">Kegiatan Desa</option>
              <option value="Pembangunan">Pembangunan</option>
              <option value="Pengumuman">Pengumuman</option>
              <option value="Kesehatan">Kesehatan</option>
            </select>
          </div>

          {/* 3. Input Isi Berita */}
          <div className="space-y-1">
            <label
              htmlFor="isi"
              className="block text-sm font-semibold text-gray-700"
            >
              Isi Berita
            </label>
            <textarea
              id="isi"
              name="isi"
              rows="6"
              placeholder="Tuliskan detail berita atau laporan kegiatan di sini..."
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm transition"
              required
            ></textarea>
          </div>

          {/* Tombol Terbitkan */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-green-600 shadow-md transition duration-150 inline-flex items-center justify-center gap-2"
            >
              <Send size={16} aria-hidden="true" />
              Terbitkan Berita Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
