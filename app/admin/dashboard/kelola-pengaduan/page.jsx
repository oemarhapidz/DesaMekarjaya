"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Check,
  RefreshCw,
  Trash2,
} from "feather-icons-react";

export default function KelolaPengaduanPage() {
  const [pengaduanList, setPengaduanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("");
  const [tanggapan, setTanggapan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch daftar pengaduan dari Supabase
  const fetchPengaduan = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pengaduan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data pengaduan:", error.message);
    } else {
      setPengaduanList(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPengaduan();
  }, []);

  // Buka modal / form tanggapan
  const handleOpenProcess = (item) => {
    setSelectedId(item.id);
    setStatus(item.status || "diproses");
    setTanggapan(item.tanggapan_admin || "");
  };

  // Simpan perubahan status & tanggapan admin (ACC Pengaduan)
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedId) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from("pengaduan")
      .update({
        status: status,
        tanggapan_admin: tanggapan.trim() ? tanggapan : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selectedId);

    setIsSubmitting(false);

    if (error) {
      alert("Gagal memperbarui status: " + error.message);
    } else {
      alert("Status pengaduan berhasil diperbarui!");
      setSelectedId(null);
      fetchPengaduan(); // Refresh data
    }
  };

  // Logika Hapus Pengaduan (Foto di Storage + Data di Tabel)
  const handleHapusPengaduan = async (item) => {
    const konfirmasi = confirm(
      `Apakah Anda yakin ingin menghapus pengaduan dari "${item.nama_pelapor || "Anonim"}"?`,
    );
    if (!konfirmasi) return;

    try {
      // 1. Jika ada foto lampiran, hapus dulu file gambar di Supabase Storage
      if (item.lampiran_url) {
        // Ambil nama file dari URL lampiran
        const namaFile = item.lampiran_url.split("/").pop();

        if (namaFile) {
          const { error: storageError } = await supabase.storage
            .from("pengaduan_lampiran") // Pastikan nama bucket sesuai dengan milikmu
            .remove([namaFile]);

          if (storageError) {
            console.error(
              "Gagal menghapus gambar dari storage:",
              storageError.message,
            );
          }
        }
      }

      // 2. Hapus data pengaduan dari database
      const { error: dbError } = await supabase
        .from("pengaduan")
        .delete()
        .eq("id", item.id);

      if (dbError) {
        alert("Gagal menghapus data pengaduan: " + dbError.message);
      } else {
        alert("Pengaduan beserta fotonya berhasil dihapus!");
        // Update state agar UI langsung ter-update tanpa perlu reload
        setPengaduanList((prev) => prev.filter((p) => p.id !== item.id));
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Kelola Pengaduan Warga
            </h1>
            <p className="text-xs text-gray-500">
              Tindak lanjuti, beri tanggapan, dan ubah status laporan dari warga
              desa.
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl transition"
          >
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </Link>
        </div>

        {/* Tabel / Daftar Pengaduan */}
        {loading ? (
          <div className="bg-white p-12 text-center text-sm text-gray-400 rounded-2xl border border-gray-100">
            Memuat pengaduan...
          </div>
        ) : pengaduanList.length === 0 ? (
          <div className="bg-white p-12 text-center text-sm text-gray-500 rounded-2xl border border-gray-100">
            Belum ada pengaduan warga yang masuk.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pengaduanList.map((item) => {
              let badgeColor =
                "bg-yellow-100 text-yellow-800 border-yellow-200";
              if (item.status === "diproses")
                badgeColor = "bg-blue-100 text-blue-800 border-blue-200";
              if (item.status === "selesai")
                badgeColor = "bg-green-100 text-green-800 border-green-200";

              return (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 border-b pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 uppercase mr-2">
                        {item.kategori}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase ${badgeColor}`}
                      >
                        {item.status}
                      </span>
                      <h3 className="font-bold text-lg text-gray-900 mt-2">
                        {item.judul}
                      </h3>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {item.deskripsi}
                  </p>

                  {/* Foto Bukti jika ada */}
                  {item.lampiran_url && (
                    <div>
                      <span className="text-xs font-semibold text-gray-500 block mb-1">
                        Foto Bukti:
                      </span>
                      <a
                        href={item.lampiran_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={item.lampiran_url}
                          alt="Foto Lampiran"
                          className="h-32 w-48 object-cover rounded-xl border hover:opacity-90 transition"
                        />
                      </a>
                    </div>
                  )}

                  {/* Pelapor Info */}
                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-wrap gap-4">
                    <span>
                      Pelapor: <strong>{item.nama_pelapor || "Anonim"}</strong>
                    </span>
                    <span>
                      NIK: <strong>{item.nik || "Tidak dicantumkan"}</strong>
                    </span>
                  </div>

                  {/* Tanggapan Admin Sebelumnya */}
                  {item.tanggapan_admin && (
                    <div className="bg-green-50 border border-green-100 p-4 rounded-xl space-y-1">
                      <span className="text-xs font-bold text-green-800 block">
                        💬 Tanggapan Desa:
                      </span>
                      <p className="text-xs text-green-900">
                        {item.tanggapan_admin}
                      </p>
                    </div>
                  )}

                  {/* Tombol Aksi ACC / Proses & Hapus */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleOpenProcess(item)}
                      className="text-xs bg-green-700 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle size={14} /> Proses / Tindak Lanjuti Laporan
                    </button>

                    <button
                      onClick={() => handleHapusPengaduan(item)}
                      className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-2 rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer border border-red-100"
                      title="Hapus Laporan & Foto"
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal / Form Edit Status & Tanggapan */}
        {selectedId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-gray-900">
                Tindak Lanjuti Pengaduan
              </h2>

              <form onSubmit={handleUpdateStatus} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Ubah Status Pengaduan
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full text-sm p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  >
                    <option value="pending">Pending (Menunggu)</option>
                    <option value="diproses">
                      Diproses (Sedang Ditangani)
                    </option>
                    <option value="selesai">Selesai (ACC / Teratasi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Tanggapan / Catatan Aparatur Desa
                  </label>
                  <textarea
                    rows={4}
                    value={tanggapan}
                    onChange={(e) => setTanggapan(e.target.value)}
                    placeholder="Contoh: Laporan telah diterima, petugas kebersihan desa sudah meluncur ke lokasi..."
                    className="w-full text-sm p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-xs font-bold text-white bg-green-700 hover:bg-green-600 rounded-xl transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
