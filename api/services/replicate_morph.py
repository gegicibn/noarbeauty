"""Replicate API — FLUX + InstantID morph vizualizacija."""
import os, replicate, base64
from pathlib import Path

async def generate_morph(image_path: str, suggestions: list[str]) -> str | None:
    api_key = os.environ.get("REPLICATE_API_TOKEN", "")
    if not api_key:
        return None

    os.environ["REPLICATE_API_TOKEN"] = api_key

    suggestion_text = ", ".join(suggestions[:3]) if suggestions else "enhanced facial harmony"

    prompt = (
        f"Portrait photo, same person, {suggestion_text}, "
        "photorealistic, high quality, studio lighting, 8k resolution"
    )

    try:
        image_data = Path(image_path).read_bytes()
        b64_uri = f"data:image/jpeg;base64,{base64.b64encode(image_data).decode()}"

        output = replicate.run(
            "zsxkib/instant-id:latest",
            input={
                "image": b64_uri,
                "prompt": prompt,
                "negative_prompt": "ugly, blurry, distorted, cartoon, anime",
                "num_inference_steps": 30,
                "guidance_scale": 7.5,
                "ip_adapter_scale": 0.8,
                "controlnet_conditioning_scale": 0.8,
            },
        )

        if isinstance(output, list) and len(output) > 0:
            return str(output[0])
        return str(output) if output else None

    except Exception:
        return None
