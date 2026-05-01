import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types/database.types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  const profile = profileData as Profile | null;

  const { data: reports } = await supabase
    .from("reports")
    .select("id, status, created_at, results")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  const plan = profile?.plan ?? "free";
  const analysesUsed = profile?.analyses_used ?? 0;
  const analysesLimit = plan === "free" ? 2 : -1;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            noar<span className="text-accent">beauty</span>.ai
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
              {plan}
            </span>
            <form action="/api/auth/signout" method="post">
              <button className="text-sm text-white/40 hover:text-white transition-colors">
                Odjavi se
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-1">
            Zdravo, {profile?.full_name?.split(" ")[0] ?? "korisniče"} 👋
          </h1>
          <p className="text-white/40 text-sm">Upravljaj analizama i izveštajima</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="card p-6">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Analize ovog meseca</div>
            <div className="text-3xl font-bold">
              {analysesUsed}
              {analysesLimit > 0 && (
                <span className="text-white/20 text-xl">/{analysesLimit}</span>
              )}
            </div>
          </div>
          <div className="card p-6">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Ukupno izveštaja</div>
            <div className="text-3xl font-bold">{reports?.length ?? 0}</div>
          </div>
          <div className="card p-6">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Plan</div>
            <div className="text-3xl font-bold gradient-text capitalize">{plan}</div>
          </div>
        </div>

        {/* Nova analiza CTA */}
        <div className="card p-8 mb-8 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-lg mb-1">Nova analiza lica</h2>
              <p className="text-sm text-white/40">
                Učitaj 3 fotografije (front, levi i desni profil) za kompletnu cefalometrijsku analizu
              </p>
            </div>
            <Link
              href="/upload"
              className={`btn-primary flex-shrink-0 ${
                plan === "free" && analysesUsed >= 2 ? "opacity-40 pointer-events-none" : ""
              }`}
            >
              {plan === "free" && analysesUsed >= 2
                ? "Limit dostignut"
                : "Počni analizu →"}
            </Link>
          </div>
          {plan === "free" && analysesUsed >= 2 && (
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <p className="text-sm text-white/40">
                Iskoristio si sve besplatne analize.{" "}
                <Link href="/api/stripe/checkout?plan=pro" className="text-accent hover:text-accent-light">
                  Nadogradi na Pro →
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Izveštaji */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Nedavni izveštaji</h2>
            <Link href="/reports" className="text-xs text-accent/70 hover:text-accent transition-colors">
              Svi izveštaji →
            </Link>
          </div>
          {!reports || reports.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-white/30 text-sm">Još nemaš analiza. Počni prvu →</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((r) => {
                const res = r.results as Record<string, unknown> | null;
                const overall = res ? (res.overall as number) : null;
                return (
                  <Link
                    key={r.id}
                    href={`/reports/${r.id}`}
                    className="card p-5 flex items-center justify-between hover:border-accent/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          r.status === "completed"
                            ? "bg-green-500"
                            : r.status === "processing"
                            ? "bg-yellow-500 animate-pulse"
                            : r.status === "failed"
                            ? "bg-red-500"
                            : "bg-white/20"
                        }`}
                      />
                      <div>
                        <div className="text-sm font-medium">
                          Analiza #{r.id.slice(0, 8)}
                        </div>
                        <div className="text-xs text-white/30">
                          {new Date(r.created_at).toLocaleDateString("sr-RS")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {overall !== null && (
                        <div className="text-right">
                          <div className="text-lg font-bold gradient-text">{overall}</div>
                          <div className="text-xs text-white/30">/100</div>
                        </div>
                      )}
                      <span className="text-white/20 group-hover:text-accent transition-colors">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
