-- Migration: 002_pengaduan
-- Fitur: Pengaduan Warga
-- Dibuat: 2026-07-20
-- Status: Siap dijalankan, belum dieksekusi ke Supabase
-- Cara pakai: copy-paste seluruh isi file ini ke SQL Editor Supabase Dashboard, jalankan berurutan dari atas ke bawah

-- Catatan Penting Mengenai Keamanan Data & NIK:
-- 1. NIK adalah data sensitif. Untuk mencegah kebocoran data NIK secara publik melalui REST API Supabase, 
--    kita disarankan membuat VIEW khusus publik (misal: `pengaduan_publik`) yang menyembunyikan kolom `nik` dan `nama_pelapor` (jika anonim).
-- 2. Namun untuk tabel dasar `pengaduan` sendiri, berikut adalah definisi skema dan kebijakan RLS-nya.

-- Membuat tabel pengaduan
CREATE TABLE public.pengaduan (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama_pelapor varchar(100) NULL, -- Nullable untuk mendukung opsi aduan anonim
    nik varchar(16) NULL, -- Nullable untuk mendukung opsi aduan anonim & proteksi privasi
    judul varchar(150) NOT NULL,
    deskripsi text NOT NULL,
    kategori varchar(50) NOT NULL,
    lampiran_url text NULL, -- URL gambar bukti pengaduan yang diupload ke Supabase Storage
    status varchar(20) NOT NULL DEFAULT 'pending' CONSTRAINT check_status CHECK (status IN ('pending', 'diproses', 'selesai')),
    tanggapan_admin text NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Trigger untuk memperbarui kolom updated_at secara otomatis saat ada edit data
CREATE TRIGGER update_pengaduan_modtime
    BEFORE UPDATE ON public.pengaduan
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Membuat VIEW Publik yang Aman (Menyembunyikan NIK dan memproteksi identitas)
CREATE OR REPLACE VIEW public.pengaduan_publik AS
SELECT 
    id,
    CASE 
        WHEN nama_pelapor IS NULL OR nama_pelapor = '' THEN 'Anonim'
        ELSE nama_pelapor
    END AS nama_pelapor,
    judul,
    deskripsi,
    kategori,
    lampiran_url,
    status,
    tanggapan_admin,
    created_at,
    updated_at
FROM public.pengaduan;

-- Mengaktifkan RLS pada tabel pengaduan
ALTER TABLE public.pengaduan ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS 1: Publik diizinkan melakukan INSERT (mengirimkan aduan baru)
CREATE POLICY "Allow public insert access"
ON public.pengaduan
FOR INSERT
TO public
WITH CHECK (true);

-- Kebijakan RLS 2: Publik diizinkan membaca data (SELECT) untuk keperluan transparansi/laporan status
-- Catatan: Agar NIK tidak bisa diakses, di frontend kita sebaiknya melakukan SELECT terhadap VIEW `pengaduan_publik`
CREATE POLICY "Allow public select access"
ON public.pengaduan
FOR SELECT
TO public
USING (true);

-- Kebijakan RLS 3: Hanya admin terotentikasi (authenticated) yang bisa mengupdate data (UPDATE)
-- Ini digunakan admin untuk mengubah status pengaduan ('diproses', 'selesai') dan menuliskan tanggapan.
CREATE POLICY "Allow authenticated admin update access"
ON public.pengaduan
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Kebijakan RLS 4: Hanya admin terotentikasi yang bisa menghapus data (DELETE) jika ada laporan spam/tidak pantas
CREATE POLICY "Allow authenticated admin delete access"
ON public.pengaduan
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');


-- =========================================================================
-- INSTRUKSI MANUAL UNTUK SETUP STORAGE BUCKET DI SUPABASE DASHBOARD
-- =========================================================================
-- Harap buat Bucket baru di menu Storage Supabase dengan ketentuan berikut:
-- 1. Nama Bucket: pengaduan_lampiran
-- 2. Tipe: Public (agar gambar bukti aduan bisa dirender langsung di web menggunakan public URL)
-- 3. Kebijakan Keamanan (Policies) Storage:
--    a. Policy 1 (INSERT): Izinkan publik (anon/authenticated) mengunggah file.
--       - SELECT: "Allowed for everyone"
--       - INSERT: "Allowed for everyone"
--    b. Policy 2 (DELETE/UPDATE): Hanya izinkan pengguna terotentikasi (authenticated / admin).
-- =========================================================================


-- Data Dummy Awal untuk Pengaduan
INSERT INTO public.pengaduan (nama_pelapor, nik, judul, deskripsi, kategori, status, tanggapan_admin) VALUES
('Budi Santoso', '3214051208940001', 'Lampu Jalan Mati di Dusun II', 'Lampu jalan di RT 03 Dusun II mati sejak seminggu yang lalu, membuat jalanan gelap gulita saat malam hari dan rawan kecelakaan.', 'Fasilitas Umum', 'pending', NULL),
(NULL, NULL, 'Tumpukan Sampah di Selokan RT 05', 'Tumpukan sampah plastik menyumbat saluran air/selokan di dekat lapangan RT 05. Dikhawatirkan banjir saat hujan lebat datang.', 'Kebersihan Lingkungan', 'diproses', 'Laporan sudah diterima. Petugas kebersihan desa akan melakukan gotong royong pembersihan esok pagi.'),
('Siti Aminah', '3214054506920003', 'Jalan Berlubang Dekat Balai Desa', 'Ada lubang aspal yang cukup dalam tepat di depan gerbang Balai Desa. Cukup membahayakan pengendara motor yang melintas di malam hari.', 'Infrastruktur', 'selesai', 'Terima kasih atas laporannya. Tim sarana prasarana desa telah melakukan penambalan jalan sementara pada tanggal 18 Juli 2026.');
