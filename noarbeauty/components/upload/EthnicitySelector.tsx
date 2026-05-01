"use client";

const ETHNICITIES = [
  { key: "slavic",        label: "Slovensko",      flag: "🇷🇸" },
  { key: "european",      label: "Evropsko",        flag: "🇪🇺" },
  { key: "east_asian",    label: "Istočnoazijsko",  flag: "🌏" },
  { key: "south_asian",   label: "Južnoazijsko",    flag: "🌍" },
  { key: "african",       label: "Afričko",         flag: "🌍" },
  { key: "latin",         label: "Latinsko",        flag: "🌎" },
  { key: "middle_eastern",label: "Bliskoistočno",   flag: "🌙" },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function EthnicitySelector({ value, onChange }: Props) {
  return (
    <div className="card p-5">
      <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Etničko poreklo</div>
      <p className="text-xs text-white/25 mb-3">
        Koristi se za poređenje sa etničkim prosecima po Farkas standardima
      </p>
      <div className="flex flex-wrap gap-2">
        {ETHNICITIES.map((e) => (
          <button
            key={e.key}
            onClick={() => onChange(e.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              value === e.key
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
  );
}
