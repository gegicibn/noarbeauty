import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-center px-6">
      <div>
        <div className="text-7xl font-black gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold mb-3">Stranica nije pronađena</h1>
        <p className="text-white/40 mb-8">Ova stranica ne postoji ili si pogrešno ukucao URL.</p>
        <Link href="/" className="btn-primary">← Početna strana</Link>
      </div>
    </div>
  );
}
