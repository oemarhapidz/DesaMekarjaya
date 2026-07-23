"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Archive, Clipboard, Map, RefreshCw, Trash2, Truck } from "react-feather";
import { mockPetaLokasi, jenisConfig, PetaLokasiData, JenisLokasiIcon } from "./mockData";

// Import peta secara dinamis dengan ssr: false
// Wajib karena Leaflet bergantung pada objek 'window' browser, tidak tersedia di server
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center space-y-3">
        <Map className="mx-auto animate-pulse text-green-700" size={40} aria-hidden="true" />
        <p className="text-sm text-gray-500 font-medium">Memuat peta interaktif...</p>
      </div>
    </div>
  ),
});

// Tipe filter yang bisa di-toggle
type JenisLokasi = PetaLokasiData["jenis"];
const SEMUA_JENIS: JenisLokasi[] = ["tempat_sampah", "pemilahan_sampah", "tps", "tpa"];
const lokasiIconMap: Record<JenisLokasiIcon, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>> = {
  trash: Trash2,
  refresh: RefreshCw,
  truck: Truck,
  home: Archive,
};

function LokasiIcon({ icon, size = 14, className = "" }: { icon: JenisLokasiIcon; size?: number; className?: string }) {
  const Icon = lokasiIconMap[icon];
  return <Icon size={size} className={className} aria-hidden={true} />;
}

