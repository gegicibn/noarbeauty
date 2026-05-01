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
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Novi način glow-up-a
          </h2>
          <p className="text-[#666] max-w-xl mx-auto text-sm leading-relaxed">
            Istraživanja pokazuju da tvoj izgled utiče na skoro sve — od karijere do
            romantičnog života. Nažalost, većina ljudi gubi vreme na „poboljšanja"
            koja ne odgovaraju njihovom jedinstvenom licu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Stari način */}
          <div className="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-8">
            <div className="text-xs uppercase tracking-[3px] text-[#444] mb-6">Stari način</div>
            <div className="space-y-3">
              {OLD.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-[#333] flex items-center justify-center text-[#444] text-[10px] shrink-0">✕</span>
                  <span className="text-sm text-[#555]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Novi način */}
          <div className="bg-[#0d0d0d] border border-[#c9a96e]/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[3px] text-[#c9a96e] mb-6">Novi način</div>
              <div className="space-y-3">
                {NEW.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] text-[10px] shrink-0">✓</span>
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-10 text-center">
          <blockquote className="text-[#666] text-sm italic max-w-xl mx-auto">
            „Oduševljen sam inovativnim pristupom estetskoj nezi."
          </blockquote>
          <div className="text-[#444] text-xs mt-2">— Dr. Aleksandar Mitić, Estetski hirurg</div>
        </div>
      </div>
    </section>
  );
}
