"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Lozinka mora imati najmanje 8 karaktera");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Dobrodošao! Krenimo sa analizom.");
      router.push("/onboarding");
    }
    setLoading(false);
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center font-bold text-xl mb-10">
          noar<span className="text-accent">beauty</span>.ai
        </Link>

        <div className="card p-8">
          <h1 className="font-semibold text-xl mb-1">Kreiraj nalog</h1>
          <p className="text-sm text-white/40 mb-7">
            2 besplatne analize · Bez kreditne kartice
          </p>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-white/10 rounded-xl py-3 text-sm font-medium hover:border-accent/40 transition-colors mb-5"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Nastavi sa Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-white/25">ili</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/40 block mb-1.5">Ime i prezime</label>
              <input
                type="text"
                className="input"
                placeholder="Marko Marković"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1.5">Email</label>
              <input
                type="email"
                className="input"
                placeholder="tvoj@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1.5">Lozinka</label>
              <input
                type="password"
                className="input"
                placeholder="Min. 8 karaktera"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-50"
            >
              {loading ? "Kreiram nalog..." : "Kreiraj nalog besplatno"}
            </button>
          </form>

          <p className="text-xs text-white/20 text-center mt-5">
            Registracijom prihvataš{" "}
            <Link href="/uslovi" className="text-accent/60 hover:text-accent">uslove korišćenja</Link>
            {" "}i{" "}
            <Link href="/privatnost" className="text-accent/60 hover:text-accent">politiku privatnosti</Link>.
          </p>
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          Već imaš nalog?{" "}
          <Link href="/sign-in" className="text-accent hover:text-accent-light">
            Prijavi se
          </Link>
        </p>
      </div>
    </div>
  );
}
