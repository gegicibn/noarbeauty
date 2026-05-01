export default function UploadLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] animate-pulse">
      <div className="h-16 bg-[#0d0d0d] border-b border-white/[0.06]" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="h-10 w-64 bg-white/[0.04] rounded-lg mx-auto mb-10" />
        <div className="h-20 rounded-2xl bg-white/[0.03] mb-8" />
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-white/[0.03]" />
          ))}
        </div>
        <div className="h-24 rounded-2xl bg-white/[0.03] mb-4" />
        <div className="h-16 rounded-2xl bg-white/[0.03] mb-8" />
        <div className="h-14 w-48 rounded-full bg-white/[0.04] mx-auto" />
      </div>
    </div>
  );
}
