import math
from deepface import DeepFace
import cv2
import numpy as np

FACE_SHAPES = {
    "oval": "Ovalno",
    "round": "Okruglo",
    "square": "Kvadratno",
    "heart": "Srce",
    "diamond": "Dijamant",
    "oblong": "Izduženo",
    "triangle": "Trougao",
}

def analyze_face(image_path: str) -> dict:
    try:
        result = DeepFace.analyze(
            img_path=image_path,
            actions=["age", "gender", "emotion", "race"],
            enforce_detection=True,
            detector_backend="opencv",
            silent=True,
        )
    except Exception as e:
        raise ValueError(f"Nije moguće detektovati lice na slici: {e}")

    face_data = result[0] if isinstance(result, list) else result
    region = face_data.get("region", {})

    scores = _compute_scores(image_path, region, face_data)
    overall = _compute_overall(scores)
    face_shape = _detect_face_shape(region)

    return {
        "overall": overall,
        "face_shape": FACE_SHAPES.get(face_shape, face_shape),
        "scores": scores,
        "age": face_data.get("age"),
        "dominant_emotion": face_data.get("dominant_emotion"),
    }


def _compute_scores(image_path: str, region: dict, face_data: dict) -> dict:
    img = cv2.imread(image_path)
    if img is None:
        return _fallback_scores()

    h, w = img.shape[:2]
    rx = region.get("x", 0)
    ry = region.get("y", 0)
    rw = region.get("w", w)
    rh = region.get("h", h)

    face_crop = img[ry:ry+rh, rx:rx+rw]

    symmetry = _score_symmetry(face_crop)
    golden = _score_golden_ratio(rw, rh)
    jawline = _score_jawline(face_crop)
    eyes = _score_eyes(face_crop)
    nose = _score_nose(face_crop)
    lips = _score_lips(face_crop)
    harmony = int((symmetry + golden + eyes + nose + lips) / 5)
    face_shape_score = _score_face_shape_quality(rw, rh)

    return {
        "symmetry": symmetry,
        "golden_ratio": golden,
        "jawline": jawline,
        "eyes": eyes,
        "nose": nose,
        "lips": lips,
        "harmony": harmony,
        "face_shape_score": face_shape_score,
    }


def _score_symmetry(face: np.ndarray) -> int:
    if face is None or face.size == 0:
        return 75
    gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    left = gray[:, :w//2]
    right = cv2.flip(gray[:, w//2:], 1)
    min_w = min(left.shape[1], right.shape[1])
    left = left[:, :min_w]
    right = right[:, :min_w]
    diff = np.mean(np.abs(left.astype(float) - right.astype(float)))
    score = max(50, min(100, int(100 - diff * 0.8)))
    return score


def _score_golden_ratio(w: int, h: int) -> int:
    if w == 0 or h == 0:
        return 75
    PHI = 1.618
    ratio = h / w if w > 0 else 1
    deviation = abs(ratio - PHI) / PHI
    score = max(50, min(100, int(100 - deviation * 120)))
    return score


def _score_jawline(face: np.ndarray) -> int:
    if face is None or face.size == 0:
        return 70
    gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    lower_third = gray[int(h*0.65):, :]
    edges = cv2.Canny(lower_third, 50, 150)
    edge_density = np.count_nonzero(edges) / edges.size
    score = max(50, min(100, int(50 + edge_density * 500)))
    return score


def _score_eyes(face: np.ndarray) -> int:
    if face is None or face.size == 0:
        return 78
    gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
    eyes = eye_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    if len(eyes) >= 2:
        x1, y1, w1, h1 = eyes[0]
        x2, y2, w2, h2 = eyes[1]
        size_diff = abs(w1 - w2) / max(w1, w2, 1)
        score = max(60, min(100, int(100 - size_diff * 60)))
    else:
        score = 75
    return score


def _score_nose(face: np.ndarray) -> int:
    if face is None or face.size == 0:
        return 76
    gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    nose_region = gray[int(h*0.35):int(h*0.65), int(w*0.3):int(w*0.7)]
    if nose_region.size == 0:
        return 75
    nose_w = nose_region.shape[1]
    face_w = w
    ratio = nose_w / face_w
    ideal = 0.25
    deviation = abs(ratio - ideal) / ideal
    score = max(55, min(100, int(100 - deviation * 80)))
    return score


def _score_lips(face: np.ndarray) -> int:
    if face is None or face.size == 0:
        return 77
    gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    lip_region = gray[int(h*0.68):int(h*0.85), int(w*0.25):int(w*0.75)]
    if lip_region.size == 0:
        return 75
    std = np.std(lip_region.astype(float))
    score = max(55, min(100, int(55 + std * 0.3)))
    return score


def _score_face_shape_quality(w: int, h: int) -> int:
    if w == 0 or h == 0:
        return 70
    ratio = h / w
    ideal = 1.35
    deviation = abs(ratio - ideal) / ideal
    return max(50, min(100, int(100 - deviation * 90)))


def _detect_face_shape(region: dict) -> str:
    w = region.get("w", 1)
    h = region.get("h", 1)
    if w == 0:
        return "oval"
    ratio = h / w
    if ratio < 1.1:
        return "round"
    elif ratio < 1.25:
        return "square"
    elif ratio < 1.45:
        return "oval"
    elif ratio < 1.6:
        return "oblong"
    else:
        return "diamond"


def _compute_overall(scores: dict) -> int:
    weights = {
        "symmetry": 0.25,
        "golden_ratio": 0.20,
        "harmony": 0.15,
        "eyes": 0.12,
        "jawline": 0.12,
        "nose": 0.08,
        "lips": 0.08,
    }
    total = sum(scores.get(k, 75) * w for k, w in weights.items())
    return int(min(100, max(0, total)))


def _fallback_scores() -> dict:
    return {
        "symmetry": 75,
        "golden_ratio": 75,
        "jawline": 70,
        "eyes": 78,
        "nose": 76,
        "lips": 77,
        "harmony": 75,
        "face_shape_score": 72,
    }
