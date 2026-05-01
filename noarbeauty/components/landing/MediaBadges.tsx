const LOGOS = [
  "USA Today", "The Guardian", "Daily Mail", "Business Insider",
  "GQ", "Wired", "Cosmopolitan", "MIT Technology Review",
];

export default function MediaBadges() {
  return (
    <section className="py-12 bg-white border-b border-[#f2f2f2]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-[10px] uppercase tracking-[4px] text-[#758084] mb-8">
          Viđeno u
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {LOGOS.map((name) => (
            <span key={name} className="text-[#c7d1d5] font-semibold text-sm tracking-wide">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
