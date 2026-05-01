import Image from "next/image";

const FEATURES = [
  {
    title: "Simetrija lica",
    desc: "Precizno merenje devijacije leve i desne strane na bazi 234 referentnih tačaka. Nosna os, obrve, oči, usne.",
    num: "234",
    numLabel: "ref. tačaka",
  },
  {
    title: "Zlatni rez (φ = 1.618)",
    desc: "Poređenje svih ključnih proporcija sa Phi — matematičkim standardom harmonije. h/w, zygo/jaw, nos/usta.",
    num: "φ",
    numLabel: "matematički ideal",
  },
  {
    title: "Farkas standardi",
    desc: "Antropometrijska merenja po Leslie Farkas (1994) metodologiji. Morfometrički indeks, trećine lica, Nos/lice=0.25.",
    num: "1994",
    numLabel: "Farkas et al.",
  },
  {
    title: "Powell proporcije",
    desc: "Profil analiza po Dr. Powell protokolu: nazofrontalni (115-130°), nasolabijalni (90-120°), projekcija brade.",
    num: "115°",
    numLabel: "Powell optimum",
  },
  {
    title: "Canthal tilt",
    desc: "Ugao spoljašnjeg ugla oka prema unutrašnjem. Pozitivan tilt (+3-5°) korelira sa percepcijom privlačnosti.",
    num: "+3°",
    numLabel: "idealan opseg",
  },
  {
    title: "Skin analiza (Haut.AI)",
    desc: "Tekstura kože, pore, hiperpigmentacija, hidratacija i akne ocenjeni algoritmom treniranim na 3M+ slika.",
    num: "3M+",
    numLabel: "training images",
  },
  {
    title: "7 etničkih normi",
    desc: "Poredi tvoje proporcije sa statističkim prosecima etničke grupe — slavic, european, east_asian i više.",
    num: "7",
    numLabel: "etničkih grupa",
  },
  {
    title: "Claude AI izveštaj",
    desc: "Personalizovana analiza generisana claude-opus-4-5 modelom na srpskom, bosanskom ili engleskom.",
    num: "AI",
    numLabel: "claude-opus-4-5",
  },
];

export default function Features() {
  return (
    <section id="funkcije" className="py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="text-xs text-[#c9a96e] font-semibold uppercase tracking-[3px] mb-3">Metodologija</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Klinički standardi.<br />
              <span className="text-[#555]">Ne filteri.</span>
            </h2>
          </div>
          <p className="text-[#666] leading-relaxed text-sm lg:text-right max-w-md lg:ml-auto">
            Svaka metrika je zasnovana na peer-reviewed istraživanjima. Isti standardi koje koriste
            maksilofacijalni hirurzi i estetski stručnjaci.
          </p>
        </div>

        {/* Grid sa face slikom u sredini */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] gap-5 items-center">

          {/* Leva kolona */}
          <div className="space-y-3">
            {FEATURES.slice(0, 4).map(({ title, desc, num, numLabel }) => (
              <div key={title} className="group bg-[#0d0d0d] border border-white/[0.05] rounded-2xl p-5 hover:border-[#c9a96e]/15 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">{title}</div>
                    <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-[#c9a96e]">{num}</div>
                    <div className="text-[9px] text-[#444]">{numLabel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centar — lice */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#c9a96e]/10">
              <div className="relative aspect-[2/3]">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=85&fit=crop&crop=face"
                  alt="Cefalometrijska analiza"
                  fill
                  className="object-cover object-top grayscale-[20%] contrast-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-transparent" />
                {/* Overlay tačke */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" style={{pointerEvents:"none"}}>
                  {[
                    [50,12],[36,26],[64,26],[30,34],[44,33],[50,33],[56,33],[70,34],
                    [44,35],[56,35],[50,47],[44,52],[50,54],[56,52],
                    [38,62],[50,63],[62,62],[50,78],
                    [20,46],[80,46],[18,34],[82,34],
                  ].map(([x,y],i)=>(
                    <circle key={i} cx={x} cy={y} r="0.9" fill="#c9a96e" fillOpacity="0.85"/>
                  ))}
                  <line x1="50" y1="12" x2="50" y2="78" stroke="#c9a96e" strokeWidth="0.2" strokeOpacity="0.3" strokeDasharray="1.5 1"/>
                  <line x1="20" y1="34" x2="80" y2="34" stroke="#c9a96e" strokeWidth="0.2" strokeOpacity="0.3" strokeDasharray="1.5 1"/>
                  <line x1="20" y1="55" x2="80" y2="55" stroke="#c9a96e" strokeWidth="0.2" strokeOpacity="0.3" strokeDasharray="1.5 1"/>
                </svg>
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-[9px] text-[#555] mb-1">468 MediaPipe tačaka</div>
                  <div className="flex gap-1 flex-wrap">
                    {["91", "87", "84", "89"].map((s,i)=>(
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#c9a96e]/10 text-[#c9a96e]">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desna kolona */}
          <div className="space-y-3">
            {FEATURES.slice(4).map(({ title, desc, num, numLabel }) => (
              <div key={title} className="group bg-[#0d0d0d] border border-white/[0.05] rounded-2xl p-5 hover:border-[#c9a96e]/15 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">{title}</div>
                    <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-[#c9a96e]">{num}</div>
                    <div className="text-[9px] text-[#444]">{numLabel}</div>
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
