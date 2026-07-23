// app/admin/dashboard/page.jsx
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-6">
        <div className="border-b pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Admin Desa
            </h1>
            <p className="text-sm text-gray-500">
              Selamat datang kembali, Admin Desa Mekarjaya!
            </p>
          </div>
          <Link
            href="/"
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
          >
            Lihat Web Depan
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-50 rounded-xl border border-green-100 space-y-2">
            <h3 className="font-bold text-green-900">Kelola Berita</h3>
            <p className="text-sm text-green-700">
              Tambah, ubah, atau hapus arsip berita desa.
            </p>
            <Link
              href="/admin/dashboard/tambah-berita"
              className="inline-block text-xs bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1.5 rounded-lg transition text-center"
            >
              Buka Manajemen Berita
            </Link>
            <Link
              href="/admin/dashboard/kelola-berita"
              className="text-sm font-semibold text-green-600 hover:underline"
            >
              Lihat Semua berita
            </Link>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 space-y-2">
            <h3 className="font-bold text-blue-900">Kelola Demografi</h3>
            <p className="text-sm text-blue-700">
              Update data statistik penduduk desa terbaru.
            </p>
            <Link
              href="/admin/dashboard/ubah-demografi"
              className="inline-block text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg transition text-center"
            >
              Ubah Data Statistik
            </Link>
          </div>

          <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-100 space-y-2">
            <h3 className="font-bold text-yellow-900">Kelola transparansi</h3>
            <p className="text-sm text-yellow-700">
              Update data transparansi desa terbaru.
            </p>
            <Link
              href="/admin/dashboard/kelola-anggaran"
              className="inline-block text-xs bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-3 py-1.5 rounded-lg transition text-center"
            >
              Ubah Data Transparansi
            </Link>
          </div>

          <div className="p-6 bg-purple-50 rounded-xl border border-purple-100 space-y-2">
            <h3 className="font-bold text-purple-900">
              Kelola pengaduan Masyarakat
            </h3>
            <p className="text-sm text-purple-700">
              Update pengaduan masyarakat terbaru.
            </p>
            <Link
              href="/admin/dashboard/kelola-pengaduan"
              className="inline-block text-xs bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-1.5 rounded-lg transition text-center"
            >
              Kelola Pengaduan
            </Link>
          </div>
        </div>
        <div>
          {/* Panggil komponen di tempat yang kamu inginkan */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
