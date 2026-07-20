// app/admin/dashboard/demografi/page.jsx
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function KelolaDemografiPage() {
  // 1. Tarik data demografi saat ini dari Supabase (ambil baris pertama saja)
  const { data: demografi } = await supabase
    .from("demografi")
    .select("*")
    .limit(1)
    .single();

  // 2. Logika Server Action untuk mengupdate data
  async function handleUpdateDemografi(formData) {
    "use server";

    const total = parseInt(formData.get("total_penduduk"));
    const kk = parseInt(formData.get("jumlah_kk"));
    const lk = parseInt(formData.get("laki_laki"));
    const pr = parseInt(formData.get("perempuan"));

    // Update data ke baris pertama (id: 1)
    const { error } = await supabase
      .from("demografi")
      .update({
        total_penduduk: total,
        jumlah_kk: kk,
        laki_laki: lk,
        perempuan: pr,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1); // mengincar baris data yang ada

    if (error) {
      console.error("Gagal update demografi:", error);
      return;
    }

    // Refresh dan kembalikan admin ke dashboard utama
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Update Data Demografi Desa
            </h1>
            <p className="text-sm text-gray-500">
              Perbarui statistik jumlah kependudukan Desa Mekarjaya.
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-3 py-2 rounded-lg transition"
          >
            Batal
          </Link>
        </div>

        {/* Form Update */}
        <form action={handleUpdateDemografi} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Input Total Penduduk */}
            <div className="space-y-1">
              <label
                htmlFor="total_penduduk"
                className="block text-sm font-semibold text-gray-700"
              >
                Total Penduduk (Jiwa)
              </label>
              <input
                type="number"
                id="total_penduduk"
                name="total_penduduk"
                defaultValue={demografi?.total_penduduk || 0}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm transition"
                required
              />
            </div>

            {/* Input Jumlah KK */}
            <div className="space-y-1">
              <label
                htmlFor="jumlah_kk"
                className="block text-sm font-semibold text-gray-700"
              >
                Jumlah Kepala Keluarga (KK)
              </label>
              <input
                type="number"
                id="jumlah_kk"
                name="jumlah_kk"
                defaultValue={demografi?.jumlah_kk || 0}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm transition"
                required
              />
            </div>

            {/* Input Laki-laki */}
            <div className="space-y-1">
              <label
                htmlFor="laki_laki"
                className="block text-sm font-semibold text-gray-700"
              >
                Penduduk Laki-Laki
              </label>
              <input
                type="number"
                id="laki_laki"
                name="laki_laki"
                defaultValue={demografi?.laki_laki || 0}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm transition"
                required
              />
            </div>

            {/* Input Perempuan */}
            <div className="space-y-1">
              <label
                htmlFor="perempuan"
                className="block text-sm font-semibold text-gray-700"
              >
                Penduduk Perempuan
              </label>
              <input
                type="number"
                id="perempuan"
                name="perempuan"
                defaultValue={demografi?.perempuan || 0}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm transition"
                required
              />
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="pt-4 border-t mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-blue-700 shadow-md transition duration-150"
            >
              💾 Simpan Perubahan Statistik
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
