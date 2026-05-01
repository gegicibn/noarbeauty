export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] animate-pulse">
      <div className="h-16 bg-[#0d0d0d] border-b border-white/[0.06]" />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="h-8 w-48 bg-white/[0.04] rounded-lg mb-10" />
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/[0.03]" />
          ))}
        </div>
        <div className="h-40 rounded-2xl bg-white/[0.03] mb-8" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-white/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}
