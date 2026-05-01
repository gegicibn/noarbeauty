"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { triggerReportEmail } from "@/app/actions";
import EthnicitySelector from "@/components/upload/EthnicitySelector";
import { useTracking } from "@/hooks/useTracking";

type Slot = "front" | "left" | "right";
type Photos = Record<Slot, File | null>;

const SLOTS: { key: Slot; label: string; hint: string; icon: string }[] = [
  { key: "front",  label: "Frontalna",    hint: "Gledaj direktno u kameru, lice centrirano", icon: "🎯" },
  { key: "left",   label: "Levi profil",  hint: "Glava okrenuta 90° u levo",                 icon: "◀" },
  { key: "right",  label: "Desni profil", hint: "Glava okrenuta 90° u desno",                icon: "▶" },
];

function DropZone({
  slot,
  file,
  onFile,
}: {
  slot: typeof SLOTS[number];
  file: File | null;
  onFile: (f: File) => void;
}) {
  const onDrop = useCallback((accepted: File[]) => {
    if (accepted[0]) onFile(accepted[0]);
  }, [onFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const preview = file ? URL.createObjectURL(file) : null;

  return (
    <div
      {...getRootProps()}
      className={`
        relative rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden
        transition-all duration-200 aspect-[3/4]
        ${isDragActive ? "border-accent bg-accent/5" : "border-white/10 hover:border-white/20"}
        ${file ? "border-accent/40" : ""}
      `}
    >
      <input {...getInputProps()} />
      {preview ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt={slot.label} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-3">
            <div className="text-xs text-white/80 font-medium">{slot.label} ✓</div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div className="text-3xl mb-3">{slot.icon}</div>
          <div className="font-semibold text-sm mb-1">{slot.label}</div>
          <div className="text-xs text-white/30 leading-relaxed">{slot.hint}</div>
          <div className="mt-4 text-xs text-accent/60">Klikni ili prevuci →</div>
        </div>
      )}
    </div>
  );
}

export default function UploadPage() {
  const [photos, setPhotos] = useState<Photos>({ front: null, left: null, right: null });
  const [language, setLanguage] = useState<"sr" | "bs" | "en">("sr");
  const [ethnicity, setEthnicity] = useState("slavic");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { trackAnalysisStarted, trackAnalysisCompleted } = useTracking();

  const allUploaded = Object.values(photos).every(Boolean);

  function setPhoto(slot: Slot, file: File) {
    setPhotos((p) => ({ ...p, [slot]: file }));
  }

  async function handleAnalyze() {
    if (!allUploaded) return;
    setLoading(true);
    trackAnalysisStarted(language);

    let reportId: string | null = null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/sign-in"); return; }

      // Proveri da li korisnik može da uradi analizu
      const { data: canAnalyze } = await supabase.rpc("can_analyze", { user_id: user.id });
      if (!canAnalyze) {
        toast.error("Dostigao si limit besplatnih analiza. Nadogradi na Pro.");
        setLoading(false);
        return;
      }

      // Kreiraj report zapis u bazi
      const { data: report, error } = await supabase
        .from("reports")
        .insert({ user_id: user.id, status: "processing", language })
        .select("id")
        .single();

      if (error || !report) throw new Error("Greška pri kreiranju izveštaja");
      reportId = report.id;

      // Upload front foto u Supabase Storage (za report prikaz)
      const frontExt = photos.front!.name.split(".").pop() ?? "jpg";
      const frontPath = `${user.id}/${report.id}/front.${frontExt}`;
      const { error: uploadErr } = await supabase.storage
        .from("photos")
        .upload(frontPath, photos.front!);

      let frontPhotoUrl: string | null = null;
      if (!uploadErr) {
        const { data: { signedUrl } } = await supabase.storage
          .from("photos")
          .createSignedUrl(frontPath, 60 * 60 * 24 * 90); // 90 dana
        frontPhotoUrl = signedUrl ?? null;
        await supabase
          .from("reports")
          .update({ front_photo_url: frontPhotoUrl })
          .eq("id", report.id);
      }

      // Pošalji fotografije Python API-ju
      const form = new FormData();
      form.append("front", photos.front!);
      form.append("left",  photos.left!);
      form.append("right", photos.right!);
      form.append("language", language);
      form.append("ethnicity", ethnicity);

      const res = await fetch("/api/py/analyze", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Greška pri analizi");
      }

      const results = await res.json();

      // Sačuvaj rezultate
      await supabase
        .from("reports")
        .update({
          status: "completed",
          results,
          completed_at: new Date().toISOString(),
        })
        .eq("id", report.id);

      // Inkrement analyses_used
      await supabase.rpc("increment_analyses_used", { user_id: user.id });

      trackAnalysisCompleted(results.overall ?? 0);
      triggerReportEmail(report.id, results.overall ?? 0);

      router.push(`/reports/${report.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Nepoznata greška";
      toast.error(msg);
      // Označi report kao failed da se ne prikazuje zauvek kao "processing"
      if (reportId) {
        await supabase
          .from("reports")
          .update({ status: "failed" })
          .eq("id", reportId);
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-white/[0.06] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-white/40 hover:text-white text-sm transition-colors">
            ← Nazad
          </button>
          <span className="font-semibold text-sm">Nova analiza</span>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">Učitaj fotografije</h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Potrebne su 3 fotografije za kompletnu cefalometrijsku analizu.
            Fotografije se brišu odmah nakon analize.
          </p>
        </div>

        {/* Tips */}
        <div className="card p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ["💡", "Dobro osvetljenje"],
            ["🚫", "Bez filtera"],
            ["👓", "Bez naočara"],
            ["📐", "Neutralan izraz"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2 text-sm text-white/50">
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>

        {/* Upload zona — 3 slota */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {SLOTS.map((slot) => (
            <DropZone
              key={slot.key}
              slot={slot}
              file={photos[slot.key]}
              onFile={(f) => setPhoto(slot.key, f)}
            />
          ))}
        </div>

        {/* Etničko poreklo */}
        <div className="mb-4">
          <EthnicitySelector value={ethnicity} onChange={setEthnicity} />
        </div>

        {/* Jezik */}
        <div className="card p-5 mb-8">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Jezik izveštaja</div>
          <div className="flex gap-3">
            {(["sr", "bs", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  language === lang
                    ? "bg-accent text-black"
                    : "border border-white/10 text-white/50 hover:border-white/20"
                }`}
              >
                {lang === "sr" ? "Srpski" : lang === "bs" ? "Bosanski" : "English"}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleAnalyze}
            disabled={!allUploaded || loading}
            className={`btn-primary text-base px-12 py-4 ${
              !allUploaded || loading ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                </svg>
                Analiziram... (~30s)
              </span>
            ) : allUploaded ? (
              "Pokreni analizu →"
            ) : (
              `Učitaj još ${3 - Object.values(photos).filter(Boolean).length} fotografija`
            )}
          </button>
          <p className="text-xs text-white/20 mt-3">
            🔒 Fotografije se ne čuvaju — brišu se odmah po završetku analize
          </p>
        </div>
      </main>
    </div>
  );
}
