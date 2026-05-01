import Image from "next/image";

const STEPS = [
  { num: "01", title: "Dobij stručnu analizu lica", desc: "Odgovori na pitanja o svom licu, ciljevima i preferencijama." },
  { num: "02", title: "Vizualizuj svoju budućnost", desc: "Vidi kako bi tvoje lice moglo izgledati posle transformacije." },
  { num: "03", title: "Dobij personalizovani protokol", desc: "Korak po korak plan prilagođen isključivo tvom licu i ciljevima." },
  { num: "04", title: "Prati napredak i rezultate", desc: "Beleži promene i prilagođavaj plan tokom vremena." },
];

const STATS = [
  { n: "2M+",   l: "Pratilaca u beauty science zajednici" },
  { n: "100%",  l: "Personalizovano — svaka preporuka je jedina tvoja" },
  { n: "0",     l: "Operacija — efikasna poboljšanja bez hirurgije" },
  { n: "2000+", l: "Akademskih studija iza svake preporuke" },
];

const CDN = "https://cdn.qoves.com/static/landing/images/home";

export default function HowItWorks() {
  return (
    <section id="kako-radi" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center border border-[#c7d1d54d] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs uppercase tracking-[3px] text-[#515255]">Proces</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233137] tracking-tight mb-5">
            Dobij personalizovani<br />
            <strong className="text-[#9aaeb5]">NoarBeauty plan</strong>
          </h2>
          <p className="text-[#758084] max-w-lg mx-auto text-sm leading-relaxed">
            Razumeš karakteristike svog lica i počinješ glow-up danas sa naučno
            zasnovanim planom akcije — bez plastičnih operacija.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Steps */}
          <div className="space-y-6">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="flex gap-5">
                <div className="text-2xl font-black text-[#f2f5f5] shrink-0 w-10 select-none">{num}</div>
                <div>
                  <div className="text-sm font-semibold text-[#233137] mb-1">{title}</div>
                  <div className="text-xs text-[#758084] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Before/After images */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative rounded-[0.8rem] overflow-hidden aspect-[3/4] bg-[#b2c1c8]">
              <Image
                src={`${CDN}/expert-advice/before.webp`}
                alt="Pre"
                fill
                className="object-cover object-top"
                unoptimized
              />
              <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-white bg-black/25 px-2 py-0.5 rounded">Pre</span>
            </div>
            <div className="relative rounded-[0.8rem] overflow-hidden aspect-[3/4] bg-[#b2c1c8]">
              <Image
                src={`${CDN}/expert-advice/after.webp`}
                alt="Posle"
                fill
                className="object-cover object-top"
                unoptimized
              />
              <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-white bg-black/25 px-2 py-0.5 rounded">Posle</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ n, l }) => (
            <div key={n} className="bg-[#f2f5f5] rounded-[1.2rem] p-6 text-center">
              <div className="text-3xl font-black text-[#233137] mb-2">{n}</div>
              <div className="text-xs text-[#758084] leading-relaxed">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
