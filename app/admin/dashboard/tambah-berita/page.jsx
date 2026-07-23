import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { Send } from "feather-icons-react";

export default function TambahBeritaPage() {
  // Logika menyimpan berita + upload gambar ke Supabase
  async function handleTambahBerita(formData) {
    "use server"; // Berjalan di sisi server

    const judul = formData.get("judul");
    const kategori = formData.get("kategori");
    const isi = formData.get("isi");
    const sampulFile = formData.get("sampul"); // Mengambil file dari input

    // Validasi sederhana agar data teks tidak kosong
    if (!judul || !kategori || !isi) return;

    let imageUrl = null;

    // Logika Upload Gambar ke Supabase Storage (jika file diunggah)
    if (sampulFile && sampulFile.size > 0) {
      const fileExt = sampulFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;

      // 1. Upload ke Storage Bucket 'berita_sampul'
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("berita_sampul")
        .upload(fileName, sampulFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Gagal mengunggah gambar sampul:", uploadError.message);
        return;
      }

      // 2. Dapatkan URL Publik Gambar
      const { data: publicUrlData } = supabase.storage
        .from("berita_sampul")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // 3. Masukkan data berita + URL Gambar ke tabel 'berita'
    const { error } = await supabase.from("berita").insert([
      {
        judul: judul,
        kategori: kategori,
        isi: isi,
        gambar: imageUrl, // Kolom 'gambar' di database
      },
    ]);

    if (error) {
      console.error("Gagal menambah berita:", error.message);
      return;
    }

    // Jika sukses, redirect kembali ke dashboard
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

          {/* 3. Input Sampul Gambar Berita */}
          <div className="space-y-1">
            <label
              htmlFor="sampul"
              className="block text-sm font-semibold text-gray-700"
            >
              Sampul Berita{" "}
              <span className="text-gray-400 font-normal">(Opsional)</span>
            </label>
            <input
              type="file"
              id="sampul"
              name="sampul"
              accept="image/*"
              className="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition cursor-pointer"
            />
          </div>

          {/* 4. Input Isi Berita */}
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
              rows={6}
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
