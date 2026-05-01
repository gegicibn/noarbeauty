"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { usePostHog } from "posthog-js/react";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const posthog = usePostHog();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      setUser(u);
      if (u) posthog?.identify(u.id, { email: u.email });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      setUser(s?.user ?? null);
      if (event === "SIGNED_IN" && s?.user) {
        posthog?.identify(s.user.id, { email: s.user.email });
      }
      if (event === "SIGNED_OUT") posthog?.reset();
    });
    return () => subscription.unsubscribe();
  }, [supabase, posthog]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
        <Link href="/" className="font-bold text-lg tracking-tight">
          noar<span className="text-accent">beauty</span>.ai
        </Link>

        <div className="hidden md:flex items-center gap-7 ml-4">
          {["/#kako-radi", "/#funkcije", "/#cene", "/#faq"].map((href, i) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {["Kako radi", "Funkcije", "Cene", "FAQ"][i]}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <Link href="/settings" className="text-sm text-white/40 hover:text-white transition-colors hidden sm:block">
                Podešavanja
              </Link>
              <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm text-white/60 hover:text-white transition-colors">
                Prijavi se
              </Link>
              <Link href="/sign-up" className="btn-primary text-sm px-5 py-2.5">
                Počni besplatno
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
