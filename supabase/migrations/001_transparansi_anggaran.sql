-- Migration: 001_transparansi_anggaran
-- Fitur: Data Transparansi
-- Dibuat: 2026-07-20
-- Status: Siap dijalankan, belum dieksekusi ke Supabase
-- Cara pakai: copy-paste seluruh isi file ini ke SQL Editor Supabase Dashboard, jalankan berurutan dari atas ke bawah

-- Membuat tabel transparansi_anggaran
CREATE TABLE public.transparansi_anggaran (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tahun integer NOT NULL,
    jenis varchar(20) NOT NULL CONSTRAINT check_jenis CHECK (jenis IN ('pendapatan', 'belanja', 'pembiayaan')),
    kategori varchar(150) NOT NULL,
    anggaran numeric(15,2) NOT NULL CONSTRAINT check_anggaran CHECK (anggaran >= 0),
    realisasi numeric(15,2) NOT NULL DEFAULT 0.00 CONSTRAINT check_realisasi CHECK (realisasi >= 0),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Trigger untuk memperbarui kolom updated_at secara otomatis saat ada edit data
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_transparansi_anggaran_modtime
    BEFORE UPDATE ON public.transparansi_anggaran
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Contoh Data Dummy Awal
INSERT INTO public.transparansi_anggaran (tahun, jenis, kategori, anggaran, realisasi) VALUES
(2026, 'pendapatan', 'Dana Desa (DD)', 1200000000.00, 800000000.00),
(2026, 'pendapatan', 'Alokasi Dana Desa (ADD)', 650000000.00, 650000000.00),
(2026, 'belanja', 'Pembangunan Jembatan Dusun III', 450000000.00, 300000000.00),
(2026, 'belanja', 'Pemberdayaan Posyandu & Kesehatan Ibu-Anak', 150000000.00, 150000000.00),
(2025, 'pendapatan', 'Dana Desa (DD)', 1150000000.00, 1150000000.00);

-- Mengaktifkan RLS
ALTER TABLE public.transparansi_anggaran ENABLE ROW LEVEL SECURITY;

-- Kebijakan 1: Akses Baca (Read) untuk Publik
CREATE POLICY "Allow public read access" 
ON public.transparansi_anggaran 
FOR SELECT 
TO public 
USING (true);

-- Kebijakan 2: Akses Tulis (Write) untuk Admin Terautentikasi saja
CREATE POLICY "Allow authenticated admin write access" 
ON public.transparansi_anggaran 
FOR ALL 
TO authenticated 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
