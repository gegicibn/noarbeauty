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
    q: "Na kojim jezicima je dostupan izveštaj?",
    a: "Izveštaj je dostupan na srpskom, bosanskom i engleskom jeziku. Možeš izabrati jezik pre nego što generišeš izveštaj.",
  },
  {
    q: "Šta je Haut.AI skin analiza?",
    a: "Haut.AI je specijalizovani API za analizu kože koji se koristi u dermatološkim klinikama. Analizira teksturu, pore, hiperpigmentaciju, akne i hidrataciju iz fotografije.",
  },
  {
    q: "Šta je morph vizualizacija?",
    a: "Koristeći Replicate API sa FLUX i InstantID modelima, generišemo vizualizaciju kako bi vaše lice izgledalo sa predloženim estetskim promenama — bez operacije, samo da vidite potencijal.",
  },
  {
    q: "Mogu li koristiti kao plastični hirurg ili estetičar?",
    a: "Da. Elite plan uključuje white-label opciju, API pristup i kliničke lookup tabele. Kontaktiraj nas za demo i specijalnu ponudu za klinike.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="badge mb-4">FAQ</div>
          <h2 className="section-title mb-4">Česta pitanja</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
              >
                <span className="font-medium text-sm">{faq.q}</span>
                <span
                  className={`text-accent text-xl leading-none transition-transform duration-200 flex-shrink-0 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-white/45 leading-relaxed border-t border-white/[0.04] pt-4">
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
