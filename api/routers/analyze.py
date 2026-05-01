from fastapi import APIRouter, File, UploadFile, Form, HTTPException
import tempfile, os, asyncio
from services.mediapipe_analyzer import analyze_front, analyze_profile, merge_results, extract_landmarks
from services.haut_ai import analyze_skin
from services.claude_report import generate_report
from services.ethnic_norms import get_percentile_ranks, get_ethnic_adjusted_scores

router = APIRouter()

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_SIZE = 10 * 1024 * 1024


async def _save_tmp(file: UploadFile) -> str:
    contents = await file.read()
    if len(contents) > MAX_SIZE:
        raise HTTPException(400, "Slika je prevelika (max 10MB)")
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Nepodržan format (JPEG, PNG ili WEBP)")
    suffix = os.path.splitext(file.filename or "img.jpg")[1] or ".jpg"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as f:
        f.write(contents)
        return f.name


@router.post("")
async def analyze(
    front: UploadFile = File(...),
    left:  UploadFile = File(...),
    right: UploadFile = File(...),
    language: str = Form(default="sr"),
    ethnicity: str = Form(default="slavic"),
    generate_morph: bool = Form(default=False),
    include_landmarks: bool = Form(default=False),
):
    front_path = left_path = right_path = None
    try:
        front_path, left_path, right_path = await asyncio.gather(
            _save_tmp(front), _save_tmp(left), _save_tmp(right)
        )

        # Frontalna + profil analiza u paraleli
        (front_result, profile_l, profile_r) = await asyncio.gather(
            asyncio.to_thread(analyze_front, front_path),
            asyncio.to_thread(analyze_profile, left_path, "left"),
            asyncio.to_thread(analyze_profile, right_path, "right"),
        )

        merged = merge_results(front_result, profile_l, profile_r)

        # Etnički prilagođene ocene + percentili
        merged["scores"] = get_ethnic_adjusted_scores(
            merged["scores"], merged.get("measurements", {}), ethnicity
        )
        merged["percentile_ranks"] = get_percentile_ranks(
            merged.get("measurements", {}), ethnicity
        )
        merged["ethnicity"] = ethnicity

        # Skin analiza (Haut.AI, async)
        skin = await analyze_skin(front_path)
        if skin:
            merged["skin"] = skin

        # Claude AI izveštaj
        merged["ai_report"] = await asyncio.to_thread(
            generate_report, merged, language
        )
        merged["language"] = language

        # Landmark koordinate za canvas overlay (opciono — samo Pro/Elite)
        if include_landmarks:
            landmarks = await asyncio.to_thread(extract_landmarks, front_path)
            if landmarks:
                merged["landmarks"] = landmarks

        # Morph vizualizacija
        if generate_morph:
            from services.replicate_morph import generate_morph as do_morph
            morph_url = await do_morph(front_path, _extract_suggestions(merged))
            if morph_url:
                merged["morph_url"] = morph_url

        return merged

    except ValueError as e:
        raise HTTPException(422, str(e))
    finally:
        for p in [front_path, left_path, right_path]:
            if p and os.path.exists(p):
                os.unlink(p)


def _extract_suggestions(analysis: dict) -> list[str]:
    scores = analysis.get("scores", {})
    suggestions = []
    if scores.get("jawline", 100) < 70:
        suggestions.append("more defined jawline")
    if scores.get("eye_spacing", 100) < 70:
        suggestions.append("refined eye spacing")
    if scores.get("nose_width_ratio", 100) < 70:
        suggestions.append("refined nose proportions")
    return suggestions or ["enhanced facial harmony and symmetry"]
