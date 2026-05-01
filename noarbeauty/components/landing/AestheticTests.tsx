import Image from "next/image";

const CDN = "https://cdn.qoves.com/static/landing/images/home/aesthetics-tests";

const GROUPS = [
  { name: "Opšta analiza",  count: 8,  icon: "face-shape.webp",  items: ["Prvi utisak", "Maskulinost/femininost", "Prosečnost lica", "Proporcije", "Simetrija", "Mladalačkost", "Oblik lica", "Harmonija crta"] },
  { name: "Obrve",          count: 14, icon: "eyebrows.webp",    items: ["Oblik obrva", "Debljina", "Pozicija", "Boja", "Gustoća", "Simetrija", "Podizanje", "Nagib", "Interbrow razmak", "Rep obrve", "+4 više"] },
  { name: "Oči",            count: 26, icon: "eyes.webp",        items: ["Oblik oka", "Veličina", "Širina", "Boja šarenice", "Simetrija", "Gornji kapak", "Donji kapak", "Canthal tilt", "Interkantalni razmak", "Epikantni nabor", "+16 više"] },
  { name: "Nos",            count: 17, icon: "nose.webp",        items: ["Oblik nosa", "Širina", "Širina mosta", "Simetrija", "Nostrili", "Definicija vrha", "Projekcija", "Nazofrontalni ugao", "Nasolabijalni ugao", "+8 više"] },
  { name: "Usne",           count: 16, icon: "lips.webp",        items: ["Oblik usana", "Punoća", "Gornja/donja usna", "Cupid's bow", "Širina", "Proporcija", "Projekcija", "Philtrum", "+8 više"] },
  { name: "Obrazi",         count: 13, icon: "cheeks.webp",      items: ["Projekcija jagodičnih kostiju", "Oblik", "Definicija", "Pozicija", "Punoća obra", "Visina", "Balans", "+6 više"] },
  { name: "Vilica",         count: 11, icon: "jaw.webp",         items: ["Oblik vilice (frontalno)", "Oblik (profil)", "Definicija", "Širina", "Dužina", "Kontrast", "Simetrija", "Jaw-to-face", "+3 više"] },
  { name: "Brada",          count: 8,  icon: "chin.webp",        items: ["Oblik brade", "Projekcija", "Širina", "Visina", "Kontura", "Dimple", "Nagib", "Punoća"] },
  { name: "Osmeh",          count: 13, icon: "smile.webp",       items: ["Oblik osmeha", "Vidljivost zuba", "Boja zuba", "Poravnanje", "Simetrija", "Uzdizanje ugla", "+7 više"] },
  { name: "Koža",           count: 20, icon: "skin.webp",        items: ["Ton kože", "Podnijansa", "Glatkoća", "Ravnomernost", "Akne", "Hiperpigmentacija", "Pore", "Fine linije", "Bore", "+11 više"] },
  { name: "Uši",            count: 12, icon: "ear.webp",         items: ["Oblik uha", "Veličina", "Projekcija", "Ugao", "Postavljenost", "Simetrija", "+6 više"] },
  { name: "Vrat",           count: 11, icon: "neck.webp",        items: ["Oblik vrata", "Definicija", "Submentalna mast", "Tonus", "Dužina", "Širina", "+5 više"] },
];

export default function AestheticTests() {
  return (
    <section className="py-28 bg-[#f9fbfb]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-4xl md:text-5xl font-black text-[#233137]">160+</span>
            <span className="text-4xl md:text-5xl font-black text-[#9aaeb5]">estetskih testova</span>
          </div>
          <p className="text-[#758084] max-w-lg mx-auto text-sm leading-relaxed">
            Sledeći testovi su uključeni u tvoju NoarBeauty analizu.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#9aaeb5]">
            <span>Od kuće</span>
            <span>·</span>
            <span>Testira se jednom godišnje</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GROUPS.map(({ name, count, icon, items }) => (
            <div key={name} className="bg-white border border-[#f2f2f2] rounded-[1.2rem] p-6 hover:border-[#9aaeb5]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f2f5f5] overflow-hidden flex items-center justify-center">
                    <Image src={`${CDN}/${icon}`} alt={name} width={32} height={32} className="object-cover" unoptimized />
                  </div>
                  <h3 className="font-semibold text-sm text-[#233137]">{name}</h3>
                </div>
                <span className="text-[10px] font-mono text-[#9aaeb5] bg-[#9aaeb5]/10 px-2 py-0.5 rounded-full">
                  {count} testova
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="text-[10px] text-[#758084] bg-[#f2f5f5] px-2 py-0.5 rounded-full">
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
