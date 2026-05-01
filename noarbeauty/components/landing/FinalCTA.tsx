import Link from "next/link";

const STEPS = [
  { num: "01", text: "Odgovori na pitanja o svom licu i ciljevima" },
  { num: "02", text: "Učitaj 3 fotografije (frontalna + profili)" },
  { num: "03", text: "AI analizira 160+ aspekata za 60 sekundi" },
  { num: "04", text: "Dobij personalizovani plan transformacije" },
];

export default function FinalCTA() {
  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[4px] text-[#c9a96e] mb-6">Počni danas</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Počni svoju transformaciju danas
        </h2>
        <p className="text-[#666] text-sm leading-relaxed mb-14 max-w-xl mx-auto">
          Svaki dan bez plana je izgubljen dan. Saznaj tačno šta tvoje lice treba
          i kreni ka boljoj verziji sebe — bez operacija, bez nagađanja.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 text-left max-w-xl mx-auto">
          {STEPS.map(({ num, text }) => (
            <div key={num} className="flex items-start gap-3 bg-[#0d0d0d] border border-white/[0.06] rounded-xl p-4">
              <span className="text-2xl font-black text-[#1a1a1a] shrink-0">{num}</span>
              <span className="text-xs text-[#666] leading-relaxed mt-1">{text}</span>
            </div>
          ))}
        </div>

        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gradient-to-r from-[#c9a96e] via-[#e8c98a] to-[#f0d4a0] text-black font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Pridruži se hiljadama
        </Link>

        <div className="mt-6 text-[11px] text-[#444]">
          14 dana garancija povrata novca · Bez rizika
        </div>
      </div>
    </section>
  );
}
