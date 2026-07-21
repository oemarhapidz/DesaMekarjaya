// app/peta-desa/mockData.ts

export interface PetaLokasiData {
  id: number;
  nama: string;
  deskripsi: string | null;
  jenis: "tempat_sampah" | "pemilahan_sampah" | "tps" | "tpa";
  latitude: number;
  longitude: number;
  foto_url: string | null;
  created_at: string;
  updated_at: string;
}

export const mockPetaLokasi: PetaLokasiData[] = [
  {
    id: 1,
    nama: "TPA Desa Mekarjaya",
    deskripsi:
      "Tempat Pemrosesan Akhir (TPA) resmi yang melayani Desa Mekarjaya dan sekitarnya. Area seluas ±1 hektar dengan sistem sanitary landfill. Beroperasi setiap hari Senin–Sabtu, pukul 07.00–15.00 WIB.",
    jenis: "tpa",
    latitude: -6.3891,
    longitude: 107.4012,
    foto_url: null,
    created_at: "2026-01-10T08:00:00Z",
    updated_at: "2026-01-10T08:00:00Z",
  },
  {
    id: 2,
    nama: "TPS Induk Dusun I",
    deskripsi:
      "Tempat Penampungan Sementara (TPS) induk untuk wilayah Dusun I. Jadwal pengangkutan ke TPA: Senin, Rabu, dan Jumat pagi.",
    jenis: "tps",
    latitude: -6.3955,
    longitude: 107.3961,
    foto_url: null,
    created_at: "2026-01-12T08:00:00Z",
    updated_at: "2026-01-12T08:00:00Z",
  },
  {
    id: 3,
    nama: "TPS Dusun II RT 04",
    deskripsi:
      "Tempat Penampungan Sementara (TPS) untuk RT 04 dan RT 05 wilayah Dusun II. Kapasitas tampung ±2 kubik.",
    jenis: "tps",
    latitude: -6.397,
    longitude: 107.3928,
    foto_url: null,
    created_at: "2026-01-12T09:00:00Z",
    updated_at: "2026-01-12T09:00:00Z",
  },
  {
    id: 4,
    nama: "Depo Pemilahan Sampah RW 01",
    deskripsi:
      "Bank Sampah aktif yang dikelola PKK Desa Mekarjaya. Menerima sampah kertas, plastik, logam, dan kaca. Buka setiap Sabtu pukul 08.00–12.00 WIB. Warga mendapat kompensasi poin yang bisa ditukar sembako.",
    jenis: "pemilahan_sampah",
    latitude: -6.3945,
    longitude: 107.395,
    foto_url: null,
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-01-15T08:00:00Z",
  },
  {
    id: 5,
    nama: "Tempat Sampah Terpadu Balai Desa",
    deskripsi:
      "Fasilitas tempat sampah terpilah 3 jenis (Organik, Anorganik, B3) di depan halaman Balai Desa Mekarjaya. Dikosongkan setiap hari oleh petugas kebersihan desa.",
    jenis: "tempat_sampah",
    latitude: -6.394,
    longitude: 107.3944,
    foto_url: null,
    created_at: "2026-02-01T08:00:00Z",
    updated_at: "2026-02-01T08:00:00Z",
  },
  {
    id: 6,
    nama: "Tempat Sampah Terpilah Lapangan Dusun III",
    deskripsi:
      "Rangkaian tempat sampah terpilah (Organik & Anorganik) di sekitar lapangan olahraga Dusun III. Bagian dari program kebersihan lingkungan KKN.",
    jenis: "tempat_sampah",
    latitude: -6.398,
    longitude: 107.3935,
    foto_url: null,
    created_at: "2026-02-05T08:00:00Z",
    updated_at: "2026-02-05T08:00:00Z",
  },
  {
    id: 7,
    nama: "Bank Sampah Mandiri Dusun III",
    deskripsi:
      "Bank Sampah swadaya yang diinisiasi warga RT 02 Dusun III. Khusus mengelola plastik daur ulang dan dijual ke pengepul setiap 2 minggu sekali.",
    jenis: "pemilahan_sampah",
    latitude: -6.3985,
    longitude: 107.3942,
    foto_url: null,
    created_at: "2026-02-10T08:00:00Z",
    updated_at: "2026-02-10T08:00:00Z",
  },
  {
    id: 8,
    nama: "TPS Depo Lapangan Timur",
    deskripsi:
      "Tempat Penampungan Sementara di area timur desa yang melayani wilayah ladang dan persawahan Dusun IV. Pengangkutan ke TPA dilakukan 2x seminggu.",
    jenis: "tps",
    latitude: -6.392,
    longitude: 107.3995,
    foto_url: null,
    created_at: "2026-02-15T08:00:00Z",
    updated_at: "2026-02-15T08:00:00Z",
  },
];

// Konfigurasi visual per jenis: warna dan label untuk marker dan legenda
export const jenisConfig = {
  tempat_sampah: {
    label: "Tempat Sampah",
    color: "#16a34a", // green-600
    bgColor: "#dcfce7", // green-100
    borderColor: "#86efac", // green-300
    textColor: "#14532d", // green-900
    emoji: "🗑️",
  },
  pemilahan_sampah: {
    label: "Tempat Pemilahan",
    color: "#2563eb", // blue-600
    bgColor: "#dbeafe", // blue-100
    borderColor: "#93c5fd", // blue-300
    textColor: "#1e3a8a", // blue-900
    emoji: "♻️",
  },
  tps: {
    label: "TPS (Penampungan Sementara)",
    color: "#d97706", // amber-600
    bgColor: "#fef3c7", // amber-100
    borderColor: "#fcd34d", // amber-300
    textColor: "#78350f", // amber-900
    emoji: "🏗️",
  },
  tpa: {
    label: "TPA (Pemrosesan Akhir)",
    color: "#dc2626", // red-600
    bgColor: "#fee2e2", // red-100
    borderColor: "#fca5a5", // red-300
    textColor: "#7f1d1d", // red-900
    emoji: "🏭",
  },
} as const;
