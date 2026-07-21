import Link from "next/link";
import { supabase } from "@/lib/supabase"; // 1. Diubah ke alias pintar

export default async function HomePage() {
  // Ambil data dari tabel demografi di Supabase
  const { data: demografi } = await supabase
    .from("demografi")
    .select("*")
    .single();

  // Data cadangan (fallback) demografi
  const stats = demografi || {
    total_penduduk: 0,
    laki_laki: 0,
    perempuan: 0,
    kepala_keluarga: 0,
  };

  // Ambil data berita dari Supabase
  const { data: listBerita } = await supabase
    .from("berita")
    .select("*")
    .order("created_at", { ascending: false });

  // 2. AMAN DARI CRASH: Sinkronisasi nama variabel & fallback array
  const daftarBerita = listBerita || [];

  return (
    <div className="bg-gray-50 pb-16 space-y-16">
      {/* 1. HERO SECTION & LAYANAN MANDIRI */}
      <section className="relative bg-gradient-to-br from-white via-green-700 to-emerald-600 text-white py-24 px-6 shadow-md">
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
                className="inline-block bg-yellow-500 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl shadow-lg transition"
              >
                Jelajahi Desa &rarr;
              </Link>
            </div>
          </div>

          {/* Sisi Kanan: Widget Layanan Mandiri */}
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
              <Link
                href="/transparansi"
                className="p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition border border-blue-100"
              >
                <div className="text-2xl mb-1">📊</div>
                <span className="text-xs font-semibold text-blue-900">
                  Data Transparansi
                </span>
              </Link>
              <Link
                href="/pengaduan"
                className="p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition border border-amber-100"
              >
                <div className="text-2xl mb-1">📞</div>
                <span className="text-xs font-semibold text-amber-900">
                  Pengaduan Warga
                </span>
              </Link>
              <Link
                href="/peta-desa"
                className="p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition border border-purple-100"
              >
                <div className="text-2xl mb-1">🗺️</div>
                <span className="text-xs font-semibold text-purple-900">
                  Peta Desa
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFOGRAFIS DATA DEMOGRAFI */}
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
            <div className="p-4 border-r border-gray-100 last:border-0">
              <p className="text-3xl font-black text-green-700">
                {stats.total_penduduk.toLocaleString("id-ID")}
              </p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
                Total Penduduk
              </p>
            </div>
            <div className="p-4 md:border-r border-gray-100 last:border-0">
              <p className="text-3xl font-black text-blue-600">
                {stats.laki_laki.toLocaleString("id-ID")}
              </p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
                Laki-Laki
              </p>
            </div>
            <div className="p-4 border-r border-gray-100 last:border-0">
              <p className="text-3xl font-black text-pink-600">
                {stats.perempuan.toLocaleString("id-ID")}
              </p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
                Perempuan
              </p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-black text-amber-600">
                {stats.kepala_keluarga.toLocaleString("id-ID")}
              </p>
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
            {daftarBerita.length === 0 ? (
              <p className="text-gray-500 text-sm col-span-full">
                Belum ada berita terbaru.
              </p>
            ) : (
              daftarBerita.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Placeholder Gambar */}
                    <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400">
                      📷 No Image
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {item.kategori}
                      </span>
                      <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-green-700 transition line-clamp-2">
                        {item.judul}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.isi}
                      </p>
                    </div>
                  </div>
                  {/* Tombol Baca Selengkapnya */}
                  <div className="px-5 pb-5 pt-2">
                    <Link
                      href={`/berita/${item.id}`}
                      className="text-xs font-bold text-green-700 hover:text-green-600 transition"
                    >
                      Baca Selengkapnya &rarr;
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* KOLOM KANAN: SIDEBAR WIDGET (1 Kolom) (3. STRUKTUR SUDAH DIRAPIKAN) */}
        <div className="space-y-8">
          {/* Widget 1: Aparatur Desa */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 border-b pb-2 mb-4">
              Pimpinan Desa
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Hj. Euis Suyeti</h4>
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
            <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31719.991201823977!2d107.3943985!3d-6.3941419999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6973850f934ee9%3A0x7b6c7a4c5abf5459!2sMekarjaya%2C%20Kec.%20Purwasari%2C%20Karawang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1784196442723!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
