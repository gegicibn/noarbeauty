import Link from "next/link";

const FEATURES = [
  "160+ estetskih testova",
  "Sva cefalometrijska merenja (Farkas + Powell)",
  "Skin analiza (pore, akne, starenje, tekstura)",
  "Claude AI personalizovani izveštaj",
  "Protokol za tvoje specifično lice",
  "Canthal tilt, jawline, simetrija, proporcije",
  "Percentil rang u odnosu na populaciju",
  "PDF export kliničkog izveštaja",
  "Morph vizualizacija (pre/after)",
  "Landmark overlay sa merenjima",
  "Podrška 7 etničkih normi",
  "Praćenje napretka tokom vremena",
  "14 dana garancija povrata novca",
];

export default function Pricing() {
  return (
    <section id="cene" className="py-28 bg-[#080808]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[4px] text-[#c9a96e] mb-4">Cena</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Jedan plan. Sve uključeno.
          </h2>
          <p className="text-[#666] max-w-lg mx-auto text-sm leading-relaxed">
            Bez mesečnih pretplata, bez skrivenih troškova, bez ograničenih funkcija.
            Godišnji pristup svemu što NoarBeauty nudi.
          </p>
        </div>

        <div className="bg-[#0d0d0d] border border-[#c9a96e]/20 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="text-xs uppercase tracking-[3px] text-[#c9a96e] mb-2">NoarBeauty</div>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-white">14.990</span>
                  <span className="text-lg text-[#555] mb-1">RSD</span>
                </div>
                <div className="text-sm text-[#555] mt-1">godišnje · ≈ 1.249 RSD/mesečno</div>
              </div>
              <div className="bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded-full px-3 py-1 text-xs text-[#c9a96e] font-medium">
                Najpopularnije
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="text-[#c9a96e] text-xs shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/sign-up"
              className="flex items-center justify-center w-full py-4 rounded-full bg-gradient-to-r from-[#c9a96e] via-[#e8c98a] to-[#f0d4a0] text-black font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Počni svoju transformaciju
            </Link>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] text-[#444]">
              <span>🔒 Sigurno plaćanje</span>
              <span>·</span>
              <span>↩ 14 dana garancija povrata</span>
              <span>·</span>
              <span>💳 Visa · Mastercard · Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
