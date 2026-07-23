// app/api/login/route.js
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Ambil data yang dikirim oleh form login (menggunakan FormData)
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    // Validasi dasar jika input kosong
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 },
      );
    }

    // 2. Kirim data ke Supabase Auth untuk mencocokkan akun
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // 3. Jika email atau password salah / tidak terdaftar
    if (error) {
      // Kita kembalikan response error agar bisa ditangkap oleh browser/warga
      return NextResponse.json(
        { error: "Email atau password admin salah!" },
        { status: 401 },
      );
    }

    // 4. Jika login sukses, buatkan redirect otomatis ke halaman dashboard admin
    // Catatan: Ganti '/admin/dashboard' sesuai dengan rute halaman admin kamu nanti
    const redirectUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(redirectUrl, 303);
  } catch (err) {
    // Mengantisipasi jika ada error sistem/server internal
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
