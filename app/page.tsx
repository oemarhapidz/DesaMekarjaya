// src/app/page.jsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gray-50 pb-16 space-y-16">
      {/* 1. HERO SECTION & LAYANAN MANDIRI (Khas Web Desa) */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white py-24 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Sisi Kiri: Teks Sambutan */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <span className="bg-green-600/50 text-green-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Website Resmi
            </span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Selamat Datang di Portal Desa Mekarjaya
            </h1>
            <p className="text-green-100 text-base md:text-lg max-w-xl">
              Melayani masyarakat secara transparan, akuntabel, dan cepat menuju
              tata kelola desa berbasis digital mandiri.
            </p>
            <div className="pt-2">
              <Link
                href="/profil"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl shadow-lg transition"
              >
                Jelajahi Desa &rarr;
              </Link>
            </div>
          </div>

          {/* Sisi Kanan: Widget Layanan Mandiri / Kontak Cepat */}
          <div className="md:w-5/12 bg-white text-gray-800 p-6 rounded-2xl shadow-xl border border-white/20 w-full">
            <h3 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4 flex items-center gap-2">
              <span>⚡</span> Layanan Mandiri Warga
            </h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <a
                href="#"
                className="p-3 bg-green-50 rounded-xl hover:bg-green-100 transition border border-green-100"
              >
                <div className="text-2xl mb-1">📄</div>
                <span className="text-xs font-semibold text-green-900">
                  Persuratan Online
                </span>
              </a>
              <a
                href="#"
                className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition border border-blue-100"
              >
                <div className="text-2xl mb-1">📊</div>
                <span className="text-xs font-semibold text-blue-900">
                  Data Transparansi
                </span>
              </a>
              <a
                href="#"
                className="p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition border border-amber-100"
              >
                <div className="text-2xl mb-1">📞</div>
                <span className="text-xs font-semibold text-amber-900">
                  Pengaduan Warga
                </span>
              </a>
              <a
                href="#"
                className="p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition border border-purple-100"
              >
                <div className="text-2xl mb-1">🗺️</div>
                <span className="text-xs font-semibold text-purple-900">
                  Peta Desa
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFOGRAFIS DATA DEMOGRAFI (Biar mirp Web Kersik) */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Demografi Kependudukan
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Data statistik kependudukan Desa Mekarjaya yang diperbarui
              berkala.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r md:border-r border-gray-100 last:border-0">
              <p className="text-3xl font-black text-green-700">3.450</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
                Total Penduduk
              </p>
            </div>
            <div className="p-4 md:border-r border-gray-100 last:border-0">
              <p className="text-3xl font-black text-blue-600">1.740</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
                Laki-Laki
              </p>
            </div>
            <div className="p-4 border-r md:border-r border-gray-100 last:border-0">
              <p className="text-3xl font-black text-pink-600">1.710</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
                Perempuan
              </p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-black text-amber-600">980</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
                Kepala Keluarga
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRID UTAMA: BERITA UTAMA vs SIDEBAR INFORMASI */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* KOLOM KIRI & TENGAH: Kabar & Berita Terbaru (2 Kolom) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b-2 border-green-600 pb-2 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Kabar Desa Terbaru
            </h2>
            <Link
              href="/berita"
              className="text-sm font-semibold text-green-600 hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          {/* Grid Kartu Berita */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Berita 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
              <div className="h-48 bg-gray-200 w-full object-cover group-hover:opacity-90 transition"></div>
              <div className="p-5 space-y-2">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                  Pembangunan
                </span>
                <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-green-700 transition">
                  Penyaluran BLT Dana Desa Tahap Kedua Berjalan Lancar
                </h3>
                <p className="text-xs text-gray-400">13 Juli 2026</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Pemerintah Desa Mekarjaya hari ini sukses mendistribusikan
                  bantuan langsung tunai kepada warga pra-sejahtera...
                </p>
              </div>
            </div>

            {/* Berita 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
              <div className="h-48 bg-gray-200 w-full object-cover group-hover:opacity-90 transition"></div>
              <div className="p-5 space-y-2">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  Kesehatan
                </span>
                <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-amber-700 transition">
                  Pelaksanaan Posyandu Akbar dan Edukasi Pencegahan Stunting
                </h3>
                <p className="text-xs text-gray-400">10 Juli 2026</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Kader PKK Desa Mekarjaya mengadakan pengecekan kesehatan rutin
                  gratis bagi balita dan ibu menyusui...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: SIDEBAR WIDGET (1 Kolom) */}
        <div className="space-y-8">
          {/* Widget 1: Aparatur Desa */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 border-b pb-2 mb-4">
              Pimpinan Desa
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>{" "}
              {/* Foto Kades */}
              <div>
                <h4 className="font-bold text-gray-900">H. Ahmad Mulyana</h4>
                <p className="text-xs text-green-600 font-semibold">
                  Kepala Desa Mekarjaya
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Periode: 2024 - 2030
                </p>
              </div>
            </div>
          </div>

          {/* Widget 2: Peta Wilayah */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 border-b pb-2 mb-4">
              Lokasi Desa
            </h3>
            {/* Embed Google Map Statis atau Ilustrasi Box Map */}
            <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200">
              [ Embed Google Maps / Iframe Wilayah Desa ]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
