"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function InputAnggaranPage() {
  const [tahun, setTahun] = useState(2026);
  const [kategori, setKategori] = useState("");
  const [jenis, setJenis] = useState("pendapatan");
  const [anggaran, setAnggaran] = useState("");
  const [realisasi, setRealisasi] = useState("");

  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState({ tipe: "", teks: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPesan({ tipe: "", teks: "" });

    try {
      // Direct insert ke tabel Supabase
      const { error } = await supabase.from("transparansi_anggaran").insert([
        {
          tahun: Number(tahun),
          kategori: kategori.trim(),
          jenis,
          anggaran: Number(anggaran) || 0,
          realisasi: Number(realisasi) || 0,
        },
      ]);

      if (error) throw error;

      setPesan({
        tipe: "sukses",
        teks: "Berhasil menambahkan data anggaran baru!",
      });

      // Reset form
      setKategori("");
      setAnggaran("");
      setRealisasi("");
    } catch (err) {
      setPesan({
        tipe: "gagal",
        teks: `Gagal menyimpan data: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Tambah Data Anggaran (APBDes)
            </h1>
            <p className="text-xs text-gray-500">
              Masukkan perincian pos anggaran dan realisasinya.
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-xs text-gray-600 hover:text-gray-900 font-semibold underline"
          >
            &larr; Kembali
          </Link>
        </div>

        {/* Notifikasi Pesan */}
        {pesan.teks && (
          <div
            className={`p-4 rounded-xl text-sm font-medium ${
              pesan.tipe === "sukses"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {pesan.teks}
          </div>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Tahun & Jenis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Tahun Anggaran
              </label>
              <input
                type="number"
                required
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Jenis Anggaran
              </label>
              <select
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none"
              >
                <option value="pendapatan">Pendapatan</option>
                <option value="belanja">Belanja</option>
                <option value="pembiayaan">Pembiayaan</option>
              </select>
            </div>
          </div>

          {/* Nama Kategori Pos */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Kategori Pos Anggaran
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Bidang Pembangunan Desa / Dana Desa"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none"
            />
          </div>

          {/* Nominal Anggaran & Realisasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Pagu Anggaran (Rp)
              </label>
              <input
                type="number"
                min="0"
                required
                placeholder="0"
                value={anggaran}
                onChange={(e) => setAnggaran(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Realisasi Saat Ini (Rp)
              </label>
              <input
                type="number"
                min="0"
                required
                placeholder="0"
                value={realisasi}
                onChange={(e) => setRealisasi(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition shadow-sm disabled:opacity-50 mt-4"
          >
            {loading ? "Menyimpan Data..." : "Simpan Anggaran"}
          </button>
        </form>
      </div>
    </div>
  );
}
