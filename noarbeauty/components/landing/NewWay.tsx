import Image from "next/image";

const OLD = [
  "Fokus na jednoj crti",
  "Poseta klinici",
  "Nema procene",
  "Nepotrebne operacije",
  "Loši rezultati",
];

const NEW = [
  "Fokus na harmoniji celog lica",
  "NoarBeauty analiza",
  "Vidi svoju budućnost",
  "Personalizovani protokol",
  "Pravi rezultati, bez operacije",
];

export default function NewWay() {
  return (
    <section className="py-28 bg-[#f9fbfb]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center border border-[#c7d1d54d] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs uppercase tracking-[3px] text-[#515255]">Novi pristup</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233137] tracking-tight mb-5">
            Novi način <strong className="text-[#9aaeb5]">glow-up-a</strong>
          </h2>
          <p className="text-[#758084] max-w-xl mx-auto text-sm leading-relaxed">
            Istraživanja pokazuju da tvoj izgled utiče na skoro sve — od karijere do
            romantičnog života. Nažalost, većina ljudi gubi vreme na „poboljšanja"
            koja ne odgovaraju njihovom jedinstvenom licu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Stari način */}
          <div className="bg-white border border-[#f2f2f2] rounded-[1.2rem] p-8">
            <div className="text-xs uppercase tracking-[3px] text-[#758084] mb-6 font-mono">Stari način</div>
            <div className="space-y-3">
              {OLD.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-[#e8e8e8] flex items-center justify-center text-[#9aaeb5] text-[10px] shrink-0">✕</span>
                  <span className="text-sm text-[#758084]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Novi način */}
          <div className="bg-[#233137] rounded-[1.2rem] p-8 relative overflow-hidden">
            <div className="text-xs uppercase tracking-[3px] text-[#9aaeb5] mb-6 font-mono">Novi način</div>
            <div className="space-y-3">
              {NEW.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#9aaeb5]/20 border border-[#9aaeb5]/40 flex items-center justify-center text-[#9aaeb5] text-[10px] shrink-0">✓</span>
                  <span className="text-sm text-white/85">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor quote */}
        <div className="bg-white border border-[#f2f2f2] rounded-[1.2rem] p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#cddbe1]">
            <Image
              src="https://cdn.qoves.com/static/landing/images/home/new-approach/avatar.webp"
              alt="Dr. Gary Linkov"
              width={56}
              height={56}
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <blockquote className="text-sm text-[#515255] italic mb-1">
              „Oduševljen sam inovativnim pristupom estetskoj nezi koji NoarBeauty nudi."
            </blockquote>
            <div className="text-xs text-[#758084]">— Dr. Gary Linkov, Estetski hirurg, New York</div>
          </div>
        </div>
      </div>
    </section>
  );
}
