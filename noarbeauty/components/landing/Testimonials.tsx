const TESTIMONIALS = [
  { name: "Martin V.",      location: "Holandija",  text: "Dobio sam detaljan plan za unapređenje simetrije lica. Pratio sam ga 6 meseci i razlika je neverovatna. Konačno znam šta tačno treba da radim." },
  { name: "Esme MacCann",   location: "Irska",      text: "Volim ovo. Odradili su neverovatnu stvar! Hvala još jednom." },
  { name: "Leah O'Dargan",  location: "Irska",      text: "Mislila sam da je ovo toksično, ali mi je iz nekog čudnog razloga povećalo samopouzdanje. Daje ti sjajno razumevanje tvojih crta što je važno u društvu gde svako lice počinje da izgleda isto." },
  { name: "Josefine Bloch", location: "Švedska",    text: "Moje lice izgleda ženstveno. Sviđa mi se što NoarBeauty promoviše mnogo malih promena umesto velikih — to volim." },
  { name: "Germain B.",     location: "Francuska",  text: "Bio sam jedan od prvih fanova još 2020. i proizvod se toliko razvio. Verzija 2.0 je veoma korisna i jasno vidim promene na svom licu." },
  { name: "Anita W.",       location: "Poljska",    text: "Ovaj proizvod je neverovatан. Svi žele glow-up sada — ovo je #1 najbolji alat za to." },
  { name: "Henkie Stobben", location: "Holandija",  text: "Bio sam skeptičan u početku, ali analiza lica je veoma kompletna." },
  { name: "Erica Klee",     location: "Švajcarska", text: "Osvežavajuće je dobiti iskrene savete koji nisu vođeni trendovima već pravom naukom." },
  { name: "Laverne J.",     location: "SAD",        text: "Godinama sam bila nesigurna zbog vilice i NoarBeauty mi je dao odlične savete koji su zaista promenili moj izgled." },
];

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-28 bg-[#f9fbfb] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#233137] tracking-tight mb-5">
            Pridruži se <strong className="text-[#9aaeb5]">20.000+ ljudi</strong><br />
            i počni svoju transformaciju
          </h2>
          <p className="text-[#758084] max-w-lg mx-auto text-sm leading-relaxed">
            Pravi rezultati od pravih ljudi koji su koristili NoarBeauty analizu.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex gap-4 animate-marquee">
          {doubled.map(({ name, location, text }, i) => (
            <div
              key={i}
              className="shrink-0 w-[38rem] bg-white border border-[#f2f2f2] rounded-[1.2rem] p-6"
            >
              <div className="mb-4">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                  <path d="M0 24V14.4C0 10.56 0.96 7.28 2.88 4.56C4.88 1.84 7.68 0.16 11.28 0L12.48 2.16C10.08 2.72 8.24 3.92 6.96 5.76C5.76 7.52 5.16 9.44 5.16 11.52H10.8V24H0ZM19.2 24V14.4C19.2 10.56 20.16 7.28 22.08 4.56C24.08 1.84 26.88 0.16 30.48 0L31.68 2.16C29.28 2.72 27.44 3.92 26.16 5.76C24.96 7.52 24.36 9.44 24.36 11.52H30V24H19.2Z" fill="#CDDBE1"/>
                </svg>
              </div>
              <p className="text-sm text-[#515255] leading-relaxed mb-6 flex-1">{text}</p>
              <div>
                <div className="text-base font-semibold text-[#233137]">{name}</div>
                <div className="text-sm text-[#758084]">{location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}} />
    </section>
  );
}
