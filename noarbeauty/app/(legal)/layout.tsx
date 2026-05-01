import Link from "next/link";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-white/[0.06] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="font-bold text-lg">
            noar<span className="text-accent">beauty</span>.ai
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-16">
        {children}
      </main>
      <footer className="border-t border-white/[0.06] py-8 text-center">
        <p className="text-xs text-white/20">
          © 2024 noarbeauty.ai · <Link href="/uslovi" className="hover:text-white/40 transition-colors">Uslovi</Link>
          {" · "}<Link href="/privatnost" className="hover:text-white/40 transition-colors">Privatnost</Link>
        </p>
      </footer>
    </div>
  );
}
