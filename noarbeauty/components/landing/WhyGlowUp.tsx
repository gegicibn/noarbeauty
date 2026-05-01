"use client";
import { useState } from "react";

const CATEGORIES = [
  {
    id: "finansije",
    label: "Finansije",
    items: [
      { headline: "Viša plata", body: "Atraktivni ljudi zarađuju 10–15% više od proseka", cite: "Hamermesh & Biddle, 1994, American Economic Review" },
      { headline: "Lakši intervjui", body: "Atraktivni kandidati se percipiraju kao kompetentniji i dobijaju više ponuda", cite: "Puleo, 2006, Journal of Undergraduate Psychological Research" },
      { headline: "Više prodaje", body: "Kupci su 55% skloniji kupovini od atraktivnih prodavaca", cite: "Reingen & Kernan, 1993, Journal of Consumer Psychology" },
      { headline: "Više napredovanja", body: "Atraktivni zaposleni češće dobijaju promocije bez obzira na kompetencije", cite: "Morrow et al., 1990, Journal of Management" },
    ],
  },
  {
    id: "randisanje",
    label: "Randisanje",
    items: [
      { headline: "Više swipe-ova", body: "Na dating aplikacijama, izgled je 9× važniji od opisa profila", cite: "Witmer et al., 2025, Computers in Human Behavior" },
      { headline: "Više drugog dejta", body: "Fizički izgled dosljedno predviđa uspeh na speed-datingu", cite: "Eastwick & Finkel, 2008, Journal of Personality and Social Psychology" },
      { headline: "Privlačniji partneri", body: "Atraktivni ljudi završavaju u vezama sa atraktivnijim partnerima", cite: "Luo, 2017, Social & Personality Psychology Compass" },
    ],
  },
  {
    id: "socijalizacija",
    label: "Socijalizacija",
    items: [
      { headline: "Više glasova", body: "Atraktivniji politički kandidati dobijaju više glasova na izborima", cite: "Jaeger et al., 2021, Social Psychology" },
      { headline: "Bolje mreže", body: "Atraktivni ljudi grade gušće i korisnije društvene mreže", cite: "O'Connor & Gladstone, 2018, Social Networks" },
      { headline: "Više pratilaca", body: "Atraktivni dobijaju više pozitivnog angažmana na društvenim mrežama", cite: "Gladstone & O'Connor, 2013, Social Science Research" },
    ],
  },
  {
    id: "zdravlje",
    label: "Zdravlje",
    items: [
      { headline: "Bolje lečenje", body: "Lekari greše 3.67× više pri dijagnozi manje atraktivnih pacijenata", cite: "Tsiga et al., 2016, European Journal for Person Centered Healthcare" },
      { headline: "Duži život", body: "Atraktivni žive statistički duže od manje atraktivnih", cite: "Henderson & Anglin, 2003, Evolution and Human Behavior" },
      { headline: "Zdraviji stil", body: "Aktivnosti koje te čine atraktivnijim su uglavnom zdravije", cite: "Arnocky & Davis, 2024, Frontiers in Psychology" },
    ],
  },
  {
    id: "obrazovanje",
    label: "Obrazovanje",
    items: [
      { headline: "Bolje ocene", body: "Atraktivnija deca dobijaju više pažnje i pozitivnih ocena od nastavnika", cite: "Clifford & Walster, 1973, Sociology of Education" },
      { headline: "Veće mogućnosti", body: "Atraktivni studenti češće dobijaju stipendije i prilike", cite: "Zebrowitz et al., 1998, Personality and Social Psychology Bulletin" },
      { headline: "Bolji mentori", body: "Profesori ulažu više truda u atraktivne studente", cite: "Karamarkar & Feinstein, 2019, Journal of Educational Psychology" },
    ],
  },
  {
    id: "pravo",
    label: "Pravo",
    items: [
      { headline: "Niže kazne", body: "Atraktivni optuženi dobijaju statistički niže novčane kazne na sudu", cite: "Downs & Lyons, 1991, Personality and Social Psychology Bulletin" },
      { headline: "Manji rizik", body: "Atraktivni osumnjičeni manje verovatno bivaju pritvoreni pre suđenja", cite: "Macnamara et al., 2020, Law and Human Behavior" },
      { headline: "Bolja odbrana", body: "Porote češće glasaju za oslobađanje atraktivnijih optuženih", cite: "Stewart, 1980, Journal of Applied Social Psychology" },
    ],
  },
  {
    id: "uticaj",
    label: "Uticaj",
    items: [
      { headline: "Veći kredibilitet", body: "Atraktivni govornici se percipiraju kao pouzdaniji i stručniji", cite: "Chaiken, 1979, Journal of Personality and Social Psychology" },
      { headline: "Više pratilaca", body: "Atraktivni kreatori sadržaja imaju u proseku više pratilaca i angažmana", cite: "Gladstone & O'Connor, 2013, Social Science Research" },
      { headline: "Veće donacije", body: "Atraktivni sakupljači dobrovoljnih priloga prikupljaju znatno više novca", cite: "Andreoni & Petrie, 2008, Journal of Public Economics" },
    ],
  },
  {
    id: "sreca",
    label: "Sreća",
    items: [
      { headline: "Veće samopouzdanje", body: "Atraktivni imaju statistički veće samopoštovanje i manje anksioznosti", cite: "Feingold, 1992, Psychological Bulletin" },
      { headline: "Bolje mentalno zdravlje", body: "Atraktivnost je pozitivno korelisana sa mentalnim zdravljem tokom života", cite: "Hamermesh & Abrevaya, 2013, Journal of Health Economics" },
      { headline: "Više zadovoljstva", body: "Atraktivni people prijavljuju veće zadovoljstvo životom i odnosi su im bolji", cite: "Stutzer, 2007, Scandinavian Journal of Economics" },
    ],
  },
];

export default function WhyGlowUp() {
  const [active, setActive] = useState("finansije");
  const current = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="zasto-glowup" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center border border-[#c7d1d54d] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs uppercase tracking-[3px] text-[#515255]">Istraživanja</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233137] tracking-tight mb-5">
            Tvoj izgled utiče na tvoj život<br />
            <strong className="text-[#9aaeb5] font-bold">na više načina</strong>
          </h2>
          <p className="text-[#758084] max-w-xl mx-auto text-sm leading-relaxed">
            Istraživanja dosledno pokazuju dalekosežne prednosti fizičke atraktivnosti.
            Ovo je naučno potvrđeno — ne naša mišljenja.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                active === id
                  ? "bg-[#233137] text-white border-[#233137]"
                  : "bg-white text-[#515255] border-[#e8e8e8] hover:border-[#9aaeb5] hover:text-[#233137]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {current.items.map(({ headline, body, cite }) => (
            <div key={headline} className="bg-white border border-[#f2f2f2] rounded-[1.2rem] p-6 hover:border-[#9aaeb5]/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-[#9aaeb5] mt-0.5">✦</span>
                <div>
                  <div className="text-sm font-semibold text-[#233137] mb-1">{headline}</div>
                  <div className="text-xs text-[#515255] leading-relaxed mb-2">{body}</div>
                  <div className="text-[10px] text-[#758084] italic">{cite}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
