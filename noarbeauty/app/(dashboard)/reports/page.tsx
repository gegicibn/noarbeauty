import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { scoreColor, formatDate } from "@/lib/utils";

export default async function ReportsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: reports } = await supabase
    .from("reports")
    .select("id, status, created_at, results, language")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-white/[0.06] bg-[#0d0d0d] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-white/40 hover:text-white text-sm transition-colors">
            ← Dashboard
          </Link>
          <span className="font-semibold text-sm">Svi izveštaji</span>
          <Link href="/upload" className="btn-primary text-sm px-4 py-2">
            Nova analiza
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Moji izveštaji</h1>
            <p className="text-white/30 text-sm mt-1">{reports?.length ?? 0} ukupno</p>
          </div>
        </div>

        {!reports || reports.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="font-semibold text-lg mb-2">Nema izveštaja</h2>
            <p className="text-white/30 text-sm mb-6">Uradi prvu analizu da vidiš rezultate ovde</p>
            <Link href="/upload" className="btn-primary">Počni prvu analizu →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((r) => {
              const res = r.results as Record<string, unknown> | null;
              const overall = res?.overall as number | null;
              const faceShape = res?.face_shape as string | null;
              const scores = res?.scores as Record<string, number> | null;

              return (
                <Link
                  key={r.id}
                  href={`/reports/${r.id}`}
                  className="card p-5 flex items-center justify-between hover:border-accent/30 transition-all group"
                >
                  <div className="flex items-center gap-5">
                    {/* Status indikator */}
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      r.status === "completed"  ? "bg-emerald-500" :
                      r.status === "processing" ? "bg-yellow-500 animate-pulse" :
                      r.status === "failed"     ? "bg-red-500" : "bg-white/20"
                    }`} />

                    <div>
                      <div className="font-medium text-sm">
                        Analiza {r.id.slice(0, 8).toUpperCase()}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-white/25">
                          {formatDate(r.created_at)}
                        </span>
                        {faceShape && (
                          <span className="text-xs text-white/25">· {faceShape}</span>
                        )}
                        <span className="text-xs text-white/20 uppercase">
                          {r.language}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Mini score bars */}
                    {scores && r.status === "completed" && (
                      <div className="hidden md:flex items-center gap-3">
                        {["symmetry", "golden_ratio", "canthal_tilt"].map((key) => {
                          const s = scores[key];
                          if (!s) return null;
                          return (
                            <div key={key} className="text-center">
                              <div className={`text-sm font-bold ${scoreColor(s)}`}>{s}</div>
                              <div className="text-[10px] text-white/20 capitalize">
                                {key === "symmetry" ? "sim." : key === "golden_ratio" ? "phi" : "cant."}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Overall */}
                    {overall !== null && overall !== undefined ? (
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${scoreColor(overall)}`}>{overall}</div>
                        <div className="text-xs text-white/20">/100</div>
                      </div>
                    ) : (
                      <div className="text-xs text-white/30 capitalize">{r.status}</div>
                    )}

                    <span className="text-white/15 group-hover:text-accent/60 transition-colors text-lg">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
