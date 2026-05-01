export const metadata = { title: "Medicinski disclaimer — noarbeauty.ai" };

export default function DisclaimerPage() {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold mb-2">Medicinski disclaimer</h1>
      <p className="text-white/30 text-sm mb-10">Poslednja izmena: 1. januar 2025.</p>

      <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-2xl p-6 mb-10">
        <div className="text-yellow-400 font-semibold mb-2">⚠️ Važno upozorenje</div>
        <p className="text-white/70 leading-relaxed">
          Analiza noarbeauty.ai je isključivo informativne prirode i ne predstavlja medicinsku
          dijagnozu. Rezultati su zasnovani na matematičkim proporcijama i statističkim normativima,
          a ne na medicinskim kriterijumima.
        </p>
      </div>

      <section className="space-y-8 text-white/60 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-white mb-3">Šta naša analiza radi</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Meri proporcije lica prema Farkas (1994) i Powell (1984) antropometrijskim standardima</li>
            <li>Poredi rezultate sa statističkim prosecima za različite etničke grupe</li>
            <li>Generiše personalizovani AI izveštaj baziran na dobijenim merenjima</li>
            <li>Vizualizuje potencijalne estetske sugestije (opciono)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">Šta naša analiza NE radi</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Ne dijagnostikuje medicinska stanja ili poremećaje</li>
            <li>Ne preporučuje specifične medicinske ili hirurške procedure</li>
            <li>Ne procenjuje zdravstveno stanje</li>
            <li>Ne zamenjuje konsultaciju sa lekarom ili estetskim hirurgom</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">Ograničenja algoritma</h2>
          <p>
            Naša analiza koristi automatsko prepoznavanje lica i ima inherentne tehničke ograničenja:
          </p>
          <ul className="space-y-2 list-disc list-inside mt-3">
            <li>Tačnost zavisi od kvaliteta fotografije i osvetljenja</li>
            <li>Algoritam može imati grešku merenja od ±5-10%</li>
            <li>Fotografije napravljene pod različitim uglovima mogu davati različite rezultate</li>
            <li>Standardi lepote su kulturno i istorijski relativni — naši normativi su samo jedan od pristupa</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">Preporuka</h2>
          <p>
            Ako razmišljaš o estetskim zahvatima, obavezno se konsultuj sa licenciranim estetskim
            hirurgom ili dermatologom. Naša analiza može biti polazna tačka za razgovor, ali ne
            treba da bude jedini osnov za odluku.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">Psihološko blagostanje</h2>
          <p>
            Cefalometrijska analiza meri proporcije — ne atraktivnost, vrednost, ili privlačnost
            osobe. Lepota je multidimenzionalna i nadilazi matematičke proporcije. Ako ti analiza
            izaziva negativne emocije, preporučujemo razgovor sa psihologom ili psihoterapeutom.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">Kontakt</h2>
          <p>
            Za pitanja u vezi sa analizom:{" "}
            <a href="mailto:podrska@noarbeauty.ai" className="text-accent hover:text-accent/80">
              podrska@noarbeauty.ai
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
