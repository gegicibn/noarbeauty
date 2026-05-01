const GROUPS = [
  {
    name: "Opšta analiza",
    count: 8,
    items: ["Prvi utisak", "Maskulinost/femininost", "Prosečnost lica", "Proporcije", "Simetrija", "Mladalačkost", "Oblik lica", "Harmonija crta"],
  },
  {
    name: "Obrve",
    count: 14,
    items: ["Oblik obrva", "Debljina", "Pozicija", "Boja", "Gustoća", "Simetrija", "Podizanje", "Nagib", "Interbrow razmak", "Rep obrve", "+4 više"],
  },
  {
    name: "Oči",
    count: 26,
    items: ["Oblik oka", "Veličina", "Širina", "Boja šarenice", "Simetrija", "Gornji kapak", "Donji kapak", "Canthal tilt", "Interkantalní razmak", "Epikantni nabor", "+16 više"],
  },
  {
    name: "Nos",
    count: 17,
    items: ["Oblik nosa", "Širina", "Širina mosta", "Simetrija", "Nostrili", "Definicija vrha", "Projekcija", "Nazofrontalni ugao", "Nasolabijalni ugao", "+8 više"],
  },
  {
    name: "Usne",
    count: 16,
    items: ["Oblik usana", "Punoća", "Gornja/donja usna", "Cupid's bow", "Širina", "Proporcija", "Projekcija", "Philtrum", "+8 više"],
  },
  {
    name: "Obrazi",
    count: 13,
    items: ["Projekcija jagodičnih kostiju", "Oblik", "Definicija", "Pozicija", "Punoća obra", "Visina", "Balans", "+6 više"],
  },
  {
    name: "Vilica",
    count: 11,
    items: ["Oblik vilice (frontalno)", "Oblik (profil)", "Definicija", "Širina", "Dužina", "Kontrast", "Simetrija", "Jaw-to-face", "+3 više"],
  },
  {
    name: "Brada",
    count: 8,
    items: ["Oblik brade", "Projekcija", "Širina", "Visina", "Kontura", "Dimple", "Nagib", "Punoća"],
  },
  {
    name: "Osmeh",
    count: 13,
    items: ["Oblik osmeha", "Vidljivost zuba", "Boja zuba", "Poravnanje", "Simetrija", "Uzdizanje ugla", "+7 više"],
  },
  {
    name: "Koža",
    count: 20,
    items: ["Ton kože", "Podnijansa", "Glatkoća", "Ravnomernost", "Akne", "Hiperpigmentacija", "Pore", "Fine linije", "Bore", "+11 više"],
  },
  {
    name: "Uši",
    count: 12,
    items: ["Oblik uha", "Veličina", "Projekcija", "Ugao", "Postavljenost", "Simetrija", "+6 više"],
  },
  {
    name: "Vrat",
    count: 11,
    items: ["Oblik vrata", "Definicija", "Submentalna mast", "Tonus", "Dužina", "Širina", "+5 više"],
  },
];

export default function AestheticTests() {
  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-4xl md:text-5xl font-black text-white">160+</span>
            <span className="text-4xl md:text-5xl font-black text-[#c9a96e]">estetskih testova</span>
          </div>
          <p className="text-[#666] max-w-lg mx-auto text-sm leading-relaxed">
            Sledeći testovi su uključeni u tvoju NoarBeauty analizu.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#444]">
            <span>📍 Od kuće</span>
            <span>·</span>
            <span>🔄 Testira se jednom godišnje</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GROUPS.map(({ name, count, items }) => (
            <div key={name} className="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 hover:border-[#c9a96e]/15 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">{name}</h3>
                <span className="text-[10px] font-mono text-[#c9a96e] bg-[#c9a96e]/10 px-2 py-0.5 rounded-full">
                  {count} testova
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="text-[10px] text-[#555] bg-white/[0.03] px-2 py-0.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
