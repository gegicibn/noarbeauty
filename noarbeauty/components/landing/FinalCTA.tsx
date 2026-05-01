import Link from "next/link";
import Image from "next/image";

const CDN = "https://cdn.qoves.com/static/landing/images/home";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#9aaeb5]">
      <Image
        src={`${CDN}/cta/background.webp`}
        alt=""
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-[#233137]/60" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Pridruži se hiljadama koji već transformišu svoj izgled.
        </h2>
        <p className="text-white/70 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
          Svaki dan bez plana je izgubljen dan. Saznaj tačno šta tvoje lice treba
          i kreni ka boljoj verziji sebe — bez operacija, bez nagađanja.
        </p>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-white/90 text-[#233137] font-semibold text-sm rounded-[0.8rem] transition-colors"
        >
          Počni svoju transformaciju
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#233137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div className="mt-5 text-xs text-white/40">14 dana garancija povrata novca · Bez rizika</div>
      </div>
    </section>
  );
}
