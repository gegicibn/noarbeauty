"use client";
import Link from "next/link";
import Image from "next/image";

// Aproksimativne landmark koordinate za žensko frontalno lice (% od dimenzija slike)
const LANDMARKS = [
  // Kontura čela
  [50, 8], [40, 10], [30, 14], [22, 20], [18, 28],
  [60, 10], [70, 14], [78, 20], [82, 28],
  // Obrve
  [30, 30], [36, 28], [42, 27], [48, 28],
  [52, 28], [58, 27], [64, 28], [70, 30],
  // Oči
  [31, 35], [37, 33], [43, 33], [48, 35], [43, 37], [37, 37],
  [52, 35], [58, 33], [64, 33], [69, 35], [64, 37], [58, 37],
  // Nos
  [50, 40], [46, 44], [50, 50], [54, 44],
  [43, 54], [47, 55], [50, 56], [53, 55], [57, 54],
  // Usta
  [38, 64], [44, 61], [50, 60], [56, 61], [62, 64],
  [56, 68], [50, 70], [44, 68],
  // Vilica / kontura lica
  [18, 38], [16, 50], [17, 62], [22, 72], [30, 80],
  [40, 86], [50, 88], [60, 86], [70, 80], [78, 72],
  [83, 62], [84, 50], [82, 38],
  // Lica / zigomati
  [22, 44], [78, 44],
];

// Ključne linije (terce lica, os simetrije, okviri očiju, zlatni rez)
const LINES = [
  // Os simetrije (vertikala)
  [[50, 8], [50, 88]],
  // Gornja tercia (čelo → obrve)
  [[18, 28], [82, 28]],
  // Srednja tercia (obrve → subnasale)
  [[18, 56], [82, 56]],
  // Donja tercia (subnasale → brada)
  [[22, 72], [78, 72]],
  // Širina lica (bizigomatic)
  [[18, 44], [82, 44]],
  // Kontura lica lijeva
  [[40, 10], [22, 20], [18, 28], [18, 38], [16, 50], [17, 62], [22, 72], [30, 80], [40, 86], [50, 88]],
  // Kontura lica desna
  [[60, 10], [78, 20], [82, 28], [82, 38], [84, 50], [83, 62], [78, 72], [70, 80], [60, 86], [50, 88]],
];

const SCORES = [
  { label: "Simetrija",   value: 91, color: "#4ade80" },
  { label: "Zlatni rez",  value: 87, color: "#c9a96e" },
  { label: "Canthal tilt",value: 84, color: "#c9a96e" },
  { label: "Jawline",     value: 79, color: "#facc15" },
  { label: "Trećine",     value: 88, color: "#4ade80" },
];

