from pydantic import BaseModel
from typing import Optional

class SkinAnalysis(BaseModel):
    texture_score: int
    pore_score: int
    hyperpigmentation: int
    hydration: int
    acne_score: int

class FaceScores(BaseModel):
    symmetry: int
    golden_ratio: int
    jawline: int
    canthal_tilt: int
    nasofrontal_angle: int
    nasolabial_angle: int
    facial_thirds: int
    eye_spacing: int
    nose_width_ratio: int
    lip_ratio: int
    harmony: int
    farkas_index: int

class AnalysisResult(BaseModel):
    overall: int
    face_shape: str
    jaw_class: str
    scores: FaceScores
    measurements: dict[str, float]
    skin: Optional[SkinAnalysis] = None
    ai_report: str
    morph_url: Optional[str] = None
    language: str = "sr"
