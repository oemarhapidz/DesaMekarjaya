"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Plus, Trash2, ExternalLink } from "feather-icons-react";

export default function KelolaBeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // 1. Fetch seluruh berita dari Supabase
  const fetchBerita = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data berita:", error.message);
    } else {
      setBeritaList(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  // 2. Logika Hapus Berita
  const handleHapusBerita = async (id, judul) => {
    const konfirmasi = confirm(
      `Apakah Anda yakin ingin menghapus berita:\n"${judul}"?`,
    );
    if (!konfirmasi) return;

    setDeletingId(id);

    const { error } = await supabase.from("berita").delete().eq("id", id);

    setDeletingId(null);

    if (error) {
      alert("Gagal menghapus berita: " + error.message);
    } else {
      alert("Berita berhasil dihapus!");
      // Filter state lokal agar UI langsung update tanpa reload
      setBeritaList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Management Berita */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manajemen Berita Desa
            </h1>
            <p className="text-xs text-gray-500">
              Kelola dan hapus publikasi berita desa yang tampil di halaman
              depan.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-xl transition"
            >
              <ArrowLeft size={14} /> Kembali
            </Link>
            <Link
              href="/admin/dashboard/tambah-berita"
              className="inline-flex items-center gap-1.5 text-xs bg-green-700 hover:bg-green-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
            >
              <Plus size={16} /> Tambah Berita Baru
            </Link>
          </div>
        </div>

        {/* Tabel / Daftar Berita */}
        {loading ? (
          <div className="bg-white p-12 text-center text-sm text-gray-400 rounded-2xl border border-gray-100">
            Memuat daftar berita...
          </div>
        ) : beritaList.length === 0 ? (
          <div className="bg-white p-12 text-center text-sm text-gray-500 rounded-2xl border border-gray-100">
            Belum ada berita yang diterbitkan.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Berita</th>
                    <th className="py-4 px-6">Kategori</th>
                    <th className="py-4 px-6">Tanggal Rilis</th>
                    <th className="py-4 px-6 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {beritaList.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 transition"
                    >
                      {/* Column 1: Info & Sampul */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          {item.gambar ? (
                            <img
                              src={item.gambar}
                              alt={item.judul}
                              className="h-12 w-16 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                            />
                          ) : (
                            <div className="h-12 w-16 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-semibold flex-shrink-0">
                              No Image
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-gray-900 line-clamp-1">
                              {item.judul}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                              {item.isi}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Kategori */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 uppercase">
                          {item.kategori || "Umum"}
                        </span>
                      </td>

                      {/* Column 3: Tanggal */}
                      <td className="py-4 px-6 whitespace-nowrap text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Column 4: Tombol Hapus & Detail */}
                      <td className="py-4 px-6 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/berita/${item.id}`}
                            target="_blank"
                            className="p-2 text-gray-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition"
                            title="Lihat Berita"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          <button
                            onClick={() =>
                              handleHapusBerita(item.id, item.judul)
                            }
                            disabled={deletingId === item.id}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50 cursor-pointer"
                            title="Hapus Berita"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
