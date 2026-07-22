import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const activeSupabase = supabase;

  const { data: demografi } = activeSupabase
    ? await activeSupabase.from("demografi").select("*").single()
    : { data: null };

  const stats = demografi || {
    total_penduduk: 0,
    laki_laki: 0,
    perempuan: 0,
    kepala_keluarga: 0,
  };

  const { data: listBerita } = activeSupabase
    ? await activeSupabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false })
    : { data: null };

  const daftarBerita = Array.isArray(listBerita) ? listBerita.slice(0, 4) : [];

  return (
    <div className="space-y-12 pb-16">
      {/* 🚀 HERO SECTION FULL BACKGROUND (ALA AMEZORA COFFEE) */}
      <section className="-mt-24 relative min-h-[85vh] w-full flex items-center justify-start px-8 sm:px-16 lg:px-24">
        {/* 1. GAMBAR BACKGROUND HERO (JPEG/JPG) */}
        <Image
          src="/hero-bg.jpeg" // Simpan foto kantor desa kamu di folder public/ dengan nama ini
          alt="Latar Belakang Desa Mekarjaya"
          fill
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        {/* 2. OVERLAY GELAP (Supaya teks putih tetap terbaca jelas) */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent" />

        {/* 3. KONTEN TEKS & BUTTON (Di Kiri) */}
        <div className="pt-15 relative z-10 max-w-2xl space-y-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm border border-white/20">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white">
              Portal Resmi Desa Mekarjaya
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
            Selamat datang di{" "}
            <span className="text-emerald-600">Portal Digital</span> Desa
            Mekarjaya
          </h1>

          <p className="text-base leading-relaxed text-gray-200 sm:text-lg drop-shadow">
            Dari profil desa, transparansi anggaran, sampai pengaduan warga,
            semua bisa diakses dalam satu portal yang ramah dan cepat.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/profil"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
            >
              Jelajahi Profil Desa
            </Link>
            <Link
              href="/pengaduan"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
            >
              Layanan Pengaduan
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[2rem] p-5 shadow-[0_24px_60px_-30px_rgba(2,6,23,0.4)] backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-desa-primary">
                Fitur utama
              </p>
              <h2 className="text-xl font-bold text-slate-900">
                Akses cepat untuk warga
              </h2>
            </div>
            <span className="rounded-full bg-desa-accent/15 px-3 py-1 text-[11px] font-semibold text-desa-primary">
              Terhubung penuh
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/transparansi",
                title: "Transparansi APBDes",
                icon: "📊",
                desc: "Pantau anggaran desa",
              },
              {
                href: "/pengaduan",
                title: "Pengaduan Warga",
                icon: "📢",
                desc: "Kirim dan cek status",
              },
              {
                href: "/peta-desa",
                title: "Peta Desa",
                icon: "🗺️",
                desc: "Lokasi fasilitas desa",
              },
              {
                href: "/berita",
                title: "Kabar Desa",
                icon: "📰",
                desc: "Berita dan agenda",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-desa-primary/30 hover:bg-white"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-desa-primary/10 text-xl">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-4 rounded-[2rem] border border-slate-200/80 bg-white/90 px-6 py-8 shadow-sm sm:mx-6 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="mb-8 text-center lg:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-desa-primary">
            Statistik desa
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Demografi Desa Mekarjaya
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Data dari sumber resmi yang disajikan dengan format yang mudah
            dibaca.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Penduduk",
              value: stats.total_penduduk,
              tone: "text-desa-primary",
            },
            {
              label: "Laki-Laki",
              value: stats.laki_laki,
              tone: "text-sky-600",
            },
            {
              label: "Perempuan",
              value: stats.perempuan,
              tone: "text-rose-500",
            },
            {
              label: "Kepala Keluarga",
              value: stats.kepala_keluarga,
              tone: "text-desa-accent",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
            >
              <p className={`text-3xl font-black ${item.tone}`}>
                {item.value.toLocaleString("id-ID")}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-4 grid gap-8 lg:mx-auto lg:max-w-7xl lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-desa-primary">
                Berita terkini
              </p>
              <h2 className="text-2xl font-medium text-slate-900">
                Kabar Desa Terbaru
              </h2>
            </div>
            <Link
              href="/berita"
              className="text-sm font-semibold text-desa-primary transition hover:text-desa-dark"
            >
              Lihat semua →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {daftarBerita.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 md:col-span-2">
                Belum ada berita terbaru yang dipublikasikan.
              </div>
            ) : (
              daftarBerita.map((item) => (
                <article
                  key={item.id}
                  className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 text-sm font-semibold text-slate-500">
                    Gambar Berita
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-3 inline-flex w-fit rounded-full bg-desa-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-desa-primary">
                      {item.kategori || "Seputar Desa"}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.judul}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.isi}
                    </p>
                    <Link
                      href={`/berita/${item.id}`}
                      className="mt-5 text-sm font-semibold text-desa-primary"
                    >
                      Baca selengkapnya →
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-base font-bold text-slate-900">
              <span className="text-xl">👤</span> Pimpinan Desa
            </h3>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-desa-primary/10 text-xl font-black text-desa-primary">
                K
              </div>
              <div>
                <p className="font-bold text-slate-900">Hj. Euis Suyeti</p>
                <p className="text-sm text-desa-primary">
                  Kepala Desa Mekarjaya
                </p>
                <p className="text-xs text-slate-500">
                  Masa jabatan 2024 - 2030
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 border-b border-slate-100 pb-3 text-base font-bold text-slate-900">
              <span className="text-xl">📍</span> Peta Wilayah
            </h3>
            <div className="mt-4 h-48 overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31719.991201823977!2d107.3943985!3d-6.3941419999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6973850f934ee9%3A0x7b6c7a4c5abf5459!2sMekarjaya%2C%20Kec.%20Purwasari%2C%20Karawang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1784196442723!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
