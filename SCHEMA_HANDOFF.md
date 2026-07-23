# Schema Handoff — Village Profile Website

**Untuk**: Administrator Supabase / Lead Backend Developer Desa Mekarjaya  
**Terakhir diupdate**: 2026-07-21 21:30

Dokumen ini berisi daftar skema database dan petunjuk konfigurasi keamanan Supabase yang siap dieksekusi di database production/staging oleh pemegang akses kredensial Supabase.

---

## Daftar Migration (Jalankan Berurutan)

| No | File | Fitur | Status | Catatan |
|---|---|---|---|---|
| **001** | [001_transparansi_anggaran.sql](file:///d:/KKN/profil-desa/supabase/migrations/001_transparansi_anggaran.sql) | Data Transparansi | ⏳ Belum dijalankan | Mengaktifkan RLS: publik hanya `SELECT`, admin authenticated `ALL`. |
| **002** | [002_pengaduan.sql](file:///d:/KKN/profil-desa/supabase/migrations/002_pengaduan.sql) | Pengaduan Warga | ⏳ Belum dijalankan | Mengaktifkan RLS: publik `INSERT` & `SELECT`, admin authenticated `UPDATE` & `DELETE`. Perlu setup Storage bucket. |
| **003** | [003_peta_lokasi.sql](file:///d:/KKN/profil-desa/supabase/migrations/003_peta_lokasi.sql) | Peta Desa Interaktif | ⏳ Belum dijalankan | Mengaktifkan RLS: publik `SELECT`, admin authenticated `INSERT`/`UPDATE`/`DELETE`. Membutuhkan migration 001 (fungsi trigger) sudah berjalan. |

---

## Ringkasan Tiap Tabel

### 1. Tabel `transparansi_anggaran`
- **Tujuan**: Menyimpan alokasi dana APBDes rencana anggaran vs realisasi aktual per pos anggaran untuk berbagai tahun fiskal.
- **Relasi ke Fitur FE**: Tautan menu **Data Transparansi** (`/transparansi`) mengambil data dari tabel ini untuk memfilter, merinci pos anggaran dalam tabel, serta menggambar progress bar penyerapan anggaran.

### 2. Tabel `pengaduan` & VIEW `pengaduan_publik`
- **Tujuan**: Menampung data aspirasi dan keluhan warga (infrastruktur, kebersihan, keamanan, dll.) yang dilengkapi dengan bukti foto pendukung.
- **Relasi ke Fitur FE**: Tautan menu **Pengaduan Warga** (`/pengaduan`) menggunakan tabel ini untuk:
  - Form Pengaduan: melakukan `INSERT` data laporan baru (serta upload foto bukti).
  - List Pengaduan Publik: melakukan `SELECT` melalui VIEW aman `pengaduan_publik` guna menampilkan perkembangan status aduan terupdate tanpa membocorkan data pribadi NIK pelapor.

### 3. Tabel `peta_lokasi_sampah`
- **Tujuan**: Menyimpan data titik koordinat geografis (latitude, longitude) seluruh fasilitas pengelolaan sampah di Desa Mekarjaya, dikategorikan ke dalam empat jenis: `tempat_sampah`, `pemilahan_sampah`, `tps` (Tempat Penampungan Sementara), dan `tpa` (Tempat Pemrosesan Akhir).
- **Relasi ke Fitur FE**: Tautan menu **Peta Desa** (`/peta-desa`) mengambil seluruh data dari tabel ini untuk dirender sebagai marker interaktif di atas layer peta OpenStreetMap menggunakan library Leaflet (`react-leaflet`). Marker dibedakan warna dan ikon berdasarkan kolom `jenis`, serta dapat difilter secara real-time di sisi klien.

---

## Kebijakan Storage Bucket (Manual Setup)

Khusus untuk fitur **Pengaduan Warga**, diperlukan storage bucket eksternal di Supabase untuk menaruh bukti gambar aduan. Administrator wajib membuat bucket berikut lewat Dashboard UI Supabase:

1. **Nama Bucket**: `pengaduan_lampiran`
2. **Access Level**: Set ke **Public**.
3. **RLS Policies untuk Storage (Bucket `pengaduan_lampiran`)**:
   - **SELECT Policy**: `true` (izinkan siapa saja melihat gambar bukti pengaduan yang terunggah).
   - **INSERT Policy**: `true` (izinkan publik anonim/warga mengunggah gambar saat membuat aduan).
   - **UPDATE / DELETE Policy**: batasi hanya untuk pengguna terotentikasi (`authenticated` admin).

---

## Yang Perlu Dikonfirmasi Sebelum Eksekusi

Sebelum mengeksekusi script SQL di atas ke database utama, mohon konfirmasi dan diskusikan poin-poin berikut:

1. **Kebijakan Kebocoran Data NIK**:
   - **Isu**: NIK (Nomor Induk Kependudukan) adalah informasi pribadi yang sangat sensitif.
   - **Pencegahan**: Kami telah membuat VIEW bernama `pengaduan_publik` yang sengaja menyembunyikan kolom `nik` dan melakukan sensor pada nama pelapor yang memilih anonim. Disepakati bahwa frontend akan membaca data pengaduan publik lewat VIEW ini, bukan membaca tabel `pengaduan` secara langsung. Mohon persetujuan dari sisi keamanan data desa.
2. **Kebijakan Validasi NIK**:
   - Apakah sistem perlu memvalidasi kesesuaian NIK dengan database kependudukan desa asli (tabel demografi/penduduk yang riil), atau untuk saat ini NIK hanya disimpan sebagai string mentah (16 digit) tanpa validasi silang?
3. **Autentikasi Admin di Server Actions**:
   - Skema RLS diatur agar hak tulis/modifikasi memerlukan otentikasi admin (`authenticated`). Pastikan middleware otentikasi Next.js telah dikonfigurasikan agar session cookie diteruskan ke client Supabase dengan benar pada Server Actions/API Calls.
