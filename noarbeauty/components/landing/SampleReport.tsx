import Image from "next/image";
import Link from "next/link";

const METRICS = [
  { key: "Simetrija lica",       score: 91, good: true  },
  { key: "Zlatni rez (φ)",       score: 87, good: true  },
  { key: "Canthal tilt",         score: 84, good: true  },
  { key: "Farkas indeks",        score: 89, good: true  },
  { key: "Trećine lica",         score: 82, good: true  },
  { key: "Jawline definicija",   score: 76, good: true  },
  { key: "Nazofrontalni ugao",   score: 71, good: true  },
  { key: "Nasolabijalni ugao",   score: 68, good: false },
  { key: "Razmak očiju",         score: 80, good: true  },
  { key: "Širina nosa",          score: 78, good: true  },
  { key: "Proporcija usana",     score: 73, good: true  },
  { key: "Harmonija crta",       score: 88, good: true  },
];

function scoreColor(s: number) {
  if (s >= 85) return "#4ade80";
  if (s >= 70) return "#c9a96e";
  if (s >= 60) return "#facc15";
  return "#f87171";
}

export default function SampleReport() {
  return (
    <section id="primer" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs text-[#c9a96e] font-semibold uppercase tracking-[3px] mb-3">Primer izveštaja</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Kompletan cefalometrijski profil
          </h2>
          <p className="text-[#666] text-sm max-w-lg mx-auto">
            Ovako izgleda izveštaj koji dobijaš — isti format koji koriste estetske klinike.
          </p>
        </div>

        {/* Report card */}
        <div className="max-w-5xl mx-auto bg-[#0d0d0d] border border-white/[0.06] rounded-3xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-semibold text-sm">Cefalometrijski izveštaj</span>
              <span className="text-[10px] text-[#555] font-mono">· Farkas/Powell · MediaPipe 468pts</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-[#555]">Oblik lica: <span className="text-white/60">Ovalno</span></span>
              <span className="text-[10px] text-[#555]">Okluzija: <span className="text-white/60">Klasa I</span></span>
              <span className="text-xs font-bold bg-gradient-to-r from-[#c9a96e] to-[#e8c98a] bg-clip-text text-transparent">
                87/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0">

            {/* Levo — merenja */}
            <div className="p-8 border-r border-white/[0.04]">
              <div className="text-[10px] text-[#555] uppercase tracking-widest mb-6">
                Cefalometrijska merenja
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {METRICS.map(({ key, score, good }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#888]">{key}</span>
                      <span className="text-xs font-bold tabular-nums" style={{ color: scoreColor(score) }}>
                        {score}
                      </span>
                    </div>
                    <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${score}%`, backgroundColor: scoreColor(score) }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Merenja grid */}
              <div className="mt-8 pt-6 border-t border-white/[0.04]">
                <div className="text-[10px] text-[#555] uppercase tracking-widest mb-4">
                  Precizna merenja
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {[
                    ["Širina lica", "142.3px"],
                    ["Visina lica", "195.8px"],
                    ["Nos/lice", "0.248"],
                    ["Nazofrontalni", "121.4°"],
                    ["Nasolabijalni", "103.2°"],
                    ["Canthal tilt", "+3.1°"],
                    ["Interokularni", "65.2px"],
                    ["Jaw/zygo", "0.778"],
                  ].map(([l, v]) => (
                    <div key={l} className="bg-white/[0.03] rounded-xl p-3">
                      <div className="text-[9px] text-[#555] mb-1">{l}</div>
                      <div className="text-sm font-bold text-white/90 font-mono">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desno — slika + AI tekst */}
            <div className="p-8 flex flex-col gap-6">
              {/* Portret */}
              <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&fit=crop&crop=face"
                  alt="Primer analize"
                  fill
                  className="object-cover object-top grayscale-[10%]"
                  unoptimized
                />
                {/* Mini overlay */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" style={{pointerEvents:"none"}}>
                  {[[50,10,50,80],[20,38,80,38],[18,56,82,56]].map(([x1,y1,x2,y2],i)=>(
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a96e" strokeWidth="0.25" strokeOpacity="0.35" strokeDasharray="1.5 1"/>
                  ))}
                  {[[50,12],[36,28],[64,28],[31,36],[44,34],[56,34],[69,36],[50,50],[44,54],[56,54],[40,63],[50,64],[60,63],[50,80],[22,45],[78,45]].map(([x,y],i)=>(
                    <circle key={i} cx={x} cy={y} r="0.9" fill="#c9a96e" fillOpacity="0.85"/>
                  ))}
                </svg>
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#888]">Ukupna ocena</span>
                    <span className="text-base font-black text-[#c9a96e]">87</span>
                  </div>
                </div>
              </div>

              {/* AI izveštaj snippet */}
              <div>
                <div className="text-[10px] text-[#555] uppercase tracking-widest mb-3">
                  Claude AI Analiza
                </div>
                <p className="text-[11px] text-[#777] leading-[1.8]">
                  Analiza pokazuje{" "}
                  <span className="text-white/80">visoku simetriju lica (91/100)</span>{" "}
                  sa izraženim pozitivnim canthal tiltom koji doprinosi ekspresivnom pogledu.
                  Nazofrontalni ugao od 121.4° je u optimalnom Powell opsegu (115–130°).
                  <br /><br />
                  <span className="text-[#c9a96e]">Preporuka:</span> Wing liner tehnika može
                  naglasiti prirodni canthal tilt.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[10px] text-[#444]">
              Analiza je informativna i ne predstavlja medicinsku dijagnozu
            </span>
            <Link href="/sign-up" className="text-[11px] font-semibold text-[#c9a96e] hover:text-[#e8c98a] transition-colors">
              Kreiraj svoju analizu →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
