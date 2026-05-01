"""Claude API — generisanje cefalometrijskog izveštaja."""
import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY", ""))

LANG_PROMPTS = {
    "sr": "Napiši izveštaj u celosti na srpskom jeziku (latinica).",
    "bs": "Napiši izvještaj u potpunosti na bosanskom jeziku.",
    "en": "Write the entire report in English.",
}

def generate_report(analysis: dict, language: str = "sr") -> str:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        return _fallback_report(analysis, language)

    scores = analysis.get("scores", {})
    measurements = analysis.get("measurements", {})
    skin = analysis.get("skin")

    skin_section = ""
    if skin:
        skin_section = f"""
Skin analiza (Haut.AI):
- Tekstura kože: {skin.get('texture_score', 'N/A')}/100
- Pore: {skin.get('pore_score', 'N/A')}/100
- Hiperpigmentacija: {skin.get('hyperpigmentation', 'N/A')}/100
- Hidratacija: {skin.get('hydration', 'N/A')}/100
- Akne: {skin.get('acne_score', 'N/A')}/100"""

    lang_instruction = LANG_PROMPTS.get(language, LANG_PROMPTS["sr"])

    prompt = f"""Ti si stručnjak za cefalometrijsku analizu lica koji piše izveštaje za estetske klinike.
Na osnovu sledećih merenja, napiši profesionalan ali razumljiv izveštaj (250-350 reči).

{lang_instruction}

CEFALOMETRIJSKA MERENJA:
- Ukupna ocena: {analysis.get('overall', 75)}/100
- Oblik lica: {analysis.get('face_shape', 'N/A')}
- Klasa vilice: {analysis.get('jaw_class', 'Klasa I')}

OCENE (0-100):
- Simetrija lica: {scores.get('symmetry', 75)}
- Zlatni rez (φ): {scores.get('golden_ratio', 75)}
- Canthal tilt: {scores.get('canthal_tilt', 75)}
- Farkas proporcionalni indeks: {scores.get('farkas_index', 75)}
- Trećine lica (Farkas): {scores.get('facial_thirds', 75)}
- Jawline definicija: {scores.get('jawline', 75)}
- Nazofrontalni ugao: {scores.get('nasofrontal_angle', 75)}
- Nasolabijalni ugao: {scores.get('nasolabial_angle', 75)}
- Razmak očiju: {scores.get('eye_spacing', 75)}
- Širina nosa: {scores.get('nose_width_ratio', 75)}
- Proporcija usana: {scores.get('lip_ratio', 75)}
- Harmonija crta: {scores.get('harmony', 75)}

UGAONA MERENJA:
- Nazofrontalni ugao: {measurements.get('nasofrontal_angle_deg', 'N/A')}°
- Nasolabijalni ugao: {measurements.get('nasolabial_angle_deg', 'N/A')}°
- Canthal tilt: {measurements.get('canthal_tilt_degrees', 'N/A')}°
{skin_section}

Struktura izveštaja:
1. Kratak uvod sa generalnom ocenom (1-2 rečenice)
2. Najjače crte lica — šta se posebno ističe
3. Oblasti za potencijalnu nadogradnju (formulisati pozitivno, ne negativno)
4. 3 konkretne preporuke (frizura, šminka, estetski tretmani — ako su relevantni)
5. Zaključak

VAŽNO: Ne koristi bullet poene. Piši u paragrafima. Ton treba biti profesionalan, pozitivan i objektivan — kao izveštaj dermatologa ili maksilofacijalnog hirurga. Uključi relevantne medicinske termine ali objasni ih laički."""

    try:
        message = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}],
        )
        return message.content[0].text.strip()
    except Exception:
        return _fallback_report(analysis, language)


def _fallback_report(analysis: dict, language: str = "sr") -> str:
    overall = analysis.get("overall", 75)
    face_shape = analysis.get("face_shape", "Ovalno")
    scores = analysis.get("scores", {})

    best = max(scores.items(), key=lambda x: x[1]) if scores else ("simetrija", 80)

    labels = {
        "symmetry": "simetrija lica", "golden_ratio": "zlatni rez proporcija",
        "canthal_tilt": "canthal tilt", "farkas_index": "Farkas indeks",
        "facial_thirds": "trećine lica", "jawline": "jawline definicija",
        "harmony": "harmonija crta",
    }

    if language == "en":
        return (
            f"The analysis reveals a face with overall score of {overall}/100 and a {face_shape} face shape. "
            f"The standout feature is {labels.get(best[0], best[0])} scoring {best[1]}/100, which is above average. "
            f"The proportions align well with established cephalometric standards. "
            f"Recommendations: enhance your natural features with hairstyles suited for a {face_shape} face shape."
        )

    return (
        f"Analiza lica pokazuje ukupnu ocenu od {overall}/100 sa oblikom lica kategorisanim kao '{face_shape}'. "
        f"Posebno se ističe {labels.get(best[0], best[0])} sa ocenom {best[1]}/100, što je iznad statističkog proseka. "
        f"Proporcije lica dobro se uklapaju sa Farkas cefalometrijskim standardima. "
        f"Preporuka: naglasiti prirodne prednosti frizurama i tehnikama šminkanja prilagođenim obliku '{face_shape}' lica."
    )
