"""Haut.AI skin analysis API integracija."""
import os, httpx, base64
from pathlib import Path

HAUT_AI_URL = "https://api.haut.ai/v1"

async def analyze_skin(image_path: str) -> dict | None:
    api_key = os.environ.get("HAUT_AI_API_KEY", "")
    if not api_key:
        return None

    image_data = Path(image_path).read_bytes()
    b64 = base64.b64encode(image_data).decode()

    payload = {
        "image": b64,
        "algorithms": ["skin_type", "wrinkles", "texture", "pores", "acne", "pigmentation"],
    }

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{HAUT_AI_URL}/analyze",
                json=payload,
                headers={"Authorization": f"Bearer {api_key}"},
            )
            resp.raise_for_status()
            data = resp.json()

        return {
            "texture_score": _norm(data.get("texture", {}).get("score", 0.75)),
            "pore_score":    _norm(data.get("pores", {}).get("score", 0.75)),
            "hyperpigmentation": _norm(1 - data.get("pigmentation", {}).get("severity", 0.25)),
            "hydration":     _norm(data.get("hydration", {}).get("score", 0.75)),
            "acne_score":    _norm(1 - data.get("acne", {}).get("severity", 0.25)),
        }
    except Exception:
        return None


def _norm(val: float) -> int:
    return int(max(0, min(100, val * 100)))
