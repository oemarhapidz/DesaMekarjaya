// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Mengambil variabel lingkungan (env) dengan proteksi TypeScript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validasi sederhana agar tidak crash jika env lupa diisi
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL atau Anon Key belum diatur di file .env.local");
}

// Ekspor client supabase agar bisa dipakai di page.tsx mana saja
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
