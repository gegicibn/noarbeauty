const CATEGORIES = [
  {
    title: "Karijera",
    items: [
      { headline: "Viša plata", body: "Atraktivni ljudi zarađuju 10–15% više", cite: "Hamermesh & Biddle, 1994, American Economic Review" },
      { headline: "Lakši intervjui", body: "Atraktivni kandidati se percipiraju kao kompetentniji", cite: "Puleo, 2006, Journal of Undergraduate Psychological Research" },
      { headline: "Više prodaje", body: "Kupci su 55% skloniji kupovini od atraktivnih prodavaca", cite: "Reingen & Kernan, 1993, Journal of Consumer Psychology" },
      { headline: "Više napredovanja", body: "Atraktivni zaposleni češće dobijaju promocije", cite: "Morrow et al., 1990, Journal of Management" },
    ],
  },
  {
    title: "Romantični život",
    items: [
      { headline: "Više swipe-ova", body: "Na dating aplikacijama, izgled je 9× važniji od opisa", cite: "Witmer et al., 2025, Computers in Human Behavior" },
      { headline: "Više drugog dejta", body: "Izgled dosljedno predviđa uspeh na speed-datingu", cite: "Eastwick & Finkel, 2008" },
      { headline: "Privlačniji partneri", body: "Atraktivni ljudi završavaju sa atraktivnijim partnerima", cite: "Luo, 2017, Social & Personality Psychology" },
    ],
  },
  {
    title: "Društveni život",
    items: [
      { headline: "Više lidera", body: "Atraktivni političari dobijaju više glasova", cite: "Jaeger et al., 2021, Social Psychology" },
      { headline: "Bolje mreže", body: "Atraktivni grade gušće društvene mreže", cite: "O'Connor & Gladstone, 2018, Social Networks" },
      { headline: "Više pratilaca", body: "Atraktivni dobijaju više pozitivnog angažmana na društvenim mrežama", cite: "Gladstone & O'Connor, 2013" },
    ],
  },
  {
    title: "Zdravlje",
    items: [
      { headline: "Bolje lečenje", body: "Lekari greše 3.67× više kod neatraktivnih pacijenata", cite: "Tsiga et al., 2016, European Journal for Person Centered Healthcare" },
      { headline: "Duži život", body: "Atraktivni žive duže", cite: "Henderson & Anglin, 2003, Evolution and Human Behavior" },
      { headline: "Zdraviji stil", body: "Aktivnosti koje te čine atraktivnijim su uglavnom zdrave", cite: "Arnocky & Davis, 2024, Frontiers in Psychology" },
    ],
  },
];

export default function WhyGlowUp() {
  return (
    <section id="zasto-glowup" className="py-28 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Tvoj izgled utiče na tvoj život<br />na više načina
          </h2>
          <p className="text-[#666] max-w-2xl mx-auto text-sm leading-relaxed">
            Istraživanja dosledno pokazuju raznolike, dalekosežne prednosti fizičke
            atraktivnosti. Ispod je detaljna zbirka studija koja ove prednosti ilustruje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map(({ title, items }) => (
            <div key={title} className="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[3px] text-[#c9a96e] mb-5">
                {title}
              </h3>
              <div className="space-y-4">
                {items.map(({ headline, body, cite }) => (
                  <div key={headline} className="pb-4 border-b border-white/[0.04] last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span className="text-[#c9a96e] mt-0.5 text-xs">✦</span>
                      <div>
                        <div className="text-sm font-semibold mb-0.5">{headline}</div>
                        <div className="text-xs text-[#888] mb-1">{body}</div>
                        <div className="text-[10px] text-[#444] italic">{cite}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
