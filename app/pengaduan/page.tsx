"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockPengaduan, PengaduanData } from "./mockData";

export default function PengaduanPage() {
  // State untuk daftar aduan (diinisialisasi dengan data mock)
  const [pengaduanList, setPengaduanList] = useState<PengaduanData[]>(mockPengaduan);

  // State untuk form input
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // State untuk feedback interaksi
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle perubahan file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Batasi ukuran file maksimal 2MB
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("Ukuran file terlalu besar! Maksimal 2MB.");
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      setErrorMessage(null);
      setImageFile(file);

      // Membuat preview menggunakan FileReader native browser
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle pengiriman aduan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validasi input wajib
    if (!judul || !kategori || !deskripsi) {
      setErrorMessage("Judul, Kategori, dan Deskripsi wajib diisi.");
      return;
    }

    // TODO: ganti mock submit dengan Server Action yang insert ke tabel pengaduan + upload ke Supabase Storage bucket pengaduan_lampiran
    // Simulasi logic backend di sisi client:
    const aduanBaru: PengaduanData = {
      id: pengaduanList.length + 1,
      nama_pelapor: nama.trim() ? nama : null, // Set null jika nama dikosongkan (anonim)
      nik: nik.trim() ? nik : null, // Set null jika NIK dikosongkan (anonim)
      judul: judul,
      deskripsi: deskripsi,
      kategori: kategori,
      lampiran_url: imagePreview, // Menggunakan Base64 preview sebagai mock URL gambar
      status: "pending",
      tanggapan_admin: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Update state daftar aduan lokal
    setPengaduanList([aduanBaru, ...pengaduanList]);

    // Reset Form
    setNama("");
    setNik("");
    setJudul("");
    setKategori("");
    setDeskripsi("");
    setImageFile(null);
    setImagePreview(null);

    // Tampilkan pesan sukses
    setSuccessMessage("Pengaduan Anda berhasil dikirim! Petugas kami akan segera memproses laporan Anda.");
    
    // Auto hilangkan pesan sukses setelah 5 detik
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  // Format tanggal helper
  const formatTanggal = (dateStr: string) => {
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
            Laporkan masalah fasilitas umum, keamanan, kebersihan, atau layanan publik di lingkungan Anda secara langsung. Laporan Anda dipantau langsung oleh aparatur desa.
          </p>
        </div>
      </section>

      {/* GRID KONTEN UTAMA */}
      <main className="max-w-6xl mx-auto px-6 -mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KOLOM KIRI: FORM PENGADUAN (5 KELAS GRID) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>✍️</span> Buat Laporan Pengaduan
            </h2>
            <p className="text-xs text-gray-400">Isi formulir di bawah ini dengan menyertakan detail masalah.</p>
          </div>

          {/* Notifikasi feedback */}
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
            
            {/* Input Nama (Opsional) */}
            <div className="space-y-1">
              <label htmlFor="nama-input" className="block text-xs font-bold text-gray-700 uppercase">
                Nama Pelapor <span className="text-gray-400 font-normal lowercase">(opsional)</span>
              </label>
              <input
                id="nama-input"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Biarkan kosong jika ingin anonim"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
              />
            </div>

            {/* Input NIK (Opsional) */}
            <div className="space-y-1">
              <label htmlFor="nik-input" className="block text-xs font-bold text-gray-700 uppercase">
                NIK (Nomor Induk Kependudukan) <span className="text-gray-400 font-normal lowercase">(opsional untuk privasi)</span>
              </label>
              <input
                id="nik-input"
                type="text"
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                placeholder="16 Digit Angka NIK Anda"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
              />
              <p className="text-[10px] text-gray-400">NIK Anda digunakan verifikasi internal desa dan tidak akan dipublikasikan.</p>
            </div>

            {/* Input Judul */}
            <div className="space-y-1">
              <label htmlFor="judul-input" className="block text-xs font-bold text-gray-700 uppercase">
                Judul Laporan <span className="text-red-500">*</span>
              </label>
              <input
                id="judul-input"
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Saluran Air Dusun III Mampet"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
                required
              />
            </div>

            {/* Pilihan Kategori */}
            <div className="space-y-1">
              <label htmlFor="kategori-select" className="block text-xs font-bold text-gray-700 uppercase">
                Kategori Masalah <span className="text-red-500">*</span>
              </label>
              <select
                id="kategori-select"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
                required
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Fasilitas Umum">Fasilitas Umum</option>
                <option value="Kebersihan & Lingkungan">Kebersihan & Lingkungan</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Layanan Publik">Layanan Publik</option>
                <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Input Deskripsi */}
            <div className="space-y-1">
              <label htmlFor="deskripsi-input" className="block text-xs font-bold text-gray-700 uppercase">
                Deskripsi Detail Pengaduan <span className="text-red-500">*</span>
              </label>
              <textarea
                id="deskripsi-input"
                rows={4}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Tuliskan secara lengkap lokasi, kapan terjadi, serta kronologi kendalanya..."
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
                required
              ></textarea>
            </div>

            {/* Upload File / Lampiran Gambar */}
            <div className="space-y-1">
              <label htmlFor="file-upload" className="block text-xs font-bold text-gray-700 uppercase">
                Lampiran Foto Bukti <span className="text-gray-400 font-normal lowercase">(opsional, maks 2MB)</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
              />
              
              {/* Preview Gambar Client-Side */}
              {imagePreview && (
                <div className="mt-3 relative border border-gray-100 rounded-xl overflow-hidden h-32 w-full max-w-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview Laporan"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 text-[10px] w-5 h-5 flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-green-600 shadow-md shadow-green-700/10 transition duration-150 text-sm mt-2"
            >
              🚀 Kirim Pengaduan Warga
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: LIST PENGADUAN PUBLIK (7 KELAS GRID) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📋</span> Laporan Pengaduan Terbaru
            </h2>
            <p className="text-xs text-gray-400">Daftar keluhan warga yang sedang dan telah ditindaklanjuti oleh desa.</p>
          </div>

          {/* JIKA LIST KOSONG */}
          {pengaduanList.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
              <div className="text-5xl">📭</div>
              <h3 className="text-xl font-bold text-gray-900">Belum Ada Pengaduan</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Terima kasih, lingkungan kita aman kondusif! Belum ada laporan keluhan warga yang masuk.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {pengaduanList.map((item) => {
                // Menentukan warna badge status
                let badgeColor = "bg-yellow-50 text-yellow-700 border-yellow-100";
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
                    {/* Header Laporan */}
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-gray-50 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 mr-2 uppercase">
                          {item.kategori}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${badgeColor}`}>
                          {item.status}
                        </span>
                        <h3 className="font-bold text-base text-gray-900 mt-2 leading-tight">
                          {item.judul}
                        </h3>
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium text-right sm:text-left">
                        {formatTanggal(item.created_at)}
                      </div>
                    </div>

                    {/* Konten Detail Aduan */}
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.deskripsi}
                      </p>

                      {/* Lampiran Gambar */}
                      {item.lampiran_url && (
                        <div className="border border-gray-100 rounded-xl overflow-hidden max-h-48 max-w-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.lampiran_url}
                            alt="Bukti Lampiran Laporan"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>

                    {/* Info Pelapor (NIK DISENYAPKAN, NAMA AMAN) */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2.5 rounded-xl border border-gray-100/50">
                      <span>👤 Pelapor: <strong>{item.nama_pelapor || "Anonim"}</strong></span>
                      <span className="text-gray-300">|</span>
                      <span>Privasi: <strong className="text-green-600">Terlindungi (NIK Tersembunyi)</strong></span>
                    </div>

                    {/* Tanggapan Admin (jika ada) */}
                    {item.tanggapan_admin && (
                      <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl space-y-1.5">
                        <div className="flex items-center gap-1 text-xs font-bold text-green-800">
                          <span>💬</span>
                          <span>Tanggapan Aparatur Desa:</span>
                        </div>
                        <p className="text-xs text-green-900 leading-relaxed">
                          {item.tanggapan_admin}
                        </p>
                        <div className="text-[9px] text-green-600 font-semibold text-right">
                          Diperbarui pada: {formatTanggal(item.updated_at)}
                        </div>
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
