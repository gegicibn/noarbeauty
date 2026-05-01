export const metadata = { title: "Kontakt — noarbeauty.ai" };

export default function KontaktPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Kontakt</h1>
      <p className="text-white/40 text-sm mb-10">Za Elite plan i poslovnu saradnju</p>

      <div className="space-y-4">
        <div className="card p-6">
          <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Email</div>
          <a href="mailto:prodaja@noarbeauty.ai" className="text-accent hover:text-accent/80 font-medium">
            prodaja@noarbeauty.ai
          </a>
        </div>

        <div className="card p-6">
          <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Elite plan uključuje</div>
          <ul className="space-y-2 text-sm text-white/60 mt-2">
            {[
              "Morph vizualizacija (Replicate/FLUX)",
              "Pre/after slider u izveštaju",
              "Landmark overlay u PDF-u",
              "API pristup za klinike",
              "White-label opcija",
              "Prioritetna tehnička podrška",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Podrška</div>
          <a href="mailto:podrska@noarbeauty.ai" className="text-accent hover:text-accent/80 text-sm">
            podrska@noarbeauty.ai
          </a>
          <p className="text-xs text-white/30 mt-2">Odgovaramo u roku od 24h</p>
        </div>
      </div>
    </div>
  );
}
