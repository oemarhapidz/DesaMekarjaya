"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut } from "feather-icons-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // 1. Hapus session login pengguna dari Supabase & Cookie/Storage
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Gagal menghapus session logout:", error.message);
      return;
    }

    // 2. Refresh route cache agar data session admin bersih total
    router.refresh();

    // 3. Pindahkan (redirect) user ke halaman Login
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg transition border border-red-100 cursor-pointer"
    >
      <LogOut size={14} />
      <span>Keluar (Logout)</span>
    </button>
  );
}
