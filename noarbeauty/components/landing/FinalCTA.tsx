import Link from "next/link";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className="py-28 bg-[#080808] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-[#c9a96e]/8 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Levo */}
          <div>
            <div className="text-xs text-[#c9a96e] font-semibold uppercase tracking-[3px] mb-4">Besplatno</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Saznaj istinu o<br />
              <span className="bg-gradient-to-r from-[#c9a96e] to-[#e8c98a] bg-clip-text text-transparent">
                proporcijama svog lica
              </span>
            </h2>
            <p className="text-[#666] text-sm leading-relaxed mb-10 max-w-md">
              2 besplatne analize. Bez kreditne kartice. Isti standardi koje koriste estetske
              klinike — dostupni svima za 60 sekundi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a96e] via-[#e8c98a] to-[#f0d4a0] text-black font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Analiziraj lice besplatno
              </Link>
              <Link
                href="/#cene"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/70 text-sm font-medium hover:border-[#c9a96e]/40 hover:text-white transition-all"
              >
                Pogledaj planove
              </Link>
            </div>

            <div className="mt-10 pt-10 border-t border-white/[0.06] grid grid-cols-3 gap-6">
              {[
                ["2 besplatno", "bez kartice"],
                ["< 60s", "do rezultata"],
                ["100%", "privatnost"],
              ].map(([n, l]) => (
                <div key={n}>
                  <div className="font-bold text-lg text-white">{n}</div>
                  <div className="text-[11px] text-[#555] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desno — grid portreta */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&fit=crop&crop=face",
                score: 87, label: "Ovalno",
              },
              {
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face",
                score: 82, label: "Kvadratno",
              },
              {
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&fit=crop&crop=face",
                score: 91, label: "Srce",
              },
              {
                img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80&fit=crop&crop=face",
                score: 79, label: "Dijamant",
              },
            ].map(({ img, score, label }, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-[3/4] group border border-white/[0.04]">
                <Image
                  src={img}
                  alt="Analiza"
                  fill
                  className="object-cover object-top grayscale-[15%] contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#888]">{label}</span>
                    <span className="text-sm font-bold text-[#c9a96e]">{score}/100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
