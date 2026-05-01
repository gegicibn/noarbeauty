import Image from "next/image";
import Link from "next/link";

const METRICS = [
  { key: "Simetrija lica",     score: 91 },
  { key: "Zlatni rez (φ)",     score: 87 },
  { key: "Canthal tilt",       score: 84 },
  { key: "Farkas indeks",      score: 89 },
  { key: "Trećine lica",       score: 82 },
  { key: "Jawline definicija", score: 76 },
  { key: "Nazofrontalni ugao", score: 71 },
  { key: "Nasolabijalni ugao", score: 68 },
  { key: "Razmak očiju",       score: 80 },
  { key: "Širina nosa",        score: 78 },
  { key: "Proporcija usana",   score: 73 },
  { key: "Harmonija crta",     score: 88 },
];

function scoreColor(s: number) {
  if (s >= 85) return "#0c6826";
  if (s >= 70) return "#9aaeb5";
  return "#eb850a";
}

export default function SampleReport() {
  return (
    <section id="primer" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center border border-[#c7d1d54d] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs uppercase tracking-[3px] text-[#515255]">Primer izveštaja</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233137] tracking-tight mb-5">
            Kompletan <strong className="text-[#9aaeb5]">cefalometrijski profil</strong>
          </h2>
          <p className="text-[#758084] text-sm max-w-lg mx-auto">
            Ovako izgleda izveštaj koji dobijaš — isti format koji koriste estetske klinike.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white border border-[#f2f2f2] rounded-[1.6rem] overflow-hidden shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-[#f2f2f2] bg-[#f9fbfb]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#0c6826] animate-pulse" />
              <span className="font-semibold text-sm text-[#233137]">Cefalometrijski izveštaj</span>
              <span className="text-[10px] text-[#758084] font-mono">· Farkas/Powell · MediaPipe 468pts</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-[#758084]">Oblik lica: <span className="text-[#233137]">Ovalno</span></span>
              <span className="text-[10px] text-[#758084]">Okluzija: <span className="text-[#233137]">Klasa I</span></span>
              <span className="text-sm font-bold text-[#9aaeb5]">87/100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
            {/* Left — metrics */}
            <div className="p-8 border-r border-[#f2f2f2]">
              <div className="text-[10px] text-[#758084] uppercase tracking-widest mb-6 font-mono">
                Cefalometrijska merenja
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {METRICS.map(({ key, score }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#515255]">{key}</span>
                      <span className="text-xs font-bold tabular-nums" style={{ color: scoreColor(score) }}>
                        {score}
                      </span>
                    </div>
                    <div className="h-[3px] rounded-full bg-[#f2f2f2] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${score}%`, backgroundColor: scoreColor(score) }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#f2f2f2]">
                <div className="text-[10px] text-[#758084] uppercase tracking-widest mb-4 font-mono">
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
                    <div key={l} className="bg-[#f9fbfb] border border-[#f2f2f2] rounded-xl p-3">
                      <div className="text-[9px] text-[#758084] mb-1">{l}</div>
                      <div className="text-sm font-bold text-[#233137] font-mono">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — photo + AI */}
            <div className="p-8 flex flex-col gap-6 bg-[#f9fbfb]">
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-[#b2c1c8]">
                <Image
                  src="https://cdn.qoves.com/static/landing/images/home/hero/woman-after.webp"
                  alt="Primer analize"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  {[[50,10,50,80],[20,38,80,38],[18,56,82,56]].map(([x1,y1,x2,y2],i)=>(
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9aaeb5" strokeWidth="0.25" strokeOpacity="0.5" strokeDasharray="1.5 1"/>
                  ))}
                  {[[50,12],[36,28],[64,28],[31,36],[44,34],[56,34],[69,36],[50,50],[44,54],[56,54],[40,63],[50,64],[60,63],[50,80],[22,45],[78,45]].map(([x,y],i)=>(
                    <circle key={i} cx={x} cy={y} r="0.9" fill="#9aaeb5" fillOpacity="0.9"/>
                  ))}
                </svg>
                <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#758084]">Ukupna ocena</span>
                    <span className="text-base font-black text-[#9aaeb5]">87</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-[#758084] uppercase tracking-widest mb-3 font-mono">
                  Claude AI Analiza
                </div>
                <p className="text-[11px] text-[#515255] leading-[1.8]">
                  Analiza pokazuje{" "}
                  <span className="text-[#233137] font-medium">visoku simetriju lica (91/100)</span>{" "}
                  sa izraženim pozitivnim canthal tiltom koji doprinosi ekspresivnom pogledu.
                  Nazofrontalni ugao od 121.4° je u optimalnom Powell opsegu (115–130°).
                  <br /><br />
                  <span className="text-[#9aaeb5] font-medium">Preporuka:</span> Wing liner tehnika može
                  naglasiti prirodni canthal tilt.
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 border-t border-[#f2f2f2] bg-[#f9fbfb] flex items-center justify-between">
            <span className="text-[10px] text-[#758084]">
              Analiza je informativna i ne predstavlja medicinsku dijagnozu
            </span>
            <Link href="/sign-up" className="text-[11px] font-semibold text-[#9aaeb5] hover:text-[#233137] transition-colors">
              Kreiraj svoju analizu →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
