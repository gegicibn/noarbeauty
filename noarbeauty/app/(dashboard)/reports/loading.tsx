export default function ReportsLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] animate-pulse">
      <div className="h-16 bg-[#0d0d0d] border-b border-white/[0.06]" />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="h-8 w-40 bg-white/[0.04] rounded-lg mb-8" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}
