"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { BarChart2, DollarSign, Loader, PieChart, ShoppingBag } from "react-feather";
import { supabase } from "@/lib/supabase"; // Import koneksi Supabase milikmu

// Tipe data disesuaikan dengan struktur tabel Supabase
export interface AnggaranData {
  id: number;
  tahun: number;
  kategori: string;
  jenis: "pendapatan" | "belanja" | "pembiayaan";
  anggaran: number;
  realisasi: number;
}

export default function TransparansiPage() {
  const [selectedTahun, setSelectedTahun] = useState<number>(2026);

  // State untuk menampung data asli dari Supabase & status loading
  const [dataSumber, setDataSumber] = useState<AnggaranData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetching data dari Supabase saat komponen dimuat
  useEffect(() => {
    const fetchAnggaran = async () => {
      setLoading(true);

      if (!supabase) {
        setDataSumber([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("transparansi_anggaran")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Gagal mengambil data anggaran:", error.message);
      } else if (data) {
        setDataSumber(data as AnggaranData[]);
      }
      setLoading(false);
    };

    fetchAnggaran();
  }, []);

  // Mendapatkan daftar tahun unik yang tersedia di data sumber untuk dropdown filter
  const daftarTahunAvailable = useMemo(() => {
    const tahunSet = new Set(dataSumber.map((item) => item.tahun));
    return Array.from(tahunSet).sort((a, b) => b - a);
  }, [dataSumber]);

  // Memfilter data berdasarkan tahun yang dipilih
  const dataTerfilter = useMemo(() => {
    return dataSumber.filter((item) => item.tahun === selectedTahun);
  }, [dataSumber, selectedTahun]);

  // Melakukan agregasi data (Total Pendapatan, Total Belanja, Sisa Anggaran)
  const ringkasan = useMemo(() => {
    let totalPendapatanAnggaran = 0;
    let totalPendapatanRealisasi = 0;
    let totalBelanjaAnggaran = 0;
    let totalBelanjaRealisasi = 0;
    let totalPembiayaanAnggaran = 0;
    let totalPembiayaanRealisasi = 0;

    dataTerfilter.forEach((item) => {
      if (item.jenis === "pendapatan") {
        totalPendapatanAnggaran += Number(item.anggaran);
        totalPendapatanRealisasi += Number(item.realisasi);
      } else if (item.jenis === "belanja") {
        totalBelanjaAnggaran += Number(item.anggaran);
        totalBelanjaRealisasi += Number(item.realisasi);
      } else if (item.jenis === "pembiayaan") {
        totalPembiayaanAnggaran += Number(item.anggaran);
        totalPembiayaanRealisasi += Number(item.realisasi);
      }
    });

    const sisaAnggaran =
      totalPendapatanRealisasi -
      totalBelanjaRealisasi -
      totalPembiayaanRealisasi;
    const sisaAnggaranRencana =
      totalPendapatanAnggaran - totalBelanjaAnggaran - totalPembiayaanAnggaran;

    return {
      totalPendapatanAnggaran,
      totalPendapatanRealisasi,
      totalBelanjaAnggaran,
      totalBelanjaRealisasi,
      totalPembiayaanAnggaran,
      totalPembiayaanRealisasi,
      sisaAnggaran,
      sisaAnggaranRencana,
    };
  }, [dataTerfilter]);

  // Format rupiah helper
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper persentase realisasi
  const hitungPersentase = (realisasi: number, anggaran: number) => {
    if (anggaran === 0) return 0;
    const persen = (realisasi / anggaran) * 100;
    return Math.min(100, Math.round(persen));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* HEADER HERO SECTION */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white py-16 px-6 shadow-md">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-green-200 text-xs font-bold uppercase tracking-wider">
            <Link href="/" className="hover:underline">
              Beranda
            </Link>
            <span>&rarr;</span>
            <span>Transparansi</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Transparansi Anggaran Desa Mekarjaya
          </h1>
          <p className="text-green-100 text-sm md:text-base max-w-2xl leading-relaxed">
            Wujud keterbukaan informasi tata kelola keuangan Anggaran Pendapatan
            dan Belanja Desa (APBDes) untuk mewujudkan Desa Mekarjaya yang
            bersih, akuntabel, dan maju.
          </p>
        </div>
      </section>

      {/* FILTER & RINGKASAN UTAMA */}
      <main className="max-w-6xl mx-auto px-6 -mt-8 space-y-8">
        {/* WIDGET FILTER TAHUN */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Filter Tahun Anggaran
            </h2>
            <p className="text-xs text-gray-400">
              Pilih tahun untuk melihat rincian realisasi anggaran.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="tahun-select"
              className="text-sm font-semibold text-gray-700"
            >
              Tahun:
            </label>
            <select
              id="tahun-select"
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(Number(e.target.value))}
              className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition"
            >
              {daftarTahunAvailable.length === 0 ? (
                <option value={2026}>2026</option>
              ) : (
                daftarTahunAvailable.map((thn) => (
                  <option key={thn} value={thn}>
                    Tahun {thn}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* SPINNER/STATE LOADING */}
        {loading ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
            <span className="inline-flex items-center justify-center gap-2">
              <Loader size={18} className="animate-spin" aria-hidden="true" />
              Memuat data anggaran dari database...
            </span>
          </div>
        ) : dataTerfilter.length === 0 ? (
          /* JIKA DATA KOSONG */
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
            <BarChart2 className="mx-auto text-gray-400" size={48} aria-hidden="true" />
            <h3 className="text-xl font-bold text-gray-900">
              Data Tidak Ditemukan
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Maaf, data transparansi anggaran untuk tahun{" "}
              <strong>{selectedTahun}</strong> belum tersedia atau belum
              diunggah oleh admin.
            </p>
            <button
              onClick={() => setSelectedTahun(2026)}
              className="inline-block bg-green-700 hover:bg-green-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition"
            >
              Kembali ke Tahun 2026
            </button>
          </div>
        ) : (
          <>
            {/* CARD METRIK RINGKASAN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CARD 1: PENDAPATAN */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
                    Pendapatan Desa
                  </span>
                  <DollarSign size={24} className="text-green-700" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900">
                    {formatRupiah(ringkasan.totalPendapatanRealisasi)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Anggaran: {formatRupiah(ringkasan.totalPendapatanAnggaran)}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">Realisasi</span>
                    <span className="text-green-700">
                      {hitungPersentase(
                        ringkasan.totalPendapatanRealisasi,
                        ringkasan.totalPendapatanAnggaran,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${hitungPersentase(
                          ringkasan.totalPendapatanRealisasi,
                          ringkasan.totalPendapatanAnggaran,
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* CARD 2: BELANJA */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                    Belanja Desa
                  </span>
                  <ShoppingBag size={24} className="text-amber-700" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900">
                    {formatRupiah(ringkasan.totalBelanjaRealisasi)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Anggaran: {formatRupiah(ringkasan.totalBelanjaAnggaran)}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">Realisasi</span>
                    <span className="text-amber-700">
                      {hitungPersentase(
                        ringkasan.totalBelanjaRealisasi,
                        ringkasan.totalBelanjaAnggaran,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${hitungPersentase(
                          ringkasan.totalBelanjaRealisasi,
                          ringkasan.totalBelanjaAnggaran,
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* CARD 3: SELISIH / SILPA */}
              <div
                className={`p-6 rounded-2xl shadow-sm border space-y-4 ${
                  ringkasan.sisaAnggaran >= 0
                    ? "bg-green-50/50 border-green-100 text-green-950"
                    : "bg-red-50/50 border-red-100 text-red-950"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      ringkasan.sisaAnggaran >= 0
                        ? "text-green-700 bg-green-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {ringkasan.sisaAnggaran >= 0
                      ? "Surplus Anggaran"
                      : "Defisit Anggaran"}
                  </span>
                  <PieChart
                    size={24}
                    className={
                      ringkasan.sisaAnggaran >= 0
                        ? "text-green-700"
                        : "text-red-700"
                    }
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p
                    className={`text-2xl font-black ${
                      ringkasan.sisaAnggaran >= 0
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {formatRupiah(Math.abs(ringkasan.sisaAnggaran))}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Rencana Surplus:{" "}
                    {formatRupiah(ringkasan.sisaAnggaranRencana)}
                  </p>
                </div>
                <div className="text-xs leading-relaxed text-gray-500 pt-2 border-t border-gray-200/50">
                  {ringkasan.sisaAnggaran >= 0
                    ? "Terdapat sisa anggaran lebih yang dapat dialokasikan untuk pembiayaan pembangunan periode berikutnya."
                    : "Belanja melebihi realisasi pendapatan. Defisit ditutup melalui penerimaan pembiayaan desa."}
                </div>
              </div>
            </div>

            {/* VISUALISASI PROGRES PER KATEGORI */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Perbandingan Realisasi Per Pos Anggaran
                </h3>
                <p className="text-sm text-gray-500">
                  Visualisasi komparatif penyerapan anggaran per kategori
                  kegiatan.
                </p>
              </div>

              <div className="space-y-6">
                {dataTerfilter.map((item) => {
                  const persen = hitungPersentase(
                    item.realisasi,
                    item.anggaran,
                  );

                  let barColor = "bg-green-600";
                  let bgTagColor =
                    "text-green-700 bg-green-50 border-green-100";
                  if (item.jenis === "belanja") {
                    barColor = "bg-amber-500";
                    bgTagColor = "text-amber-700 bg-amber-50 border-amber-100";
                  } else if (item.jenis === "pembiayaan") {
                    barColor = "bg-blue-500";
                    bgTagColor = "text-blue-700 bg-blue-50 border-blue-100";
                  }

                  return (
                    <div
                      key={item.id}
                      className="space-y-2 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${bgTagColor}`}
                          >
                            {item.jenis}
                          </span>
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                            {item.kategori}
                          </h4>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-gray-800">
                          {formatRupiah(item.realisasi)}{" "}
                          <span className="text-gray-400 font-normal">
                            dari
                          </span>{" "}
                          {formatRupiah(item.anggaran)}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex-grow h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                            style={{ width: `${persen}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-black text-gray-900 w-8 text-right">
                          {persen}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TABEL RINCIAN DETAIL DATA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-white">
                <h3 className="text-lg font-bold text-gray-900">
                  Rincian Lembar APBDes Tahun {selectedTahun}
                </h3>
                <p className="text-xs text-gray-400">
                  Tabel data pos anggaran pendapatan, belanja, dan pembiayaan
                  desa.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      <th className="px-6 py-4">Kategori Pos Anggaran</th>
                      <th className="px-6 py-4">Jenis</th>
                      <th className="px-6 py-4 text-right">
                        Anggaran (Rencana)
                      </th>
                      <th className="px-6 py-4 text-right">
                        Realisasi (Aktual)
                      </th>
                      <th className="px-6 py-4 text-right">Selisih</th>
                      <th className="px-6 py-4 text-center">Persentase</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {dataTerfilter.map((item) => {
                      const selisih = item.anggaran - item.realisasi;
                      const persen = hitungPersentase(
                        item.realisasi,
                        item.anggaran,
                      );

                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50/50 transition"
                        >
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {item.kategori}
                          </td>
                          <td className="px-6 py-4 capitalize">
                            <span
                              className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
                                item.jenis === "pendapatan"
                                  ? "bg-green-50 text-green-700"
                                  : item.jenis === "belanja"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {item.jenis}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-gray-900">
                            {formatRupiah(item.anggaran)}
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-gray-900">
                            {formatRupiah(item.realisasi)}
                          </td>
                          <td
                            className={`px-6 py-4 text-right font-semibold ${
                              selisih === 0
                                ? "text-gray-400"
                                : selisih > 0
                                  ? "text-amber-600"
                                  : "text-green-600"
                            }`}
                          >
                            {selisih === 0 ? "-" : formatRupiah(selisih)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-block text-xs font-black px-2 py-0.5 rounded ${
                                persen === 100
                                  ? "bg-green-100 text-green-800"
                                  : persen >= 50
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {persen}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
