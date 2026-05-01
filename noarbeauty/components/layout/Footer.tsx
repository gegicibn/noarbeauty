import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#f2f2f2]">
      {/* CTA strip */}
      <div className="border-b border-[#f2f2f2] py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#515255]">
            Još uvek nisi siguran? Probaj NoarBeauty bez rizika.
          </p>
          <Link
            href="/sign-up"
            className="px-6 py-2.5 bg-[#233137] hover:bg-[#2d3b41] text-white text-sm font-medium rounded-[0.6rem] transition-colors shrink-0"
          >
            Dobij pristup
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="font-bold text-lg tracking-tight text-[#233137] block mb-3">
              noar<span className="text-[#9aaeb5]">beauty</span>.ai
            </Link>
            <p className="text-xs text-[#758084] leading-relaxed mb-3">
              support@noarbeauty.ai
            </p>
            <p className="text-xs text-[#9aaeb5] leading-relaxed">
              Neke slike na ovom sajtu su digitalno generisane radi ilustracije potencijalnih promena. Rezultati se mogu razlikovati.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[3px] text-[#758084] mb-4">Kompanija</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Istraživanja", href: "/#zasto-glowup" },
                { label: "Kontakt", href: "/kontakt" },
                { label: "NoarBeauty za klinike", href: "/kontakt" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#515255] hover:text-[#233137] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[3px] text-[#758084] mb-4">Ostalo</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Politika privatnosti", href: "/privatnost" },
                { label: "Uslovi korišćenja", href: "/uslovi" },
                { label: "Medicinski disclaimer", href: "/disclaimer" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#515255] hover:text-[#233137] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[3px] text-[#758084] mb-4">Poveži se</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Instagram", href: "#" },
                { label: "YouTube", href: "#" },
                { label: "TikTok", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-[#515255] hover:text-[#233137] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#f2f2f2] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#758084]">© 2025 NoarBeauty AI d.o.o. Sva prava zadržana.</p>
          <p className="text-xs text-[#758084]">Analiza je informativna i ne predstavlja medicinsku dijagnozu.</p>
        </div>
      </div>
    </footer>
  );
}
