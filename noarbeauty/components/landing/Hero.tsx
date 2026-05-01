"use client";
import Link from "next/link";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const BENEFITS = [
  { num: "01", text: "Otvori više karijernih mogućnosti" },
  { num: "02", text: "Povećaj samopouzdanje" },
  { num: "03", text: "Ostavi jači prvi utisak" },
  { num: "04", text: "Unapredi ljubavni život" },
  { num: "05", text: "Poboljšaj kvalitet života" },
];

const CDN = "https://cdn.qoves.com/static/landing/images/home";

export default function Hero() {
  return (
    <section className="bg-white pt-32 pb-0 overflow-hidden">
      {/* Top — text */}
      <div className="max-w-5xl mx-auto px-6 text-center pb-16">
        <div className="inline-flex items-center border border-[#c7d1d54d] rounded-full px-4 py-1.5 mb-8">
          <span className="text-xs uppercase tracking-[3px] text-[#515255]">Nauka estetike</span>
        </div>

        <h1 className="text-[5.5rem] leading-[1] font-bold tracking-tight text-[#233137] mb-6">
          Glow-Up<br />
          <span className="text-[#9aaeb5]">bez operacije</span>
        </h1>

        <p className="text-lg text-[#515255] max-w-xl mx-auto mb-10 leading-relaxed">
          Dobij personalizovanu analizu lica i plan transformacije zasnovan na
          2000+ akademskih studija. Svake godine.
        </p>

        <Link
          href="/sign-up"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#233137] hover:bg-[#2d3b41] text-white font-semibold text-sm rounded-[0.8rem] transition-colors"
        >
          Počni sada
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Bottom card */}
      <div className="bg-[#f2f5f5] mx-4 sm:mx-8 lg:mx-16 rounded-[1.6rem] overflow-hidden">
        <div className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Benefits */}
          <div className="space-y-4">
            {BENEFITS.map(({ num, text }) => (
              <div key={num} className="flex items-center gap-4">
                <span className="text-sm font-mono text-[#9aaeb5]">{num} /</span>
                <span className="text-sm text-[#233137] font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Before/After slider */}
          <div className="aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            <BeforeAfterSlider
              before={`${CDN}/hero/woman-before.webp`}
              after={`${CDN}/hero/woman-after.webp`}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