function FaceLandmarkOverlay() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    >
      {/* Linije */}
      {LINES.map((line, i) =>
        Array.isArray(line[0]) ? (
          <polyline
            key={i}
            points={(line as number[][]).map(([x, y]) => `${x},${y}`).join(" ")}
            fill="none"
            stroke="#c9a96e"
            strokeWidth="0.15"
            strokeOpacity="0.35"
          />
        ) : (
          <line
            key={i}
            x1={(line[0] as number[])[0]}
            y1={(line[0] as number[])[1]}
            x2={(line[1] as number[])[0]}
            y2={(line[1] as number[])[1]}
            stroke="#c9a96e"
            strokeWidth="0.12"
            strokeOpacity="0.3"
            strokeDasharray="0.6 0.4"
          />
        )
      )}

      {/* Tačke */}
      {LANDMARKS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.55"
          fill="#c9a96e"
          fillOpacity="0.85"
        />
      ))}

      {/* Ugaone anotacije */}
      <text x="18" y="26" fontSize="2.2" fill="#c9a96e" fillOpacity="0.7" fontFamily="monospace">φ</text>
      <text x="74" y="26" fontSize="2.2" fill="#c9a96e" fillOpacity="0.7" fontFamily="monospace">φ</text>
      <text x="50.5" y="7" fontSize="2" fill="#c9a96e" fillOpacity="0.6" fontFamily="monospace" textAnchor="middle">T</text>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
      {/* Suptilni gradient pozadine */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-[#c9a96e]/6 rounded-full blur-[140px] -top-40 -right-20" />
        <div className="absolute w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-[100px] bottom-20 left-0" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Levo — tekst */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
              <span className="text-[#c9a96e] text-xs font-semibold tracking-widest uppercase">
                Farkas · Powell · Zlatni rez
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-[-2.5px] leading-[1.05] mb-6">
              Nauka iza<br />
              <span className="bg-gradient-to-r from-[#c9a96e] via-[#e8c98a] to-[#f0d4a0] bg-clip-text text-transparent">
                harmonije lica
              </span>
            </h1>

            <p className="text-[#888] text-lg leading-relaxed mb-10 max-w-md">
              Profesionalna cefalometrijska analiza zasnovana na Farkas (1994) i Powell (1984) standardima.
              468 tačaka. Kompletni izveštaj za 60 sekundi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a96e] via-[#e8c98a] to-[#f0d4a0] text-black font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Analiziraj lice besplatno
              </Link>
              <Link
                href="/#primer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/70 text-sm font-medium hover:border-[#c9a96e]/40 hover:text-white transition-all"
              >
                Vidi primer →
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.06]">
              {[
                { n: "468",  l: "Face Mesh tačaka" },
                { n: "12",   l: "Cefalometrijskih merenja" },
                { n: "7",    l: "Etničkih normi" },
              ].map(({ n, l }) => (
                <div key={n}>
                  <div className="text-2xl font-bold text-white">{n}</div>
                  <div className="text-xs text-[#666] mt-1 leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desno — portret + overlay */}
          <div className="order-1 lg:order-2 relative">
            {/* Wrapper sa zlatnim border-om */}
            <div className="relative rounded-2xl overflow-hidden border border-[#c9a96e]/15 bg-[#0d0d0d]">

              {/* Portret */}
              <div className="relative aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=85&fit=crop&crop=face"
                  alt="Cefalometrijska analiza lica"
                  fill
                  className="object-cover object-top grayscale-[15%] contrast-110"
                  priority
                  unoptimized
                />
                {/* Tamni gradient dole */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />

                {/* SVG Landmark overlay */}
                <FaceLandmarkOverlay />

                {/* Oznaka gornji levi */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-white/80 font-medium tracking-wide">MediaPipe • 468 pts</span>
                </div>

                {/* Ukupna ocena — donji deo */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] text-[#888] uppercase tracking-widest">Ukupna ocena</span>
                      <span className="text-3xl font-black bg-gradient-to-r from-[#c9a96e] to-[#e8c98a] bg-clip-text text-transparent">
                        87<span className="text-lg font-normal text-[#555]">/100</span>
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {SCORES.map(({ label, value, color }) => (
                        <div key={label} className="flex items-center gap-2">
                          <span className="text-[10px] text-[#666] w-20 shrink-0">{label}</span>
                          <div className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${value}%`, backgroundColor: color }}
                            />
                          </div>
                          <span className="text-[10px] font-bold w-6 text-right" style={{ color }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ploveće badge-ove */}
            <div className="absolute -left-5 top-1/3 bg-[#0d0d0d] border border-[#c9a96e]/20 rounded-xl p-3 shadow-2xl">
              <div className="text-[10px] text-[#888] mb-1">Nazofrontalni</div>
              <div className="text-sm font-bold text-[#c9a96e]">121.4°</div>
              <div className="text-[9px] text-[#555]">Idealno 115–130°</div>
            </div>

            <div className="absolute -right-5 top-1/2 bg-[#0d0d0d] border border-[#c9a96e]/20 rounded-xl p-3 shadow-2xl">
              <div className="text-[10px] text-[#888] mb-1">Canthal tilt</div>
              <div className="text-sm font-bold text-[#4ade80]">+3.2°</div>
              <div className="text-[9px] text-[#555]">Pozitivan ✓</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
