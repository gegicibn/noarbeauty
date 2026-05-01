import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  {
    title: "Kompletna analiza lica",
    desc: "Detaljan pregled strukture i crta tvog lica po 160+ parametara.",
  },
  {
    title: "Personalizovani protokol poboljšanja",
    desc: "Korak po korak plan kako unaprediti estetiku tvog lica.",
  },
  {
    title: "Biometrijski skorovi i praćenje",
    desc: "Razumeš svoje trenutne skorove i pratiš napredak tokom vremena.",
  },
  {
    title: "Pre/posle vizualizacija potencijalnih promena",
    desc: "Vidi kako bi tvoje lice moglo izgledati nakon glow-up-a.",
  },
  {
    title: "Podrška tima",
    desc: "Postavljaj pitanja timu direktno iz svog naloga.",
  },
];

const CDN = "https://cdn.qoves.com/static/landing/images/home";

export default function Pricing() {
  return (
    <section id="cene" className="py-28 bg-[#f9fbfb]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#233137] tracking-tight mb-4">
            Šta bi te koštalo{" "}
            <span className="line-through text-[#9aaeb5]">50.000 RSD</span>
            {" "}košta <strong className="text-[#233137]">14.990 RSD</strong>
          </h2>
          <p className="text-[#758084] text-sm">Jedna godišnja pretplata. Bez skrivenih troškova.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {/* Features list */}
          <div className="space-y-2">
            {FEATURES.map(({ title, desc }) => (
              <div key={title} className="bg-white border border-[#f2f2f2] hover:border-[#e8e8e8] rounded-[0.8rem] p-5 transition-colors">
                <div className="flex gap-4 items-start">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                    <path d="M4 10L8 14L16 6" stroke="#0c6826" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-[#233137] mb-0.5">{title}</div>
                    <div className="text-xs text-[#515255] leading-relaxed">{desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing card */}
          <div className="relative rounded-[1.2rem] overflow-hidden h-[52rem] bg-[#9aaeb5]">
            <Image
              src={`${CDN}/pricing/bg.webp`}
              alt="Membership"
              fill
              className="object-cover"
              style={{ objectSize: "140% 140%", objectPosition: "center" } as React.CSSProperties}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
            <div className="relative h-full flex flex-col justify-between p-8">
              <div>
                <div className="text-sm font-medium text-white/80 mb-1">NoarBeauty</div>
                <div className="text-2xl font-bold text-[#cddbe1]">Pretplata</div>
              </div>
              <div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-[6rem] leading-none font-black text-white">14.990</span>
                  <span className="text-lg text-white/50 mb-4">RSD</span>
                </div>
                <div className="text-sm text-white/50 mb-8">/ godišnje · Bez skrivenih troškova.</div>
                <Link
                  href="/sign-up"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-white hover:bg-white/90 text-[#233137] font-semibold text-sm rounded-[0.8rem] transition-colors"
                >
                  Dobij pristup
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#233137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <div className="mt-5 text-center text-xs text-white/40">
                  14 dana garancija povrata novca — bez pitanja
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
          {["visa", "mastercard", "stripe", "paypal", "amazon", "applepay"].map((name) => (
            <Image
              key={name}
              src={`${CDN}/pricing/${name}.webp`}
              alt={name}
              width={48}
              height={24}
              className="object-contain opacity-40 hover:opacity-60 transition-opacity"
              unoptimized
            />
          ))}
        </div>
      </div>
    </section>
  );
}
