"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Lozinke se ne podudaraju");
      return;
    }
    if (password.length < 8) {
      toast.error("Lozinka mora imati najmanje 8 karaktera");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Lozinka promenjena! Prijavi se.");
      router.push("/sign-in");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center font-bold text-xl mb-10">
          noar<span className="text-accent">beauty</span>.ai
        </Link>
        <div className="card p-8">
          <h1 className="font-semibold text-xl mb-1">Nova lozinka</h1>
          <p className="text-sm text-white/40 mb-7">Izaberi novu lozinku za nalog</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/40 block mb-1.5">Nova lozinka</label>
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
            <div>
              <label className="text-xs text-white/40 block mb-1.5">Potvrdi lozinku</label>
              <input
                type="password"
                className="input"
                placeholder="Ponovi lozinku"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {loading ? "Čuvam..." : "Promeni lozinku"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
