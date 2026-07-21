# Project Onboarding & Task Breakdown
Terakhir diupdate: 2026-07-20 21:00

## 1. Ringkasan Stack & Arsitektur
- **Framework FE**: Next.js 16.2.10 (App Router)
- **Bahasa/tooling**: TypeScript, React 19.2.4
- **State management**: React Server Component State / Server Actions & Local Component State
- **Styling**: Tailwind CSS v4 (menggunakan `@tailwindcss/postcss`)
- **Backend/database yang sudah ada**: Supabase (`@supabase/supabase-js` v2.110.4) sudah terkonfigurasi di file [supabase.ts](file:///d:/KKN/profil-desa/lib/supabase.ts) dengan file konfigurasi [.env.local](file:///d:/KKN/profil-desa/.env.local).
- **Auth method yang dipakai FE**: Supabase Auth (`signInWithPassword`) melalui API Route POST di [route.js](file:///d:/KKN/profil-desa/app/api/login/route.js) dan form login di [page.jsx](file:///d:/KKN/profil-desa/app/login/page.jsx).

## 2. Struktur Direktori (Ringkas)
```
profil-desa/
├── app/
│   ├── admin/
│   │   └── dashboard/
│   │       ├── tambah-berita/page.jsx      # Form tambah berita (Server Action)
│   │       ├── ubah-demografi/page.jsx     # Form update demografi (Server Action)
│   │       └── page.jsx                    # Dashboard admin
│   ├── api/
│   │   └── login/route.js                  # Handler login API
│   ├── berita/
│   │   ├── [id]/page.jsx                   # Detail berita
│   │   └── page.jsx                        # Daftar berita
│   ├── login/
│   │   └── page.jsx                        # Halaman login admin
│   ├── profil/
│   │   └── page.jsx                        # Halaman profil desa
│   ├── globals.css                         # Styling global (Tailwind v4)
│   ├── layout.tsx                          # Layout utama & Navbar/Footer
│   └── page.tsx                            # Landing page utama
├── lib/
│   └── supabase.ts                         # Client Supabase
├── package.json                            # Dependensi proyek
└── tsconfig.json                           # Konfigurasi TypeScript
```

## 3. Pemetaan 3 Fitur Tugasku ke Kode Frontend yang Ada

### Fitur 1: Data Transparansi
- **Status FE**: 🚧 UI selesai (mock data), menunggu integrasi backend. Halaman interaktif telah dibuat di [page.tsx](file:///d:/KKN/profil-desa/app/transparansi/page.tsx) dengan data lokal di [mockData.ts](file:///d:/KKN/profil-desa/app/transparansi/mockData.ts). Link navigasi di beranda juga sudah terhubung.
- **Library khusus**: Tidak menggunakan library chart eksternal. Visualisasi perbandingan anggaran vs realisasi murni menggunakan layout Tailwind CSS v4 untuk performa dan kemudahan kustomisasi.

### Fitur 2: Pengaduan Warga
- **Status FE**: 🚧 UI selesai (mock data), menunggu integrasi backend. Halaman interaktif dengan form aduan, preview gambar, validasi state lokal, serta list aduan publik (yang diproteksi data NIK-nya) telah dibuat di [page.tsx](file:///d:/KKN/profil-desa/app/pengaduan/page.tsx) dengan data lokal di [mockData.ts](file:///d:/KKN/profil-desa/app/pengaduan/mockData.ts). Link navigasi beranda juga sudah terhubung.
- **Library khusus**: Tidak menggunakan library eksternal. File upload preview diproses menggunakan API native `FileReader` di browser. Integrasi dengan Supabase Storage bucket `pengaduan_lampiran` disiapkan dalam SQL migrasi.

### Fitur 3: Peta Desa Interaktif
- **Status FE**: 🚧 UI selesai (mock data), menunggu integrasi backend. Halaman peta interaktif Leaflet telah dibangun di [page.tsx](file:///d:/KKN/profil-desa/app/peta-desa/page.tsx) dengan komponen peta terpisah di [MapComponent.tsx](file:///d:/KKN/profil-desa/app/peta-desa/MapComponent.tsx) (di-load secara `dynamic` / SSR-disabled). Data mock di [mockData.ts](file:///d:/KKN/profil-desa/app/peta-desa/mockData.ts). Link navigasi beranda juga sudah terhubung.
- **Library khusus**: `leaflet` v1.x dan `react-leaflet` v4.x sudah terinstall. Peta menggunakan tile OpenStreetMap (tidak memerlukan API key). Icon marker dibuat dari SVG inline `L.divIcon` agar bisa dikustomisasi warna per kategori.

---

## 4. Arahan Pengerjaan (Task Breakdown per Fitur)

### Fitur: Data Transparansi
- [ ] Rancang skema database tabel `transparansi_anggaran` di Supabase (`id`, `tahun`, `jenis`, `kategori`, `anggaran`, `realisasi`, `created_at`, `updated_at`).
- [ ] Konfigurasi RLS (Row Level Security) di Supabase agar publik bisa membaca (`select`) dan hanya admin terotentikasi yang bisa mengelola data.
- [ ] Buat rute halaman publik baru di `app/transparansi/page.jsx` untuk menampilkan data transparansi anggaran APBDes per tahun (menggunakan data fetch langsung dari Supabase).
- [ ] Buat rute halaman manajemen transparansi di dashboard admin (`app/admin/dashboard/transparansi/page.jsx` dan sub-halamannya) untuk menambah/mengubah data anggaran menggunakan pola Server Actions.
- [ ] Sediakan visualisasi chart sederhana menggunakan css/Tailwind v4 (atau install Chart.js jika disepakati) untuk membandingkan nominal Anggaran vs Realisasi per jenis pos anggaran.

### Fitur: Pengaduan Warga
- [ ] Rancang skema database tabel `pengaduan` di Supabase (`id`, `nama_pelapor`, `nik`, `judul`, `deskripsi`, `kategori`, `lampiran_url`, `status`, `tanggapan_admin`, `created_at`, `updated_at`).
- [ ] Buat storage bucket baru bernama `pengaduan_lampiran` di Supabase untuk menampung gambar bukti pengaduan warga.
- [ ] Konfigurasi RLS kebijakan storage bucket agar publik dapat melakukan upload, dan admin serta publik dapat membaca gambar (secara public URL).
- [ ] Buat halaman publik `/pengaduan/page.jsx` berisi form input pengaduan (Nama, NIK, Judul, Kategori, Deskripsi, File Gambar) serta daftar status pengaduan terbaru untuk transparansi pelacakan aduan warga.
- [ ] Implementasikan backend logic (Server Action atau Route Handler API) untuk memproses submit formulir, mengupload file gambar aduan ke Supabase Storage, dan menyimpan record datanya ke tabel `pengaduan`.
- [ ] Buat halaman admin `/admin/dashboard/pengaduan/page.jsx` bagi admin desa untuk memantau semua aduan masuk, mengubah status (`Pending` -> `Diproses` -> `Selesai`), dan menulis `tanggapan_admin`.

### Fitur: Peta Desa Interaktif
- [ ] Rancang skema database tabel `peta_lokasi_sampah` di Supabase (`id`, `nama`, `deskripsi`, `jenis`, `latitude`, `longitude`, `foto_url`, `created_at`, `updated_at`).
- [ ] Tentukan tipe data koordinat: simpan sebagai data desimal pecahan `double precision` atau `numeric` di Supabase agar mudah diparsing ke Leaflet.
- [ ] Konfigurasi RLS di Supabase agar data lokasi dapat dibaca secara bebas oleh publik, namun manipulasi data dibatasi hanya untuk admin terotentikasi.
- [ ] Instal library Leaflet di frontend: `npm install leaflet react-leaflet` dan tipe datanya jika diperlukan `npm install -D @types/leaflet`.
- [ ] Buat halaman publik `/peta-desa/page.jsx` dan component Leaflet Map client-side (`use client` dengan dynamic import `ssr: false` karena Leaflet mengakses objek window browser).
- [ ] Hubungkan fetch data dari tabel `peta_lokasi_sampah` ke marker Leaflet Map, serta bedakan ikon/warna marker berdasarkan jenisnya (Tempat Sampah, Pemilahan Sampah, TPS, TPA).
- [ ] Buat halaman admin `/admin/dashboard/peta/page.jsx` untuk mempermudah admin menambahkan titik koordinat baru secara interaktif (dengan klik di peta atau menginput lat/lng manual) beserta form deskripsi.

---

## 5. Urutan Prioritas Pengerjaan

1. **Data Transparansi**
   - **Alasan**: Paling sederhana secara arsitektur. Tidak membutuhkan penanganan file upload (storage) atau library luar yang kompleks. Polanya sangat mirip dengan fitur kelola berita dan demografi yang sudah ada sehingga bisa diselesaikan dengan cepat sebagai tahap pemanasan.
2. **Pengaduan Warga**
   - **Alasan**: Kompleksitas tingkat menengah. Membutuhkan relasi penyimpanan file di Supabase Storage dan penanganan update status alur kerja (workflow aduan). Sangat penting untuk fungsionalitas interaktif warga sebelum masuk ke peta spasial.
3. **Peta Desa Interaktif**
   - **Alasan**: Paling kompleks. Memerlukan instalasi library eksternal (`leaflet`), konfigurasi penanganan rendering client-side (no-SSR di Next.js), dan integrasi interaksi peta (marker click, popups) dengan database koordinat geografis.

---

## 6. Hal yang Perlu Aku Konfirmasi/Diskusikan Dulu

1. **Pola Penulisan Backend**: Apakah tim menyepakati penggunaan **Next.js Server Actions** (`"use server"`) untuk penanganan logic backend (seperti yang digunakan di form berita dan demografi saat ini), ataukah harus memisahkan endpoint ke API Routes (`/app/api/...`)?
2. **Middleware Proteksi Dashboard**: Saat ini dashboard admin di `/admin/dashboard` belum terproteksi secara eksplisit dengan middleware auth. Apakah saya perlu membuat middleware Next.js untuk memproteksi rute `/admin/*` menggunakan sesi dari Supabase Auth?
3. **Visualisasi Data Transparansi**: Apakah data anggaran transparansi ingin disajikan secara visual menggunakan chart library (seperti Recharts) atau cukup dengan layout tabel & progress bar Tailwind CSS biasa?
4. **Koordinat Default Peta**: Berapa titik koordinat pusat (default latitude dan longitude) wilayah Desa Mekarjaya yang harus dipasang sebagai pusat peta Leaflet saat pertama kali dimuat?
5. **Kebijakan Privasi Pengaduan**: Apakah pengaduan warga boleh bersifat anonim dan apakah datanya (termasuk NIK) aman ditampilkan ke publik, ataukah NIK hanya untuk konsumsi admin internal?

---

## 7. Log Progres

### 2026-07-20
- **Aktivitas**: 
  1. Scan awal project, identifikasi stack & arsitektur Next.js 16 + Supabase, buat onboarding doc `PROJECT_ONBOARDING.md`.
  2. Merancang skema tabel `transparansi_anggaran` beserta kebijakan RLS dan query SQL DDL-nya.
  3. Membangun halaman `/transparansi` interaktif dengan Tailwind v4 dan data mock lokal terisolasi di `app/transparansi/mockData.ts`.
  4. Menghubungkan link navigasi "Data Transparansi" di landing page ke rute halaman yang baru.
  5. Merestrukturisasi skema database: Memindahkan seluruh isi SQL dari `PROJECT_ONBOARDING.md` Section 8 ke folder migrasi terpisah `supabase/migrations/` dan membuat dokumen ringkasan `SCHEMA_HANDOFF.md`.
  6. Merancang skema tabel `pengaduan` dan VIEW publik yang aman di `supabase/migrations/002_pengaduan.sql`.
  7. Membangun halaman visual interaktif `/pengaduan` dengan form aduan, file image preview (client-side), proteksi privasi NIK, dan badge status berwarna.
  8. Menghubungkan link navigasi "Pengaduan Warga" di landing page ke rute halaman baru `/pengaduan`.
- **Status**: 🚧 Fitur Transparansi & Pengaduan Warga: UI selesai (mock data), siap untuk dihubungkan ke backend Supabase.

### 2026-07-21
- **Aktivitas**:
  1. Install library `leaflet`, `react-leaflet`, dan `@types/leaflet` ke project.
  2. Merancang skema tabel `peta_lokasi_sampah` di `supabase/migrations/003_peta_lokasi.sql` dengan RLS dan 8 data dummy koordinat fasilitas sampah di Desa Mekarjaya.
  3. Memperbarui `SCHEMA_HANDOFF.md` dengan entri migration 003 dan ringkasan tabel `peta_lokasi_sampah`.
  4. Membangun komponen `MapComponent.tsx` (Leaflet map, custom icon SVG per jenis lokasi, popup berisi detail + link Google Maps).
  5. Membangun halaman `/peta-desa` dengan filter checkbox interaktif per kategori, legenda warna, daftar lokasi sidebar, dan kartu statistik ringkasan.
  6. Menghubungkan link navigasi "Peta Desa" di landing page ke rute halaman baru `/peta-desa`.
- **Status**: 🚧 Semua 3 fitur UI selesai (mock data), siap untuk dihubungkan ke backend Supabase.

---

## 8. Skema Siap Serah Terima
Skema database sekarang dikelola terpisah di [SCHEMA_HANDOFF.md](file:///d:/KKN/profil-desa/SCHEMA_HANDOFF.md) dan `supabase/migrations/`. Lihat file-file tersebut untuk detail rancangan SQL.
