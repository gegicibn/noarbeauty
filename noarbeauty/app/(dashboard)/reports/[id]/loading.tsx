export default function ReportLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] animate-pulse">
      <div className="h-16 bg-[#0d0d0d] border-b border-white/[0.06]" />
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="h-40 rounded-2xl bg-white/[0.03]" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-96 rounded-2xl bg-white/[0.03]" />
          <div className="h-96 rounded-2xl bg-white/[0.03]" />
        </div>
        <div className="h-48 rounded-2xl bg-white/[0.03]" />
      </div>
    </div>
  );
}
