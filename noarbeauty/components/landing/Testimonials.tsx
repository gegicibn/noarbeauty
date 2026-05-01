const TESTIMONIALS = [
  {
    name: "Martin V.",
    location: "Holandija",
    text: "Dobio sam detaljan plan za unapređenje simetrije lica. Pratio sam ga 6 meseci i razlika je neverovatna. Konačno znam šta tačno treba da radim.",
    score: 88,
  },
  {
    name: "Esme K.",
    location: "Irska",
    text: "Analiza mi je otvorila oči. Nikad nisam znala da imam blagu asimetriju jagodičnih kostiju. Vežbe i tretmani koje su preporučili zaista rade.",
    score: 84,
  },
  {
    name: "Leah M.",
    location: "Irska",
    text: "Impresionirana sam dubinom analize. Svaka crta lica je detaljno opisana sa naučnim obrazloženjem. Osećam se kao da sam bila kod vrhunskog estetskog hirurga.",
    score: 91,
  },
  {
    name: "Josefine A.",
    location: "Švedska",
    text: "Koristim NoarBeauty već godinu dana. Napredak koji vidim u ogledalu je stvaran. Plan je bio tačno prilagođen mom licu, nije generički.",
    score: 86,
  },
  {
    name: "Germain B.",
    location: "Francuska",
    text: "Kao neko ko se bavi fotografijom, znam kako izgled utiče na percepciju. Ova analiza mi je dala konkretne korake koji su promenili način na koji izgledám na fotkama.",
    score: 89,
  },
  {
    name: "Anita W.",
    location: "Poljska",
    text: "Bila sam skeptična, ali rezultati su me ubedili. Analiza obrva i vilice bila je apsolutno precizna. Preporuke su bile specifične i primenljive.",
    score: 83,
  },
  {
    name: "Henkie D.",
    location: "Holandija",
    text: "160+ testova zvuči puno, ali kad vidiš izveštaj, svaki ima smisla. Skor maskulinosti i preporuke za definiciju vilice su mi pomogli da fokusiram trening.",
    score: 87,
  },
  {
    name: "Erica S.",
    location: "Švajcarska",
    text: "Koristila sam mnoge beauty aplikacije, ali ovo je jedina koja se zasniva na stvarnoj nauci. Citiraju studije, objašnjavaju standarde. Promenilo mi je pristup nezi lica.",
    score: 92,
  },
  {
    name: "Laverne T.",
    location: "SAD",
    text: "Posle analize sam razumela zašto neke stvari koje sam probala nisu radile. Plan je bio potpuno drugačiji od svega što sam čitala online. I zaista funkcioniše.",
    score: 85,
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[4px] text-[#c9a96e] mb-4">Iskustva</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Pridruži se 20.000+ ljudi i<br />počni svoju transformaciju
          </h2>
          <p className="text-[#666] max-w-lg mx-auto text-sm leading-relaxed">
            Pravi rezultati od pravih ljudi koji su koristili NoarBeauty analizu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map(({ name, location, text, score }) => (
            <div key={name} className="bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{name}</div>
                  <div className="text-[11px] text-[#555] mt-0.5">{location}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-[#c9a96e]">{score}</div>
                  <div className="text-[9px] text-[#444] uppercase tracking-widest">skor</div>
                </div>
              </div>
              <p className="text-xs text-[#666] leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#c9a96e] text-xs">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
