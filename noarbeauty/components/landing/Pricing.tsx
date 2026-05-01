import Link from "next/link";

const plans = [
  {
    name: "Besplatno",
    price: "0",
    period: "/mesečno",
    desc: "Za upoznavanje sa alatom",
    features: [
      { text: "2 analize mesečno", ok: true },
      { text: "Osnovna simetrija analiza", ok: true },
      { text: "Oblik lica", ok: true },
      { text: "Ukupna ocena", ok: true },
      { text: "Farkas / Powell merenja", ok: false },
      { text: "Skin analiza (Haut.AI)", ok: false },
      { text: "Claude AI izveštaj", ok: false },
      { text: "PDF export", ok: false },
      { text: "Morph vizualizacija", ok: false },
    ],
    cta: "Počni besplatno",
    href: "/sign-up",
    featured: false,
  },
  {
    name: "Pro",
    price: "990",
    period: "/mesečno",
    desc: "Za ozbiljnu analizu",
    features: [
      { text: "Neograničene analize", ok: true },
      { text: "Sva cefalometrijska merenja", ok: true },
      { text: "Farkas + Powell standardi", ok: true },
      { text: "Skin analiza (Haut.AI)", ok: true },
      { text: "Claude AI izveštaj (srp/eng)", ok: true },
      { text: "PDF export izveštaja", ok: true },
      { text: "Canthal tilt + jawline", ok: true },
      { text: "Percentil rang", ok: true },
      { text: "Morph vizualizacija", ok: false },
    ],
    cta: "Uzmi Pro",
    href: "/sign-up?plan=pro",
    featured: true,
  },
  {
    name: "Elite",
    price: "2490",
    period: "/mesečno",
    desc: "Za klinike i profesionalce",
    features: [
      { text: "Sve iz Pro plana", ok: true },
      { text: "Morph vizualizacija (Replicate)", ok: true },
      { text: "Pre/after slider", ok: true },
      { text: "Landmark overlay PDF", ok: true },
      { text: "API pristup", ok: true },
      { text: "White-label opcija", ok: true },
      { text: "Prioritetna podrška", ok: true },
      { text: "Klinička lookup tabela", ok: true },
      { text: "Bulk analiza", ok: true },
    ],
    cta: "Kontaktiraj nas",
    href: "/kontakt",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="cene" className="py-28 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="badge mb-4">Cene</div>
          <h2 className="section-title mb-4">Jednostavne, transparentne cene</h2>
          <p className="text-white/40">Bez skrivenih troškova. Otkaži u bilo kom trenutku.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-8 relative flex flex-col ${
                plan.featured
                  ? "border-accent/50 bg-gradient-to-b from-accent/5 to-transparent"
                  : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="btn-primary text-xs px-4 py-1.5">Najpopularnije</span>
                </div>
              )}
              <div className="mb-6">
                <div className="text-sm text-white/40 mb-1">{plan.name}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-white/30 mb-1">RSD{plan.period}</span>
                </div>
                <p className="text-xs text-white/30">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className={`text-sm flex items-center gap-2 ${f.ok ? "text-white/70" : "text-white/20"}`}>
                    <span className={f.ok ? "text-accent" : ""}>{f.ok ? "✓" : "✗"}</span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={plan.featured ? "btn-primary justify-center" : "btn-outline justify-center"}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
