import os
import google.generativeai as genai

genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))

FACE_SHAPE_TIPS = {
    "Ovalno": "Ovalno lice je idealan oblik koji harmonično uokviruje sve crte. Gotovo svaka frizura i stil naočara odgovara ovom obliku.",
    "Okruglo": "Okruglo lice ima meke proporcije. Preporučujemo frizure sa volumenom na vrhu i ravnom kosom uz lice da se vizuelno izdužilo.",
    "Kvadratno": "Kvadratno lice ima jaku definiciju vilice. Meke talasaste frizure i zaobljeni detalji šminke naglašavaju nežnost crta.",
    "Srce": "Lice u obliku srca ima naglašeno čelo i finu vilicu. Frizure sa volumenom na dnu i beach waves su idealne.",
    "Dijamant": "Dijamantno lice ima istaknute jagodične kosti. Frizure sa volumenom na čelu i bradi uravnotežuju proporcije.",
    "Izduženo": "Izduženo lice profitira od frizura sa bočnim volumenom. Šiške mogu vizuelno skratiti proporacije.",
    "Trougao": "Lice u obliku trougla ima širu donju partiju. Naglasak na gornjoj polovini lica (oči, obrve) uravnotežuje izgled.",
}

def generate_report(analysis: dict) -> str:
    api_key = os.environ.get("GEMINI_API_KEY", "")

    scores = analysis.get("scores", {})
    overall = analysis.get("overall", 75)
    face_shape = analysis.get("face_shape", "Ovalno")
    age = analysis.get("age")

    if api_key:
        return _generate_gemini_report(analysis, api_key)
    else:
        return _generate_local_report(scores, overall, face_shape, age)


def _generate_gemini_report(analysis: dict, api_key: str) -> str:
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")

        scores = analysis.get("scores", {})
        overall = analysis.get("overall", 75)
        face_shape = analysis.get("face_shape", "Ovalno")

        prompt = f"""Ti si ekspert za analizu lica i lepote. Na osnovu sledećih podataka AI analize lica, napiši detaljan ali prijatan izveštaj na srpskom jeziku (oko 150 reči).

Podaci analize:
- Ukupna ocena: {overall}/100
- Oblik lica: {face_shape}
- Simetrija: {scores.get('symmetry', 75)}/100
- Zlatni rez proporcija: {scores.get('golden_ratio', 75)}/100
- Jawline definicija: {scores.get('jawline', 70)}/100
- Oči: {scores.get('eyes', 78)}/100
- Nos: {scores.get('nose', 76)}/100
- Usne: {scores.get('lips', 77)}/100
- Harmonija crta: {scores.get('harmony', 75)}/100

Napiši izveštaj koji:
1. Ističe najjače crte lica
2. Pominje oblik lica i šta to znači
3. Daje 2-3 konkretne preporuke za frizuru ili šminku
4. Je pozitivan i ohrabrujući
5. Je napisan na srpskom jeziku

Samo tekst, bez naslova ili bullet poena."""

        response = model.generate_content(prompt)
        return response.text.strip()

    except Exception:
        return _generate_local_report(
            analysis.get("scores", {}),
            analysis.get("overall", 75),
            analysis.get("face_shape", "Ovalno"),
            analysis.get("age"),
        )


def _generate_local_report(scores: dict, overall: int, face_shape: str, age) -> str:
    symmetry = scores.get("symmetry", 75)
    golden = scores.get("golden_ratio", 75)
    eyes = scores.get("eyes", 75)
    jawline = scores.get("jawline", 70)

    strong_features = []
    if symmetry >= 80:
        strong_features.append("izuzetna simetrija lica")
    if golden >= 85:
        strong_features.append("proporcije bliske zlatnom rezu")
    if eyes >= 82:
        strong_features.append("harmonično postavljene oči")
    if jawline >= 80:
        strong_features.append("jasno definisana linija vilice")

    if not strong_features:
        strong_features = ["uravnotežene proporcije lica"]

    shape_tip = FACE_SHAPE_TIPS.get(face_shape, "Vaše lice ima jedinstvene proporcije koje naglašavaju vašu individualnost.")

    if overall >= 90:
        intro = "Analiza pokazuje izuzetno harmonične crte lica sa proporcijama koje su bliske matematičkom idealu."
    elif overall >= 80:
        intro = "Vaše lice pokazuje snažnu harmoniju crta sa nekoliko izuzetno naglašenih detalja koji privlače pažnju."
    elif overall >= 70:
        intro = "Analiza otkriva uravnotežene i prijatne crte lica sa karakteristikama koje daju jedinstven karakter vašem izgledu."
    else:
        intro = "Vaše lice ima posebne crte koje ga čine prepoznatljivim i zanimljivim."

    features_str = ", ".join(strong_features)
    report = (
        f"{intro} Posebno se ističu: {features_str}. "
        f"{shape_tip} "
        f"Sa ukupnom ocenom od {overall}/100, vaše lice spada u gornji procenat harmoničnih proporcija. "
        f"Preporučujemo da naglasate svoje prirodne prednosti kroz stilove koji odgovaraju vašem obliku lica i individualnom karakteru crta."
    )

    return report
