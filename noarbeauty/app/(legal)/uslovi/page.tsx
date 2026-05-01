export const metadata = { title: "Uslovi korišćenja — noarbeauty.ai" };

export default function UsloviPage() {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold mb-2">Uslovi korišćenja</h1>
      <p className="text-white/30 text-sm mb-10">Poslednja izmena: 1. januar 2025.</p>

      <section className="space-y-8 text-white/60 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-white mb-3">1. Prihvatanje uslova</h2>
          <p>
            Korišćenjem platforme noarbeauty.ai prihvataš ove uslove korišćenja. Ako se ne slažeš
            sa uslovima, molimo te da ne koristiš uslugu.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">2. Opis usluge</h2>
          <p>
            noarbeauty.ai je AI platforma za cefalometrijsku analizu lica zasnovanu na
            Farkas (1994) i Powell (1984) antropometrijskim standardima. Analiza se vrši
            automatski korišćenjem MediaPipe Face Mesh i Claude AI modela.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">3. Medicinski disclaimer</h2>
          <p className="font-medium text-yellow-400/80 bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-4">
            Analiza noarbeauty.ai je isključivo informativne prirode i ne predstavlja
            medicinsku dijagnozu. Rezultati ne bi trebalo da se koriste kao osnova za
            medicinske, hirurške ili estetske odluke bez konsultacije sa licenciranim
            lekarom ili estetskim hirurgom.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">4. Fotografije i privatnost</h2>
          <p>
            Fotografije koje učitaš koriste se isključivo za jednokratnu analizu lica.
            Čuvaju se privremeno u šifrovanim Supabase Storage bucketima i automatski se
            brišu nakon 90 dana. Nikada ne delimo tvoje fotografije sa trećim stranama.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">5. Ograničenje odgovornosti</h2>
          <p>
            noarbeauty.ai ne preuzima odgovornost za bilo kakve psihološke, emocionalne
            ili fizičke posledice koje mogu nastati kao rezultat korišćenja naše analize.
            Korisnici koriste platformu na sopstvenu odgovornost.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">6. Plaćanje i pretplata</h2>
          <p>
            Besplatni plan uključuje 2 analize. Pro i Elite planovi se naplaćuju mesečno
            putem Stripe platforme. Otkaz pretplate stupa na snagu na kraju tekućeg
            obračunskog perioda.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">7. Intelektualna svojina</h2>
          <p>
            Sav sadržaj, dizajn i algoritmi noarbeauty.ai su vlasništvo platforme.
            AI izveštaji generisani za tvoje fotografije su tvoje vlasništvo i možeš
            ih koristiti za lične svrhe.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">8. Izmene uslova</h2>
          <p>
            Zadržavamo pravo izmene ovih uslova. Korisnici će biti obavešteni o
            značajnim izmenama putem emaila ili obaveštenja na platformi.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">9. Kontakt</h2>
          <p>
            Za pitanja o uslovima korišćenja, kontaktiraj nas na:{" "}
            <a href="mailto:podrska@noarbeauty.ai" className="text-accent hover:text-accent/80">
              podrska@noarbeauty.ai
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
