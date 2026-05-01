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
      if (event === "SIGNED_IN" && s?.user) posthog?.identify(s.user.id, { email: s.user.email });
      if (event === "SIGNED_OUT") posthog?.reset();
    });
    return () => subscription.unsubscribe();
  }, [supabase, posthog]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-xl border-b border-[#f2f2f2] shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-3 items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg tracking-tight text-[#233137]">
          noar<span className="text-[#9aaeb5]">beauty</span>.ai
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {[
            ["/#zasto-glowup", "Zašto Glow-Up"],
            ["/#kako-radi", "Kako Radi"],
            ["/#faq", "FAQ"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[#758084] hover:text-[#233137] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-[#758084] hover:text-[#233137] transition-colors hidden sm:block">
                Dashboard
              </Link>
              <Link href="/upload" className="px-5 py-2 bg-[#233137] hover:bg-[#2d3b41] text-white text-sm font-medium rounded-[0.6rem] transition-colors">
                Nova analiza
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm text-[#758084] hover:text-[#233137] transition-colors">
                Prijavi se
              </Link>
              <Link href="/sign-up" className="px-5 py-2 bg-[#233137] hover:bg-[#2d3b41] text-white text-sm font-medium rounded-[0.6rem] transition-colors">
                Počni sada
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
