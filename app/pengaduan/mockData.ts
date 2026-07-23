// app/pengaduan/mockData.ts

export interface PengaduanData {
  id: number;
  nama_pelapor: string | null;
  nik: string | null;
  judul: string;
  deskripsi: string;
  kategori: string;
  lampiran_url: string | null;
  status: "pending" | "diproses" | "selesai";
  tanggapan_admin: string | null;
  created_at: string;
  updated_at: string;
}

export const mockPengaduan: PengaduanData[] = [
  {
    id: 1,
    nama_pelapor: "Budi Santoso",
    nik: "3214051208940001",
    judul: "Lampu Jalan Mati di Dusun II",
    deskripsi: "Lampu jalan di RT 03 Dusun II mati sejak seminggu yang lalu, membuat jalanan gelap gulita saat malam hari dan membahayakan keselamatan warga.",
    kategori: "Fasilitas Umum",
    lampiran_url: null,
    status: "pending",
    tanggapan_admin: null,
    created_at: "2026-07-20T08:00:00Z",
    updated_at: "2026-07-20T08:00:00Z",
  },
  {
    id: 2,
    nama_pelapor: null, // Anonim
    nik: null,
    judul: "Tumpukan Sampah di Selokan RT 05",
    deskripsi: "Terjadi penumpukan sampah plastik yang menyumbat aliran air selokan di dekat lapangan RT 05. Dikhawatirkan akan memicu banjir jika terjadi hujan lebat.",
    kategori: "Kebersihan & Lingkungan",
    lampiran_url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=500", // Contoh url placeholder gambar realistik
    status: "diproses",
    tanggapan_admin: "Laporan sudah diterima dan dicatat. Petugas kebersihan desa bersama warga sekitar dijadwalkan akan mengadakan gotong royong pembersihan esok pagi.",
    created_at: "2026-07-19T10:15:00Z",
    updated_at: "2026-07-20T09:00:00Z",
  },
  {
    id: 3,
    nama_pelapor: "Siti Aminah",
    nik: "3214054506920003",
    judul: "Jalan Berlubang Dekat Balai Desa",
    deskripsi: "Ada lubang aspal yang cukup besar dan dalam tepat di depan pintu gerbang Balai Desa Mekarjaya. Sangat membahayakan pengendara motor khususnya saat malam hari.",
    kategori: "Infrastruktur",
    lampiran_url: null,
    status: "selesai",
    tanggapan_admin: "Terima kasih atas laporannya. Tim sarana prasarana desa telah melakukan penambalan jalan aspal berlubang tersebut pada tanggal 18 Juli 2026.",
    created_at: "2026-07-15T07:30:00Z",
    updated_at: "2026-07-18T14:00:00Z",
  },
  {
    id: 4,
    nama_pelapor: "Joko Susilo",
    nik: "3214052309870002",
    judul: "Air Bersih Pamsimas Dusun I Macet",
    deskripsi: "Pasokan air bersih dari Pamsimas di wilayah Dusun I RT 02 sudah mati total selama 2 hari terakhir. Warga kesulitan untuk kebutuhan mandi dan mencuci.",
    kategori: "Layanan Publik",
    lampiran_url: null,
    status: "selesai",
    tanggapan_admin: "Laporan ditindaklanjuti. Pompa transmisi air yang rusak di pusat distribusi Pamsimas telah diperbaiki oleh tim teknis dan aliran air kini telah kembali normal.",
    created_at: "2026-07-12T11:00:00Z",
    updated_at: "2026-07-13T16:30:00Z",
  },
  {
    id: 5,
    nama_pelapor: null, // Anonim
    nik: null,
    judul: "Pencurian Helm di Area Parkir Masjid Dusun III",
    deskripsi: "Sering terjadi pencurian helm motor pada saat jamaah melaksanakan ibadah shalat Isya di Masjid Al-Ikhlas Dusun III. Mohon tingkatkan patroli keamanan pos ronda.",
    kategori: "Keamanan & Ketertiban",
    lampiran_url: null,
    status: "pending",
    tanggapan_admin: null,
    created_at: "2026-07-20T13:20:00Z",
    updated_at: "2026-07-20T13:20:00Z",
  }
];
