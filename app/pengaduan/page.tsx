"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clipboard,
  Edit3,
  Inbox,
  MessageCircle,
  Send,
  User,
  X,
} from "react-feather";
import { supabase } from "@/lib/supabase"; // Sesuaikan path import supabase kamu

// Tipe Data
export interface PengaduanData {
  id?: number;
  nama_pelapor: string | null;
  nik: string | null;
  judul: string;
  kategori: string;
  deskripsi: string;
  lampiran_url: string | null;
  status: string;
  tanggapan_admin: string | null;
  created_at?: string;
  updated_at?: string;
}

export default function PengaduanPage() {
  const [pengaduanList, setPengaduanList] = useState<PengaduanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Feedback States
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Ambil Data dari Supabase saat Halaman Dimuat
  const fetchPengaduan = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pengaduan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data:", error.message);
    } else {
      setPengaduanList(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPengaduan();
  }, []);

  // Handle Pilih File Gambar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("Ukuran file terlalu besar! Maksimal 2MB.");
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      setErrorMessage(null);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 2. Kirim Data ke Supabase saat Form Di-submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!judul || !kategori || !deskripsi) {
      setErrorMessage("Judul, Kategori, dan Deskripsi wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedImageUrl: string | null = null;

      // Upload Gambar ke Supabase Storage (jika ada file)
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("pengaduan_lampiran")
          .upload(fileName, imageFile);

        if (uploadError) {
          throw new Error("Gagal mengunggah foto lampiran.");
        }

        const { data: publicUrlData } = supabase.storage
          .from("pengaduan_lampiran")
          .getPublicUrl(fileName);

        uploadedImageUrl = publicUrlData.publicUrl;
      }

      // Insert Data ke Tabel Supabase 'pengaduan'
      const { error: insertError } = await supabase.from("pengaduan").insert([
        {
          nama_pelapor: nama.trim() ? nama : null,
          nik: nik.trim() ? nik : null,
          judul,
          kategori,
          deskripsi,
          lampiran_url: uploadedImageUrl,
          status: "pending",
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      // Reset Form & Tampilkan Pesan Sukses
      setNama("");
      setNik("");
      setJudul("");
      setKategori("");
      setDeskripsi("");
      setImageFile(null);
      setImagePreview(null);
      setSuccessMessage(
        "Pengaduan Anda berhasil dikirim dan tersimpan di database!",
      );

      // Refresh list agar data baru langsung muncul dari DB
      fetchPengaduan();

      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengirim laporan.";
      setErrorMessage(message || "Terjadi kesalahan saat mengirim laporan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format tanggal
  const formatTanggal = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* HEADER SECTION */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white py-16 px-6 shadow-md">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-green-200 text-xs font-bold uppercase tracking-wider">
            <Link href="/" className="hover:underline">
              Beranda
            </Link>
            <span>&rarr;</span>
            <span>Pengaduan Warga</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Sistem Layanan Pengaduan Warga
          </h1>
          <p className="text-green-100 text-sm md:text-base max-w-2xl leading-relaxed">
            Laporkan masalah fasilitas umum, keamanan, kebersihan, atau layanan
            publik di lingkungan Anda secara langsung.
          </p>
        </div>
      </section>

      {/* GRID KONTEN UTAMA */}
      <main className="max-w-6xl mx-auto px-6 -mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* KOLOM KIRI: FORM PENGADUAN */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Edit3 size={18} className="text-green-700" aria-hidden="true" />
              Buat Laporan Pengaduan
            </h2>
            <p className="text-xs text-gray-400">
              Isi formulir di bawah ini dengan menyertakan detail masalah.
            </p>
          </div>

          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-medium rounded-xl">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-medium rounded-xl">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Nama Pelapor{" "}
                <span className="text-gray-400 font-normal lowercase">
                  (opsional)
                </span>
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Biarkan kosong jika ingin anonim"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                NIK{" "}
                <span className="text-gray-400 font-normal lowercase">
                  (opsional untuk privasi)
                </span>
              </label>
              <input
                type="text"
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                placeholder="16 Digit Angka NIK Anda"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Judul Laporan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Saluran Air Dusun III Mampet"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Kategori Masalah <span className="text-red-500">*</span>
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
                required
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Kebersihan & Lingkungan">
                  Kebersihan & Lingkungan
                </option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Layanan Publik">Layanan Publik</option>
                <option value="Keamanan & Ketertiban">
                  Keamanan & Ketertiban
                </option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Deskripsi Detail Pengaduan{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Tuliskan secara lengkap lokasi, kapan terjadi, serta kronologi..."
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
                required
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Lampiran Foto Bukti{" "}
                <span className="text-gray-400 font-normal lowercase">
                  (opsional, maks 2MB)
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
              />

              {imagePreview && (
                <div className="mt-3 relative border border-gray-100 rounded-xl overflow-hidden h-32 w-full max-w-xs">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center transition"
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-green-600 shadow-md transition text-sm mt-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Mengirim Laporan..."
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  <Send size={16} aria-hidden="true" />
                  Kirim Pengaduan Warga
                </span>
              )}
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: LIST PENGADUAN DARI DATABASE */}
        <div className="lg:col-span-7 space-y-6 pt-15">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clipboard
                size={18}
                className="text-green-700"
                aria-hidden="true"
              />
              Laporan Pengaduan Terbaru
            </h2>
            <p className="text-xs text-gray-400">
              Daftar keluhan warga yang tersimpan di database desa.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-sm text-gray-400">
              Memuat data pengaduan...
            </div>
          ) : pengaduanList.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
              <Inbox
                className="mx-auto text-gray-400"
                size={48}
                aria-hidden="true"
              />
              <h3 className="text-xl font-bold text-gray-900">
                Belum Ada Pengaduan
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Belum ada laporan keluhan warga di database.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {pengaduanList.map((item) => {
                let badgeColor =
                  "bg-yellow-50 text-yellow-700 border-yellow-100";
                if (item.status === "diproses") {
                  badgeColor = "bg-blue-50 text-blue-700 border-blue-100";
                } else if (item.status === "selesai") {
                  badgeColor = "bg-green-50 text-green-700 border-green-100";
                }

                return (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-gray-50 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 mr-2 uppercase">
                          {item.kategori}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${badgeColor}`}
                        >
                          {item.status}
                        </span>
                        <h3 className="font-bold text-base text-gray-900 mt-2 leading-tight">
                          {item.judul}
                        </h3>
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">
                        {formatTanggal(item.created_at)}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.deskripsi}
                      </p>

                      {item.lampiran_url && (
                        <div className="border border-gray-100 rounded-xl overflow-hidden max-h-48 max-w-sm">
                          <img
                            src={item.lampiran_url}
                            alt="Bukti Lampiran Laporan"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2.5 rounded-xl border border-gray-100/50">
                      <User size={14} aria-hidden="true" />
                      <span>
                        Pelapor:{" "}
                        <strong>{item.nama_pelapor || "Anonim"}</strong>
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>
                        Privasi:{" "}
                        <strong className="text-green-600">
                          Terlindungi (NIK Tersembunyi)
                        </strong>
                      </span>
                    </div>

                    {item.tanggapan_admin && (
                      <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl space-y-1.5">
                        <div className="flex items-center gap-1 text-xs font-bold text-green-800">
                          <MessageCircle size={14} aria-hidden="true" />
                          <span>Tanggapan Aparatur Desa:</span>
                        </div>
                        <p className="text-xs text-green-900 leading-relaxed">
                          {item.tanggapan_admin}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
