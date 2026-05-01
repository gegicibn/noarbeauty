"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/reset-password`,
    });
    if (error) toast.error(error.message);
    else setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center font-bold text-xl mb-10">
          noar<span className="text-accent">beauty</span>.ai
        </Link>

        <div className="card p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h1 className="font-semibold text-lg mb-2">Proveri email</h1>
              <p className="text-sm text-white/40 mb-6">
                Poslali smo link za reset lozinke na{" "}
                <strong className="text-white/70">{email}</strong>
              </p>
              <Link href="/sign-in" className="btn-ghost text-sm">
                ← Nazad na prijavu
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-semibold text-xl mb-1">Zaboravljena lozinka</h1>
              <p className="text-sm text-white/40 mb-7">
                Upiši email i poslaćemo ti link za reset
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {loading ? "Šaljem..." : "Pošalji link za reset"}
                </button>
              </form>
            </>
          )}
        </div>

        {!sent && (
          <p className="text-center text-sm text-white/30 mt-6">
            Sećaš se lozinke?{" "}
            <Link href="/sign-in" className="text-accent hover:text-accent-light">
              Prijavi se
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
