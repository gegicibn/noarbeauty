"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { Profile } from "@/lib/types/database.types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/sign-in"); return; }
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          setProfile(data);
          setName(data?.full_name ?? "");
        });
    });
  }, [supabase, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name })
      .eq("id", user.id);
    if (error) toast.error(error.message);
    else toast.success("Podaci sačuvani");
    setSaving(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const plan = profile?.plan ?? "free";
  const planLabel = { free: "Besplatno", pro: "Pro", elite: "Elite" }[plan];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-white/[0.06] bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-white/40 hover:text-white text-sm transition-colors">
            ← Dashboard
          </Link>
          <span className="font-semibold text-sm">Podešavanja</span>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        {/* Profil */}
        <div className="card p-8">
          <h2 className="font-semibold text-base mb-6">Profil</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs text-white/40 block mb-1.5">Ime i prezime</label>
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tvoje ime"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1.5">Email</label>
              <input
                type="email"
                className="input opacity-50 cursor-not-allowed"
                value={profile?.email ?? ""}
                disabled
              />
              <p className="text-xs text-white/20 mt-1">Email se ne može promeniti</p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Čuvam..." : "Sačuvaj promene"}
            </button>
          </form>
        </div>

        {/* Pretplata */}
        <div className="card p-8">
          <h2 className="font-semibold text-base mb-2">Pretplata</h2>
          <p className="text-sm text-white/40 mb-5">
            Trenutni plan: <strong className="text-accent">{planLabel}</strong>
            {plan === "free" && ` · ${profile?.analyses_used ?? 0}/2 analiza iskorišćeno`}
          </p>
          {plan === "free" ? (
            <div className="flex gap-3">
              <Link href="/api/stripe/checkout?plan=pro" className="btn-primary text-sm">
                Nadogradi na Pro — 990 RSD/mes
              </Link>
              <Link href="/api/stripe/checkout?plan=elite" className="btn-ghost text-sm">
                Elite plan
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-accent/5 border border-accent/20 rounded-xl">
              <div>
                <div className="font-semibold gradient-text">{planLabel} plan aktivan</div>
                <div className="text-xs text-white/30 mt-0.5">Neograničene analize</div>
              </div>
              <a
                href="/api/stripe/portal"
                className="btn-ghost text-xs"
              >
                Upravljaj pretplatom →
              </a>
            </div>
          )}
        </div>

        {/* Opasna zona */}
        <div className="card p-8 border-red-900/20">
          <h2 className="font-semibold text-base mb-2 text-red-400/80">Opasna zona</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSignOut}
              className="btn-outline border-red-900/30 text-red-400/70 hover:border-red-500/40 text-sm"
            >
              Odjavi se
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
