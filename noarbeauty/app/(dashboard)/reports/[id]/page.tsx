import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { scoreColor, scoreLabel, formatDate } from "@/lib/utils";
import type { ReportResults } from "@/lib/types/database.types";
import ReportActions from "@/components/report/ReportActions";
import ComparisonSlider from "@/components/report/ComparisonSlider";

const SCORE_LABELS: Record<string, string> = {
  symmetry:          "Simetrija lica",
  golden_ratio:      "Zlatni rez (φ)",
  canthal_tilt:      "Canthal tilt",
  farkas_index:      "Farkas indeks",
  facial_thirds:     "Trećine lica",
  jawline:           "Jawline",
  nasofrontal_angle: "Nazofrontalni ugao",
  nasolabial_angle:  "Nasolabijalni ugao",
  eye_spacing:       "Razmak očiju",
  nose_width_ratio:  "Širina nosa",
  lip_ratio:         "Proporcija usana",
  harmony:           "Harmonija crta",
};

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5 text-sm">
        <span className="text-white/60">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30">{scoreLabel(score)}</span>
          <span className={`font-bold tabular-nums ${scoreColor(score)}`}>{score}</span>
        </div>
      </div>
      <div className="score-bar">
        <div
          className="score-bar-fill"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!report) notFound();

  if (report.status === "processing") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🧠</div>
          <h2 className="font-semibold text-lg mb-2">Analiza u toku...</h2>
          <p className="text-white/40 text-sm">Stranica će se automatski osvežiti</p>
          <meta httpEquiv="refresh" content="5" />
        </div>
      </div>
    );
  }

  if (report.status === "failed") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="font-semibold text-lg mb-2">Analiza nije uspela</h2>
          <p className="text-white/40 text-sm mb-6">Proveri da li su fotografije jasne i frontalne</p>
          <Link href="/upload" className="btn-primary">Pokušaj ponovo</Link>
        </div>
      </div>
    );
  }

  const results = report.results as ReportResults | null;
  if (!results) notFound();

  const scores = results.scores ?? {};
  const measurements = results.measurements ?? {};
  const overall = results.overall ?? 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0d0d0d] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-white/40 hover:text-white text-sm transition-colors">
            ← Dashboard
          </Link>
          <span className="font-semibold text-sm">Cefalometrijski izveštaj</span>
          <ReportActions reportId={id} pdfUrl={report.pdf_url} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        {/* Overall ocena */}
        <div className="card p-8 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-xs text-white/30 uppercase tracking-widest mb-1">
                Ukupna ocena · {formatDate(report.created_at)}
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-7xl font-black gradient-text leading-none">{overall}</span>
                <span className="text-xl text-white/30 mb-2">/100</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                  Oblik lica: <strong className="text-accent">{results.face_shape}</strong>
                </span>
                <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                  Okluzija: <strong className="text-accent">{results.jaw_class}</strong>
                </span>
                <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
                  Jezik: <strong className="text-accent">{report.language?.toUpperCase()}</strong>
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 w-32 h-32 rounded-full border-4 border-accent/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-black gradient-text">{overall}</div>
                <div className="text-xs text-white/30">/ 100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Ocene + AI izveštaj */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score bars */}
          <div className="card p-6">
            <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">
              Cefalometrijska merenja
            </h2>
            <div className="space-y-4">
              {Object.entries(SCORE_LABELS).map(([key, label]) => {
                const score = (scores as Record<string, number>)[key];
                if (score == null) return null;
                return <ScoreBar key={key} label={label} score={score} />;
              })}
            </div>
          </div>

          {/* AI izveštaj */}
          <div className="space-y-4">
            <div className="card p-6 flex-1">
              <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                AI Analiza
              </h2>
              <div className="text-sm text-white/60 leading-[1.9] whitespace-pre-line">
                {results.ai_report}
              </div>
            </div>

            {/* Skin analiza */}
            {results.skin && (
              <div className="card p-6">
                <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                  Skin Analiza (Haut.AI)
                </h2>
                <div className="space-y-3">
                  {[
                    { key: "texture_score",      label: "Tekstura kože" },
                    { key: "pore_score",          label: "Pore" },
                    { key: "hydration",           label: "Hidratacija" },
                    { key: "hyperpigmentation",   label: "Ravnomernost tena" },
                    { key: "acne_score",          label: "Čistoća kože" },
                  ].map(({ key, label }) => {
                    const score = (results.skin as Record<string, number>)[key];
                    return <ScoreBar key={key} label={label} score={score} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Merenja tabela */}
        <div className="card p-6">
          <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
            Precizna merenja
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { key: "face_width_mm",         label: "Širina lica" },
              { key: "face_height_mm",        label: "Visina lica" },
              { key: "zygomatic_width",       label: "Zigomatična š." },
              { key: "jaw_width",             label: "Širina vilice" },
              { key: "nose_width",            label: "Širina nosa" },
              { key: "mouth_width",           label: "Širina usta" },
              { key: "interocular_distance",  label: "Interokularni razmak" },
              { key: "facial_index",          label: "Morfometrički indeks" },
              { key: "nasofrontal_angle_deg", label: "Nazofrontalni ugao" },
              { key: "nasolabial_angle_deg",  label: "Nasolabijalni ugao" },
              { key: "canthal_tilt_degrees",  label: "Canthal tilt" },
            ].map(({ key, label }) => {
              const val = (measurements as Record<string, number | null>)[key];
              if (val == null) return null;
              const isAngle = key.includes("angle") || key.includes("tilt");
              return (
                <div key={key} className="bg-white/[0.03] rounded-xl p-4">
                  <div className="text-xs text-white/30 mb-1">{label}</div>
                  <div className="font-bold text-lg">
                    {typeof val === "number" ? val.toFixed(1) : val}
                    <span className="text-xs text-white/25 ml-0.5">{isAngle ? "°" : "px"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Morph pre/after slider */}
        {results.morph_url && report.front_photo_url && (
          <div className="card p-6">
            <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
              Pre / After vizualizacija
            </h2>
            <ComparisonSlider
              beforeUrl={report.front_photo_url}
              afterUrl={results.morph_url}
            />
          </div>
        )}

        {/* CTA za PDF */}
        <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold mb-1">Preuzmi PDF izveštaj</h3>
            <p className="text-sm text-white/40">
              Kompletan izveštaj sa svim merenjima i landmark overlay-em
            </p>
          </div>
          <ReportActions reportId={id} pdfUrl={report.pdf_url} showDownload />
        </div>
      </main>
    </div>
  );
}
