import Link from "next/link";

export default function ReportNotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-center px-6">
      <div>
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-xl font-bold mb-2">Izveštaj nije pronađen</h2>
        <p className="text-white/40 text-sm mb-6">
          Ovaj izveštaj ne postoji ili nemaš pristup njemu.
        </p>
        <Link href="/dashboard" className="btn-primary">← Dashboard</Link>
      </div>
    </div>
  );
}