export default function PetaDesaPage() {
  // TODO: ganti mockData dengan query Supabase ke tabel peta_lokasi_sampah
  // Contoh integrasi nanti:
  // const [lokasiList, setLokasiList] = useState<PetaLokasiData[]>([]);
  // useEffect(() => {
  //   const fetch = async () => {
  //     const { data } = await supabase.from('peta_lokasi_sampah').select('*');
  //     if (data) setLokasiList(data);
  //   };
  //   fetch();
  // }, []);

  const dataSumber = mockPetaLokasi;

  // State filter checkbox per jenis lokasi
  const [filterAktif, setFilterAktif] = useState<Set<JenisLokasi>>(
    new Set(SEMUA_JENIS)
  );

  // Toggle satu jenis filter
  const toggleFilter = (jenis: JenisLokasi) => {
    setFilterAktif((prev) => {
      const next = new Set(prev);
      if (next.has(jenis)) {
        next.delete(jenis);
      } else {
        next.add(jenis);
      }
      return next;
    });
  };

  // Data marker yang ditampilkan di peta sesuai filter
  const lokasiTampil = useMemo(
    () => dataSumber.filter((item) => filterAktif.has(item.jenis)),
    [dataSumber, filterAktif]
  );

  // Hitung jumlah per jenis dari seluruh data
  const jumlahPerJenis = useMemo(() => {
    const hitungan: Record<JenisLokasi, number> = {
      tempat_sampah: 0,
      pemilahan_sampah: 0,
      tps: 0,
      tpa: 0,
    };
    dataSumber.forEach((item) => {
      hitungan[item.jenis]++;
    });
    return hitungan;
  }, [dataSumber]);

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
            <span>Peta Desa</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Peta Fasilitas Pengelolaan Sampah
          </h1>
          <p className="text-green-100 text-sm md:text-base max-w-2xl leading-relaxed">
            Temukan lokasi Tempat Sampah, Bank Sampah, Tempat Penampungan Sementara (TPS), dan Tempat Pemrosesan Akhir (TPA) di wilayah Desa Mekarjaya, Kecamatan Purwasari, Kabupaten Karawang secara interaktif.
          </p>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <main className="max-w-6xl mx-auto px-6 -mt-6 space-y-6">

        {/* PANEL KONTROL: FILTER + STATISTIK */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Label dan info */}
            <div className="flex-shrink-0">
              <h2 className="text-base font-bold text-gray-900">Filter Tampilkan Lokasi</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Aktif: {lokasiTampil.length} dari {dataSumber.length} titik lokasi
              </p>
            </div>

            {/* Checkbox Filter per Jenis */}
            <div className="flex flex-wrap gap-3 flex-1">
              {SEMUA_JENIS.map((jenis) => {
                const cfg = jenisConfig[jenis];
                const aktif = filterAktif.has(jenis);
                return (
                  <button
                    key={jenis}
                    onClick={() => toggleFilter(jenis)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-semibold transition-all duration-150 ${
                      aktif
                        ? "border-current shadow-sm"
                        : "border-gray-200 bg-gray-50 text-gray-400 opacity-60"
                    }`}
                    style={
                      aktif
                        ? {
                            backgroundColor: cfg.bgColor,
                            borderColor: cfg.color,
                            color: cfg.textColor,
                          }
                        : {}
                    }
                  >
                    {/* Kotak indikator warna */}
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: aktif ? cfg.color : "#d1d5db" }}
                    ></span>
                    <span className="inline-flex items-center gap-1.5">
                      <LokasiIcon icon={cfg.icon} size={13} />
                      {cfg.label}
                    </span>
                    {/* Counter */}
                    <span
                      className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-black"
                      style={
                        aktif
                          ? { backgroundColor: cfg.color, color: "white" }
                          : { backgroundColor: "#e5e7eb", color: "#9ca3af" }
                      }
                    >
                      {jumlahPerJenis[jenis]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tombol Select All / Clear All */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setFilterAktif(new Set(SEMUA_JENIS))}
                className="text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition border border-green-100"
              >
                Semua
              </button>
              <button
                onClick={() => setFilterAktif(new Set())}
                className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition"
              >
                Kosongkan
              </button>
            </div>
          </div>
        </div>

        {/* GRID PETA + LEGENDA */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* PETA INTERAKTIF (3/4 lebar) */}
          <div
            className="lg:col-span-3 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            style={{ height: "540px" }}
          >
            {lokasiTampil.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-3 p-8">
                  <Map className="mx-auto text-gray-400" size={48} aria-hidden="true" />
                  <h3 className="text-lg font-bold text-gray-700">Tidak ada lokasi ditampilkan</h3>
                  <p className="text-sm text-gray-400">
                    Aktifkan minimal satu jenis lokasi dari filter di atas.
                  </p>
                </div>
              </div>
            ) : (
              <MapComponent lokasi={lokasiTampil} />
            )}
          </div>

          {/* PANEL SAMPING: LEGENDA + DAFTAR (1/4 lebar) */}
          <div className="lg:col-span-1 space-y-4">

            {/* LEGENDA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                <Archive size={16} className="text-green-700" aria-hidden="true" />
                Keterangan Ikon
              </h3>
              <div className="space-y-2">
                {SEMUA_JENIS.map((jenis) => {
                  const cfg = jenisConfig[jenis];
                  const aktif = filterAktif.has(jenis);
                  return (
                    <div
                      key={jenis}
                      className={`flex items-center gap-2 text-xs transition-opacity ${
                        aktif ? "opacity-100" : "opacity-35"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cfg.color }}
                      ></span>
                      <span className="text-gray-700 font-medium leading-tight">
                        <span className="inline-flex items-center gap-1.5">
                          <LokasiIcon icon={cfg.icon} size={12} />
                          {cfg.label}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DAFTAR LOKASI YANG AKTIF */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                <Clipboard size={16} className="text-green-700" aria-hidden="true" />
                Daftar Lokasi
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full">
                  {lokasiTampil.length}
                </span>
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {lokasiTampil.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    Tidak ada lokasi aktif
                  </p>
                ) : (
                  lokasiTampil.map((item) => {
                    const cfg = jenisConfig[item.jenis];
                    return (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl border transition"
                        style={{
                          backgroundColor: cfg.bgColor,
                          borderColor: cfg.borderColor,
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0"
                            style={{ backgroundColor: cfg.color }}
                          ></span>
                          <div className="min-w-0">
                            <p
                              className="text-xs font-bold leading-tight truncate"
                              style={{ color: cfg.textColor }}
                            >
                              {item.nama}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: cfg.color }}>
                              {cfg.label}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
                              {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* KARTU RINGKASAN STATISTIK */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SEMUA_JENIS.map((jenis) => {
            const cfg = jenisConfig[jenis];
            return (
              <div
                key={jenis}
                className="bg-white rounded-2xl shadow-sm border p-4 text-center transition hover:shadow-md"
                style={{ borderColor: cfg.borderColor }}
              >
                <LokasiIcon icon={cfg.icon} size={24} className="mx-auto mb-1" />
                <p
                  className="text-2xl font-black"
                  style={{ color: cfg.color }}
                >
                  {jumlahPerJenis[jenis]}
                </p>
                <p className="text-xs font-semibold text-gray-600 mt-0.5 leading-tight">
                  {cfg.label}
                </p>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
