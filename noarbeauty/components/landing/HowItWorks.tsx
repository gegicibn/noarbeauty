import Image from "next/image";

const STEPS = [
  {
    num: "01",
    title: "Učitaj 3 fotografije",
    desc: "Frontalna + levi i desni profil. Bez filtera, dobro osvetljenje, neutralan izraz.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80&fit=crop&crop=face",
    tag: "Upload · <10s",
    detail: "JPEG / PNG / WEBP · max 10MB",
    overlay: false,
  },
  {
    num: "02",
    title: "AI analizira 468 tačaka",
    desc: "MediaPipe Face Mesh mapira sve proporcionalne odnose. Farkas, Powell, zlatni rez.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80&fit=crop&crop=face",
    tag: "Analiza · ~30s",
    detail: "12 metrika · 7 etničkih normi",
    overlay: true,
  },
  {
    num: "03",
    title: "Dobijaš kompletan izveštaj",
    desc: "Skorovi, merenja, Claude AI analiza, skin ocena, PDF export i pre/after vizualizacija.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&fit=crop&crop=face",
    tag: "Rezultat · instant",
    detail: "PDF · share · history",
  },
];

function MiniOverlay() {
  const pts = [
    [50,15],[38,28],[62,28],[32,36],[44,34],[56,34],[68,36],
    [44,37],[56,37],[50,44],[45,52],[50,54],[55,52],
    [40,62],[50,63],[60,62],[50,75],
    [35,62],[20,48],[18,35],[23,24],[32,16],[40,12],
    [65,12],[72,16],[77,24],[82,35],[80,48],[65,62],
  ];
  const hlines: [number,number,number,number][] = [
    [20,40,80,40],[18,55,82,55],[23,70,77,70],
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" style={{pointerEvents:"none"}}>
      <line x1={50} y1={10} x2={50} y2={78} stroke="#c9a96e" strokeWidth="0.2" strokeOpacity="0.35" strokeDasharray="1 0.8" />
      {hlines.map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a96e" strokeWidth="0.2" strokeOpacity="0.35" strokeDasharray="1 0.8" />
      ))}
      {pts.map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill="#c9a96e" fillOpacity="0.9" />
      ))}
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section id="kako-radi" className="py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="text-xs text-[#c9a96e] font-semibold uppercase tracking-[3px] mb-3">Proces</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Kako radi</h2>
          </div>
          <p className="text-[#666] max-w-sm text-sm leading-relaxed">
            Tri koraka do kompletnog cefalometrijskog profila zasnovanog na kliničkim standardima.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((step, idx) => (
            <div key={idx} className="group relative bg-[#0d0d0d] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#c9a96e]/20 transition-all duration-300">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover object-top grayscale-[15%] contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />
                {step.overlay && <MiniOverlay />}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
                  <span className="text-[10px] text-white/70 font-medium">{step.tag}</span>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#c9a96e]">{step.num}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed mb-4">{step.desc}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-[#444] font-mono">
                  <span className="w-1 h-1 rounded-full bg-[#c9a96e]/40" />
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
