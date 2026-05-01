"use client";
import Link from "next/link";

const BENEFITS = [
  { num: "01", text: "Otvori više karijernih mogućnosti" },
  { num: "02", text: "Povećaj samopouzdanje" },
  { num: "03", text: "Ostavi jači prvi utisak" },
  { num: "04", text: "Unapredi ljubavni život" },
  { num: "05", text: "Poboljšaj kvalitet života" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-[#c9a96e]/5 rounded-full blur-[160px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/4" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-[#c9a96e]">
            Nauka estetike
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-3px] leading-[0.95] mb-8">
          Glow-Up
          <br />
          <span className="bg-gradient-to-r from-[#c9a96e] via-[#e8c98a] to-[#f0d4a0] bg-clip-text text-transparent">
            bez operacije
          </span>
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed">
          Dobij personalizovanu analizu lica i plan transformacije zasnovan na
          2000+ akademskih studija.
        </p>

        {/* CTA */}
        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gradient-to-r from-[#c9a96e] via-[#e8c98a] to-[#f0d4a0] text-black font-bold text-base hover:opacity-90 transition-opacity mb-16"
        >
          Počni sada
        </Link>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          {BENEFITS.map(({ num, text }) => (
            <div
              key={num}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.03]"
            >
              <span className="text-[10px] font-mono text-[#c9a96e]">{num}</span>
              <span className="text-xs text-[#888]">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
