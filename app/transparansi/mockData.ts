// app/transparansi/mockData.ts

export interface AnggaranData {
  id: number;
  tahun: number;
  jenis: "pendapatan" | "belanja" | "pembiayaan";
  kategori: string;
  anggaran: number;
  realisasi: number;
  created_at: string;
  updated_at: string;
}

export const mockAnggaran: AnggaranData[] = [
  // Tahun 2026
  {
    id: 1,
    tahun: 2026,
    jenis: "pendapatan",
    kategori: "Dana Desa (DD)",
    anggaran: 1200000000,
    realisasi: 800000000,
    created_at: "2026-01-10T08:00:00Z",
    updated_at: "2026-07-15T10:30:00Z",
  },
  {
    id: 2,
    tahun: 2026,
    jenis: "pendapatan",
    kategori: "Alokasi Dana Desa (ADD)",
    anggaran: 650000000,
    realisasi: 650000000,
    created_at: "2026-01-10T08:15:00Z",
    updated_at: "2026-06-20T09:00:00Z",
  },
  {
    id: 3,
    tahun: 2026,
    jenis: "pendapatan",
    kategori: "Pendapatan Asli Desa (PADes)",
    anggaran: 85000000,
    realisasi: 42000000,
    created_at: "2026-01-12T07:00:00Z",
    updated_at: "2026-07-18T14:20:00Z",
  },
  {
    id: 4,
    tahun: 2026,
    jenis: "belanja",
    kategori: "Pembangunan Jembatan Dusun III",
    anggaran: 450000000,
    realisasi: 300000000,
    created_at: "2026-02-01T09:00:00Z",
    updated_at: "2026-07-02T11:00:00Z",
  },
  {
    id: 5,
    tahun: 2026,
    jenis: "belanja",
    kategori: "Pemberdayaan Posyandu & Kesehatan Ibu-Anak",
    anggaran: 150000000,
    realisasi: 150000000,
    created_at: "2026-02-05T10:00:00Z",
    updated_at: "2026-05-12T08:30:00Z",
  },
  {
    id: 6,
    tahun: 2026,
    jenis: "belanja",
    kategori: "Pengadaan Sarana & Prasarana Kantor Desa",
    anggaran: 90000000,
    realisasi: 85000000,
    created_at: "2026-02-10T11:00:00Z",
    updated_at: "2026-06-30T16:00:00Z",
  },
  {
    id: 7,
    tahun: 2026,
    jenis: "pembiayaan",
    kategori: "Penyertaan Modal BUMDes",
    anggaran: 100000000,
    realisasi: 100000000,
    created_at: "2026-03-01T08:00:00Z",
    updated_at: "2026-03-15T09:00:00Z",
  },

  // Tahun 2025 (Sudah terealisasi penuh)
  {
    id: 8,
    tahun: 2025,
    jenis: "pendapatan",
    kategori: "Dana Desa (DD)",
    anggaran: 1150000000,
    realisasi: 1150000000,
    created_at: "2025-01-08T08:00:00Z",
    updated_at: "2025-12-28T15:00:00Z",
  },
  {
    id: 9,
    tahun: 2025,
    jenis: "pendapatan",
    kategori: "Alokasi Dana Desa (ADD)",
    anggaran: 620000000,
    realisasi: 620000000,
    created_at: "2025-01-08T08:30:00Z",
    updated_at: "2025-12-20T10:00:00Z",
  },
  {
    id: 10,
    tahun: 2025,
    jenis: "belanja",
    kategori: "Pembangunan Jalan Rabat Beton Dusun I",
    anggaran: 500000000,
    realisasi: 500000000,
    created_at: "2025-02-12T09:00:00Z",
    updated_at: "2025-10-15T11:30:00Z",
  },
  {
    id: 11,
    tahun: 2025,
    jenis: "belanja",
    kategori: "Pemasangan Lampu Penerangan Jalan Umum",
    anggaran: 120000000,
    realisasi: 118500000,
    created_at: "2025-02-15T10:00:00Z",
    updated_at: "2025-11-05T14:00:00Z",
  },
  {
    id: 12,
    tahun: 2025,
    jenis: "belanja",
    kategori: "Pelatihan Wirausaha & UMKM Desa",
    anggaran: 80000000,
    realisasi: 80000000,
    created_at: "2025-03-01T08:00:00Z",
    updated_at: "2025-09-20T15:30:00Z",
  },
];
