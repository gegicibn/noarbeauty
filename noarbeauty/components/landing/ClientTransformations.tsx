import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const CDN = "https://cdn.qoves.com/static/landing/images/home/client-transformations";

const PAIRS = [
  { b: `${CDN}/1-before.webp`,    a: `${CDN}/1-after.webp` },
  { b: `${CDN}/2-before.webp`,    a: `${CDN}/2-after.webp` },
  { b: `${CDN}/3-before.webp`,    a: `${CDN}/3-after.webp` },
  { b: `${CDN}/4-before.webp`,    a: `${CDN}/4-after.webp` },
  { b: `${CDN}/5-before.webp`,    a: `${CDN}/5-after.webp` },
  { b: `${CDN}/6-before-v2.webp`, a: `${CDN}/6-after-v2.webp` },
];

export default function ClientTransformations() {
  return (
    <section className="py-28 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center border border-[#c7d1d54d] rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs uppercase tracking-[3px] text-[#515255]">Transformacije klijenata</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233137] tracking-tight mb-5">
            Neke <strong className="text-[#9aaeb5]">ne-hirurške</strong> transformacije
          </h2>
          <p className="text-[#758084] max-w-lg mx-auto text-sm leading-relaxed">
            Prevlači slajder da vidiš razliku. Sve transformacije su postignute bez hirurških zahvata.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAIRS.map(({ b, a }, i) => (
            <div key={i} className="aspect-[3/4]">
              <BeforeAfterSlider before={b} after={a} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
