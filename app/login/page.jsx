// app/login/page.jsx
import Link from "next/link";
import { Home } from "react-feather";
import { supabase } from "@/lib/supabase";

export default async function LoginPage() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-gray-50 to-emerald-50 min-h-screen flex flex-col justify-center items-center p-6">
      {/* Tombol Kembali ke Beranda */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:text-green-600 transition flex items-center gap-1"
        >
          &larr; Kembali ke Beranda Desa
        </Link>
      </div>

      {/* Kartu Box Login */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full space-y-6">
        {/* Header Login */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
            <Home size={28} aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-gray-950 tracking-tight">
            Sistem Informasi Desa
          </h2>
          <p className="text-sm text-gray-500">
            Masuk dengan akun admin Anda untuk mengelola data & konten desa.
          </p>
        </div>

        {/* Formulir Login */}
        <form action="/api/login" method="POST" className="space-y-4">
          {/* Input Username */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Masukan email admin"
              className="mt-1 block w-full px-3 py-2.5 bg-white border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm transition"
              required
            />
          </div>

          {/* Input Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukan Password"
              className="mt-1 block w-full px-3 py-2.5 bg-white border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm transition"
              required
            />
          </div>

          {/* Tombol Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 shadow-md shadow-green-700/10 transition duration-150"
            >
              Masuk Ke Dashboard Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
