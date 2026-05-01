"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const GOALS = [
  { key: "curiosity",     label: "Radoznalost / zabava",          icon: "🔍" },
  { key: "aesthetic",     label: "Estetski zahvati (priprema)",   icon: "💉" },
  { key: "self_improvement", label: "Samopoboljšanje / stil",     icon: "✨" },
  { key: "professional",  label: "Profesionalna upotreba",        icon: "🏥" },
];

const ETHNICITIES = [
  { key: "slavic",        label: "Slovensko",       flag: "🇷🇸" },
  { key: "european",      label: "Evropsko",        flag: "🇪🇺" },
  { key: "east_asian",    label: "Istočnoazijsko",  flag: "🌏" },
  { key: "south_asian",   label: "Južnoazijsko",    flag: "🌍" },
  { key: "african",       label: "Afričko",         flag: "🌍" },
  { key: "latin",         label: "Latinsko",        flag: "🌎" },
  { key: "middle_eastern",label: "Bliskoistočno",   flag: "🌙" },
];

const AGE_RANGES = ["18-24", "25-34", "35-44", "45-54", "55+"];
const GENDERS = [
  { key: "female", label: "Ženski" },
  { key: "male",   label: "Muški" },
  { key: "other",  label: "Ostalo / Wolim ne reći" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: "",
    ethnicity: "slavic",
    age: "",
    gender: "",
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  function set(key: string, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  async function finish() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Sačuvaj odgovore u user metadata (opciono — za personalizaciju)
      await supabase.auth.updateUser({
        data: { onboarding: answers, onboarding_done: true },
      });
    }
    router.push("/upload");
  }

  const STEPS = 3;
  const progress = Math.round((step / STEPS) * 100);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-bold text-xl">
            noar<span className="text-accent">beauty</span>.ai
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-white/30 mb-2">
            <span>Onboarding</span>
            <span>{step}/{STEPS}</span>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#c9a96e] to-[#e8c98a] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step 1: Cilj */}
        {step === 1 && (
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-2">Zašto koristiš NoarBeauty?</h2>
            <p className="text-sm text-white/40 mb-6">Pomoći će nam da personalizujemo tvoj izveštaj</p>
            <div className="space-y-3">
              {GOALS.map((g) => (
                <button
                  key={g.key}
                  onClick={() => set("goal", g.key)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    answers.goal === g.key
                      ? "border-accent bg-accent/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="text-xl">{g.icon}</span>
                  <span className="text-sm font-medium">{g.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!answers.goal}
              className="btn-primary w-full justify-center mt-6 disabled:opacity-40"
            >
              Nastavi →
            </button>
          </div>
        )}

        {/* Step 2: Etničko poreklo + starost */}
        {step === 2 && (
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-2">Malo o tebi</h2>
            <p className="text-sm text-white/40 mb-6">
              Koristimo za poređenje sa etničkim prosecima (Farkas standardi)
            </p>

            <div className="mb-5">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Etničko poreklo</div>
              <div className="flex flex-wrap gap-2">
                {ETHNICITIES.map((e) => (
                  <button
                    key={e.key}
                    onClick={() => set("ethnicity", e.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      answers.ethnicity === e.key
                        ? "bg-accent text-black"
                        : "border border-white/10 text-white/50 hover:border-white/20"
                    }`}
                  >
                    <span>{e.flag}</span>
                    <span>{e.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Starosna grupa</div>
              <div className="flex flex-wrap gap-2">
                {AGE_RANGES.map((age) => (
                  <button
                    key={age}
                    onClick={() => set("age", age)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      answers.age === age
                        ? "bg-accent text-black"
                        : "border border-white/10 text-white/50 hover:border-white/20"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Pol</div>
              <div className="flex gap-2">
                {GENDERS.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => set("gender", g.key)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                      answers.gender === g.key
                        ? "bg-accent text-black"
                        : "border border-white/10 text-white/50 hover:border-white/20"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost flex-1 justify-center text-sm">
                ← Nazad
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary flex-1 justify-center"
              >
                Nastavi →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Priprema */}
        {step === 3 && (
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">📸</div>
            <h2 className="text-xl font-bold mb-3">Spremi se za fotografisanje</h2>
            <p className="text-sm text-white/40 mb-6">
              Za tačnu analizu trebaš 3 fotografije
            </p>
            <div className="space-y-3 text-left mb-8">
              {[
                ["🎯", "Frontalna — gledaj direktno u kameru"],
                ["◀", "Levi profil — glava okrenuta 90° u levo"],
                ["▶", "Desni profil — glava okrenuta 90° u desno"],
                ["💡", "Dobro osvetljenje, neutralan izraz, bez naočara"],
              ].map(([icon, text]) => (
                <div key={text as string} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="flex-shrink-0 text-lg">{icon as string}</span>
                  <span>{text as string}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost justify-center text-sm">
                ← Nazad
              </button>
              <button
                onClick={finish}
                disabled={saving}
                className="btn-primary flex-1 justify-center disabled:opacity-50"
              >
                {saving ? "Čuvam..." : "Počni analizu →"}
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-white/20 mt-5">
          Možeš preskočiti ovo · <button onClick={finish} className="text-accent/60 hover:text-accent">Preskoči</button>
        </p>
      </div>
    </div>
  );
}
