const LOGOS = [
  "USA Today", "The Guardian", "Daily Mail", "Business Insider",
  "GQ", "Wired", "Cosmopolitan", "MIT Technology Review",
];

export default function MediaBadges() {
  return (
    <section className="py-12 bg-[#0a0a0a] border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-[10px] uppercase tracking-[4px] text-[#444] mb-8">
          Viđeno u
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {LOGOS.map((name) => (
            <span key={name} className="text-[#333] font-semibold text-sm tracking-wide">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
