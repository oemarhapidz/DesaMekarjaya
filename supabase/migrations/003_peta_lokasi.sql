-- Migration: 003_peta_lokasi
-- Fitur: Peta Desa Interaktif
-- Dibuat: 2026-07-21
-- Status: Siap dijalankan, belum dieksekusi ke Supabase
-- Cara pakai: copy-paste seluruh isi file ini ke SQL Editor Supabase Dashboard, jalankan berurutan dari atas ke bawah
-- Catatan: Jalankan SETELAH migration 001 dan 002 (fungsi update_modified_column() sudah dibuat di 001)

-- Membuat tabel peta_lokasi_sampah
CREATE TABLE public.peta_lokasi_sampah (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama varchar(150) NOT NULL,
    deskripsi text NULL,
    jenis varchar(30) NOT NULL CONSTRAINT check_jenis_lokasi CHECK (jenis IN ('tempat_sampah', 'pemilahan_sampah', 'tps', 'tpa')),
    latitude numeric(10,7) NOT NULL,
    longitude numeric(10,7) NOT NULL,
    foto_url text NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Trigger auto-update updated_at menggunakan fungsi yang sudah dibuat di migration 001
-- Pastikan migration 001 sudah dijalankan terlebih dahulu
CREATE TRIGGER update_peta_lokasi_sampah_modtime
    BEFORE UPDATE ON public.peta_lokasi_sampah
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Mengaktifkan RLS
ALTER TABLE public.peta_lokasi_sampah ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS 1: Publik boleh membaca semua data titik lokasi (untuk ditampilkan di peta)
CREATE POLICY "Allow public select access"
ON public.peta_lokasi_sampah
FOR SELECT
TO public
USING (true);

-- Kebijakan RLS 2: Hanya admin terotentikasi yang bisa menambahkan titik lokasi baru
CREATE POLICY "Allow authenticated admin insert access"
ON public.peta_lokasi_sampah
FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

-- Kebijakan RLS 3: Hanya admin terotentikasi yang bisa mengubah data titik lokasi
CREATE POLICY "Allow authenticated admin update access"
ON public.peta_lokasi_sampah
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Kebijakan RLS 4: Hanya admin terotentikasi yang bisa menghapus titik lokasi
CREATE POLICY "Allow authenticated admin delete access"
ON public.peta_lokasi_sampah
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- =========================================================
-- DATA DUMMY LOKASI FASILITAS PENGELOLAAN SAMPAH
-- Koordinat di sekitar Desa Mekarjaya, Kec. Purwasari, Kab. Karawang
-- Koordinat referensi desa: -6.3941, 107.3944
-- =========================================================
INSERT INTO public.peta_lokasi_sampah (nama, deskripsi, jenis, latitude, longitude, foto_url) VALUES
(
    'TPA Desa Mekarjaya',
    'Tempat Pemrosesan Akhir (TPA) resmi yang melayani Desa Mekarjaya dan sekitarnya. Area seluas ±1 hektar dengan sistem sanitary landfill. Beroperasi setiap hari Senin–Sabtu, pukul 07.00–15.00 WIB.',
    'tpa',
    -6.3891000,
    107.4012000,
    NULL
),
(
    'TPS Induk Dusun I',
    'Tempat Penampungan Sementara (TPS) induk untuk wilayah Dusun I. Jadwal pengangkutan ke TPA: Senin, Rabu, dan Jumat pagi.',
    'tps',
    -6.3955000,
    107.3961000,
    NULL
),
(
    'TPS Dusun II RT 04',
    'Tempat Penampungan Sementara (TPS) untuk RT 04 dan RT 05 wilayah Dusun II. Kapasitas tampung ±2 kubik.',
    'tps',
    -6.3970000,
    107.3928000,
    NULL
),
(
    'Depo Pemilahan Sampah RW 01',
    'Bank Sampah aktif yang dikelola PKK Desa Mekarjaya. Menerima sampah kertas, plastik, logam, dan kaca. Buka setiap Sabtu pukul 08.00–12.00 WIB. Warga mendapat kompensasi poin yang bisa ditukar sembako.',
    'pemilahan_sampah',
    -6.3945000,
    107.3950000,
    NULL
),
(
    'Tempat Sampah Terpadu Balai Desa',
    'Fasilitas tempat sampah terpilah 3 jenis (Organik, Anorganik, B3) di depan halaman Balai Desa Mekarjaya. Dikosongkan setiap hari oleh petugas kebersihan desa.',
    'tempat_sampah',
    -6.3940000,
    107.3944000,
    NULL
),
(
    'Tempat Sampah Terpilah Lapangan Dusun III',
    'Rangkaian tempat sampah terpilah (Organik & Anorganik) yang dipasang di sekitar lapangan olahraga Dusun III. Bagian dari program kebersihan lingkungan KKN.',
    'tempat_sampah',
    -6.3980000,
    107.3935000,
    NULL
),
(
    'Bank Sampah Mandiri Dusun III',
    'Bank Sampah swadaya yang diinisiasi warga RT 02 Dusun III. Khusus mengelola plastik daur ulang dan dijual ke pengepul setiap 2 minggu sekali.',
    'pemilahan_sampah',
    -6.3985000,
    107.3942000,
    NULL
),
(
    'TPS Depo Lapangan Timur',
    'Tempat Penampungan Sementara di area timur desa yang melayani wilayah ladang dan persawahan Dusun IV. Pengangkutan ke TPA dilakukan 2x seminggu.',
    'tps',
    -6.3920000,
    107.3995000,
    NULL
);
