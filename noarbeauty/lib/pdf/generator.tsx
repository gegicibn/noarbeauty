import {
  Document, Page, Text, View, StyleSheet, renderToBuffer, Font,
} from "@react-pdf/renderer";
import type { ReportResults } from "@/lib/types/database.types";

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

function scoreLabel(s: number) {
  if (s >= 90) return "Izuzetno";
  if (s >= 80) return "Odlično";
  if (s >= 70) return "Iznad proseka";
  if (s >= 60) return "Prosek";
  return "Ispod proseka";
}

const s = StyleSheet.create({
  page:        { backgroundColor: "#0a0a0a", color: "#e8e8e8", fontFamily: "Helvetica", padding: 48 },
  header:      { marginBottom: 32, borderBottomWidth: 1, borderBottomColor: "#2a2a2a", paddingBottom: 20 },
  logo:        { fontSize: 20, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  logoAccent:  { color: "#c9a96e" },
  subtitle:    { fontSize: 9, color: "#666", letterSpacing: 2 },
  overallBox:  { backgroundColor: "#111", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 12, padding: 24, marginBottom: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  bigScore:    { fontSize: 64, fontFamily: "Helvetica-Bold", color: "#c9a96e" },
  outOf:       { fontSize: 18, color: "#444", marginTop: 8 },
  metaTag:     { backgroundColor: "#1a1a1a", borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 },
  metaTagText: { fontSize: 9, color: "#999" },
  sectionTitle:{ fontSize: 8, fontFamily: "Helvetica-Bold", color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 },
  card:        { backgroundColor: "#111", borderWidth: 1, borderColor: "#1a1a1a", borderRadius: 10, padding: 18, marginBottom: 16 },
  scoreRow:    { marginBottom: 10 },
  scoreHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  scoreLabel:  { fontSize: 10, color: "#888" },
  scoreVal:    { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#c9a96e" },
  scoreNote:   { fontSize: 8, color: "#555" },
  barBg:       { backgroundColor: "#1a1a1a", borderRadius: 4, height: 4, overflow: "hidden" },
  barFill:     { backgroundColor: "#c9a96e", height: 4, borderRadius: 4 },
  reportText:  { fontSize: 10, color: "#999", lineHeight: 1.8 },
  grid:        { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  gridItem:    { backgroundColor: "#111", borderWidth: 1, borderColor: "#1a1a1a", borderRadius: 8, padding: 12, width: "30%" },
  gridLabel:   { fontSize: 8, color: "#555", marginBottom: 3 },
  gridVal:     { fontSize: 13, fontFamily: "Helvetica-Bold", color: "#e8e8e8" },
  footer:      { position: "absolute", bottom: 32, left: 48, right: 48, borderTopWidth: 1, borderTopColor: "#1a1a1a", paddingTop: 12, flexDirection: "row", justifyContent: "space-between" },
  footerText:  { fontSize: 8, color: "#444" },
});

function ReportDocument({ results, reportId }: { results: ReportResults; reportId: string }) {
  const scores = results.scores ?? {};
  const measurements = results.measurements ?? {};
  const date = new Date().toLocaleDateString("sr-RS", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Document title={`NoarBeauty AI izveštaj — ${reportId}`}>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.logo}>
            noar<Text style={s.logoAccent}>beauty</Text>.ai
          </Text>
          <Text style={s.subtitle}>CEFALOMETRIJSKI IZVEŠTAJ • FARKAS & POWELL STANDARDI</Text>
        </View>

        {/* Overall */}
        <View style={s.overallBox}>
          <View>
            <Text style={{ fontSize: 9, color: "#666", marginBottom: 6 }}>Ukupna ocena</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 4 }}>
              <Text style={s.bigScore}>{results.overall}</Text>
              <Text style={s.outOf}>/100</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 12 }}>
              {[
                ["Oblik lica", results.face_shape],
                ["Okluzija", results.jaw_class],
                ["Datum", date],
              ].map(([label, val]) => (
                <View key={label} style={s.metaTag}>
                  <Text style={s.metaTagText}>{label}: {val}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Ocene */}
        <Text style={s.sectionTitle}>Cefalometrijska merenja</Text>
        <View style={s.card}>
          {Object.entries(SCORE_LABELS).map(([key, label]) => {
            const score = (scores as Record<string, number>)[key];
            if (score == null) return null;
            return (
              <View key={key} style={s.scoreRow}>
                <View style={s.scoreHeader}>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <Text style={s.scoreLabel}>{label}</Text>
                    <Text style={s.scoreNote}>{scoreLabel(score)}</Text>
                  </View>
                  <Text style={s.scoreVal}>{score}/100</Text>
                </View>
                <View style={s.barBg}>
                  <View style={[s.barFill, { width: `${score}%` }]} />
                </View>
              </View>
            );
          })}
        </View>

        {/* AI izveštaj */}
        <Text style={s.sectionTitle}>AI Analiza</Text>
        <View style={s.card}>
          <Text style={s.reportText}>{results.ai_report}</Text>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>noarbeauty.ai — Izveštaj #{reportId.slice(0, 8)}</Text>
          <Text style={s.footerText}>Analiza je informativna i ne predstavlja medicinsku dijagnozu.</Text>
        </View>
      </Page>

      {/* Strana 2 — merenja */}
      <Page size="A4" style={s.page}>
        <Text style={[s.sectionTitle, { marginBottom: 16 }]}>Precizna merenja</Text>
        <View style={s.grid}>
          {[
            ["Širina lica", measurements.face_width_mm, "px"],
            ["Visina lica", measurements.face_height_mm, "px"],
            ["Zigomatična šir.", measurements.zygomatic_width, "px"],
            ["Širina vilice", measurements.jaw_width, "px"],
            ["Širina nosa", measurements.nose_width, "px"],
            ["Širina usta", measurements.mouth_width, "px"],
            ["Interokularni", measurements.interocular_distance, "px"],
            ["Morfometrički ind.", measurements.facial_index, ""],
            ["Nazofrontalni", measurements.nasofrontal_angle_deg, "°"],
            ["Nasolabijalni", measurements.nasolabial_angle_deg, "°"],
            ["Canthal tilt", measurements.canthal_tilt_degrees, "°"],
          ].filter(([, val]) => val != null).map(([label, val, unit]) => (
            <View key={label as string} style={s.gridItem}>
              <Text style={s.gridLabel}>{label as string}</Text>
              <Text style={s.gridVal}>{Number(val).toFixed(1)}{unit as string}</Text>
            </View>
          ))}
        </View>

        {results.skin && (
          <>
            <Text style={[s.sectionTitle, { marginTop: 24 }]}>Skin Analiza (Haut.AI)</Text>
            <View style={s.card}>
              {[
                ["Tekstura kože", results.skin.texture_score],
                ["Pore", results.skin.pore_score],
                ["Hidratacija", results.skin.hydration],
                ["Ravnomernost tena", results.skin.hyperpigmentation],
                ["Čistoća kože", results.skin.acne_score],
              ].map(([label, score]) => (
                <View key={label as string} style={s.scoreRow}>
                  <View style={s.scoreHeader}>
                    <Text style={s.scoreLabel}>{label as string}</Text>
                    <Text style={s.scoreVal}>{score as number}/100</Text>
                  </View>
                  <View style={s.barBg}>
                    <View style={[s.barFill, { width: `${score}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={s.footer} fixed>
          <Text style={s.footerText}>noarbeauty.ai — Merenja #{reportId.slice(0, 8)}</Text>
          <Text style={s.footerText}>Farkas (1994) & Powell (1984) metodologija</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generatePDF(results: ReportResults, reportId: string): Promise<Buffer> {
  const doc = <ReportDocument results={results} reportId={reportId} />;
  return await renderToBuffer(doc);
}
