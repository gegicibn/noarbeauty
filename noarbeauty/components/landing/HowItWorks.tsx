const STEPS = [
  {
    num: "01",
    title: "Odgovori na pitanja",
    desc: "Etnička pozadina, dob, pol, preferencije i cilj analize.",
  },
  {
    num: "02",
    title: "Učitaj fotografije",
    desc: "Frontalna, levi i desni profil. Dobro osvetljenje, bez filtera.",
  },
  {
    num: "03",
    title: "AI priprema tvoj plan",
    desc: "Naš AI analizira 160+ aspekata tvog lica za 60 sekundi.",
  },
  {
    num: "04",
    title: "Počni transformaciju",
    desc: "Dobij personalizovani protokol i prati napredak tokom vremena.",
  },
];

const STATS = [
  { n: "2M+",    l: "Pratilaca — najveća beauty science zajednica" },
  { n: "100%",   l: "Personalizovano — svaka preporuka je jedina tvoja" },
  { n: "0",      l: "Operacija — efikasna poboljšanja, bez hirurgije" },
  { n: "2000+",  l: "Akademskih studija iza svake preporuke" },
];

export default function HowItWorks() {
  return (
    <section id="kako-radi" className="py-28 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Steps */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[4px] text-[#c9a96e] mb-4">Proces</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Dobij personalizovani NoarBeauty plan
          </h2>
          <p className="text-[#666] max-w-lg mx-auto text-sm leading-relaxed">
            Razumeš karakteristike svog lica i počinješ glow-up danas sa naučno
            zasnovanim planom akcije — bez plastičnih operacija.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="relative bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6">
              <div className="text-3xl font-black text-[#1a1a1a] mb-3 select-none">{num}</div>
              <h3 className="font-semibold text-sm mb-2">{title}</h3>
              <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ n, l }) => (
            <div key={n} className="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-white mb-2">{n}</div>
              <div className="text-xs text-[#555] leading-relaxed">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
