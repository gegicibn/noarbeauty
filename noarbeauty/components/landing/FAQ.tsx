"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Da li se moje fotografije čuvaju?",
    a: "Ne. Fotografije se obrađuju u realnom vremenu i brišu odmah po završetku analize. Čuvamo isključivo numeričke rezultate (merenja i ocene), ne same fotografije.",
  },
  {
    q: "Koliko je analiza precizna?",
    a: "MediaPipe Face Mesh detektuje 468 tačaka na licu sa sub-pixel preciznošću. Naše cefalometrijske formule su implementirane po Farkas (1994) i Powell (1984) standardima. Rezultati su informativni — ne zamenjuju konsultaciju sa stručnjakom.",
  },
  {
    q: "Zašto su potrebne 3 fotografije?",
    a: "Frontalna fotografija daje podatke o simetriji i frontalnim proporcijama. Levi i desni profil su neophodni za Powell analizu profila — nasolabijalni ugao, nazofrontalni ugao, projekciju brade i nosa.",
  },
  {
    q: "Hoće li analiza mog lica da me učini nesigurnim?",
    a: "Naš cilj je suprotan — da razumeš svoje lice na osnovu nauke, ne na osnovu subjektivnih komentara ili društvenih mreža. Korisnici prijavljuju veće samopouzdanje nakon što razumeju šta je zaista u pitanju.",
  },
  {
    q: "Na kojim jezicima je dostupan izveštaj?",
    a: "Izveštaj je dostupan na srpskom, bosanskom i engleskom jeziku. Možeš izabrati jezik pre nego što generišeš izveštaj.",
  },
  {
    q: "Šta je skin analiza?",
    a: "Koristimo specijalizovani AI koji se primenjuje u dermatološkim klinikama. Analizira teksturu, pore, hiperpigmentaciju, akne i hidrataciju iz fotografije.",
  },
  {
    q: "Mogu li koristiti kao plastični hirurg ili estetičar?",
    a: "Da. NoarBeauty analiza koristi iste cefalometrijske standarde (Farkas, Powell) koji se primenjuju u kliničkoj praksi. Kontaktiraj nas na kontakt@noarbeauty.ai za specijalnu ponudu za klinike.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#233137] tracking-tight mb-4">
            Česta <strong className="text-[#9aaeb5]">pitanja</strong>
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-[#f2f2f2] rounded-[1.2rem] overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#f9fbfb] transition-colors"
              >
                <span className="font-medium text-sm text-[#233137]">{faq.q}</span>
                <span
                  className={`text-[#9aaeb5] text-xl leading-none transition-transform duration-200 flex-shrink-0 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-[#515255] leading-relaxed border-t border-[#f2f2f2] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
