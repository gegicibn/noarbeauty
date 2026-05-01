export const metadata = { title: "Politika privatnosti — noarbeauty.ai" };

export default function PrivatnostPage() {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold mb-2">Politika privatnosti</h1>
      <p className="text-white/30 text-sm mb-10">Poslednja izmena: 1. januar 2025.</p>

      <section className="space-y-8 text-white/60 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-white mb-3">1. Podaci koje prikupljamo</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-white/80">Nalog:</strong> ime, email adresa, lozinka (hešovana)</li>
            <li><strong className="text-white/80">Fotografije:</strong> privremeno, isključivo za analizu</li>
            <li><strong className="text-white/80">Rezultati analize:</strong> numerički skorovi i merenja</li>
            <li><strong className="text-white/80">Podaci o korišćenju:</strong> posete stranicama, klikovi (PostHog, anonimizovano)</li>
            <li><strong className="text-white/80">Plaćanje:</strong> Stripe procesira transakcije — mi ne čuvamo podatke kartice</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">2. Kako koristimo tvoje podatke</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Pružanje usluge cefalometrijske analize</li>
            <li>Slanje rezultata analize na email</li>
            <li>Poboljšanje algoritama (samo anonimizovano)</li>
            <li>Komunikacija u vezi sa nalogom i pretplatom</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">3. Čuvanje fotografija</h2>
          <p>
            Fotografije se šifruju i čuvaju u privatnim Supabase Storage bucketima.
            Pristup je ograničen samo na tvoj nalog. Fotografije se automatski brišu
            nakon 90 dana od analize. Možeš zatražiti brisanje u svakom trenutku.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">4. Deljenje podataka sa trećim stranama</h2>
          <p className="mb-3">Koristimo sledeće pouzdane treće strane:</p>
          <div className="space-y-2">
            {[
              ["Supabase", "Baza podataka i autentifikacija", "EU serveri"],
              ["Stripe", "Procesiranje plaćanja", "GDPR usklađeno"],
              ["Anthropic (Claude)", "Generisanje AI izveštaja", "Bez trajnog čuvanja"],
              ["PostHog", "Analitika korišćenja", "Anonimizovano, EU hosting"],
              ["Resend", "Transakcioni emailovi", "GDPR usklađeno"],
            ].map(([name, purpose, note]) => (
              <div key={name} className="flex justify-between items-center p-3 bg-white/[0.03] rounded-lg">
                <div>
                  <div className="text-sm font-medium text-white/80">{name}</div>
                  <div className="text-xs text-white/40">{purpose}</div>
                </div>
                <span className="text-xs text-accent/60">{note}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">5. Tvoja prava (GDPR)</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Pristup svim podacima koje čuvamo</li>
            <li>Ispravka netačnih podataka</li>
            <li>Brisanje naloga i svih podataka ("pravo na zaborav")</li>
            <li>Prenosivost podataka (izvoz)</li>
            <li>Prigovor na obradu podataka</li>
          </ul>
          <p className="mt-3">
            Za ostvarivanje prava, kontaktiraj:{" "}
            <a href="mailto:privatnost@noarbeauty.ai" className="text-accent hover:text-accent/80">
              privatnost@noarbeauty.ai
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">6. Kolačići (Cookies)</h2>
          <p>
            Koristimo isključivo neophodne kolačiće za autentifikaciju sesije (Supabase)
            i anonimne analitičke kolačiće (PostHog). Ne koristimo reklamne kolačiće.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">7. Bezbednost</h2>
          <p>
            Svi podaci se prenose putem HTTPS veze. Lozinke se hešuju pomoću bcrypt algoritma.
            Fotografije se čuvaju u šifrovanim bucketima sa striktnim Row Level Security pravilima.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-3">8. Kontakt</h2>
          <p>
            Za pitanja o privatnosti:{" "}
            <a href="mailto:privatnost@noarbeauty.ai" className="text-accent hover:text-accent/80">
              privatnost@noarbeauty.ai
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
