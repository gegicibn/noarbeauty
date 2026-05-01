import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="font-bold text-xl tracking-tight block mb-3">
              noar<span className="text-accent">beauty</span>.ai
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              Profesionalna cefalometrijska analiza lica veštačkom inteligencijom.
              Za srpsko tržište.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
              Proizvod
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Kako radi", href: "/#kako-radi" },
                { label: "Funkcije", href: "/#funkcije" },
                { label: "Cene", href: "/#cene" },
                { label: "FAQ", href: "/#faq" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
              Pravno
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Politika privatnosti", href: "/privatnost" },
                { label: "Uslovi korišćenja", href: "/uslovi" },
                { label: "Medicinski disclaimer", href: "/disclaimer" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            © 2025 NoarBeauty AI. Sva prava zadržana.
          </p>
          <p className="text-xs text-white/25">
            Analiza je informativna i ne predstavlja medicinsku dijagnozu.
          </p>
        </div>
      </div>
    </footer>
  );
}
