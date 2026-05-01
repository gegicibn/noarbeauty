"""
Cefalometrijska analiza lica koristeći MediaPipe Face Mesh (468 tačaka).
Implementirani standardi: Farkas (1994), Powell (1984), Gonzalez-Ulloa, zlatni rez.
"""
import math
import numpy as np
import cv2
import mediapipe as mp

mp_face_mesh = mp.solutions.face_mesh

# Ključni indeksi MediaPipe Face Mesh landmarka
# ref: https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_geometry/data/canonical_face_model_uv_visualization.png
LM = {
    # Kontura lica
    "chin":          152,
    "forehead_top":   10,
    "left_jaw":       234,
    "right_jaw":       454,
    "left_temple":    162,
    "right_temple":   389,

    # Oči
    "left_eye_inner":  133,
    "left_eye_outer":  33,
    "left_eye_top":    159,
    "left_eye_bot":    145,
    "right_eye_inner": 362,
    "right_eye_outer": 263,
    "right_eye_top":   386,
    "right_eye_bot":   374,
    "left_canthus_inner":  130,
    "right_canthus_inner": 359,
    "left_canthus_outer":  33,
    "right_canthus_outer": 263,

    # Nos
    "nose_tip":        4,
    "nose_base":       2,
    "nose_left_ala":   218,
    "nose_right_ala":  438,
    "nose_top":        6,
    "nasion":          168,
    "columella":       94,

    # Usta
    "mouth_left":      61,
    "mouth_right":     291,
    "upper_lip_top":   0,
    "lower_lip_bot":   17,
    "upper_lip_cupid_l": 37,
    "upper_lip_cupid_r": 267,

    # Obrve
    "left_brow_inner":  55,
    "right_brow_inner": 285,
    "left_brow_outer":  46,
    "right_brow_outer": 276,

    # Vilica
    "left_gonion":     172,
    "right_gonion":    397,
    "menton":          152,
    "glabella":          9,
    "pogonion":        199,
    "subnasale":       94,
    "stomion":         13,

    # Zigomatik
    "left_zygoma":    123,
    "right_zygoma":   352,
}


def _lm(landmarks, key: str, w: int, h: int) -> tuple[float, float]:
    l = landmarks[LM[key]]
    return l.x * w, l.y * h


def _dist(a: tuple, b: tuple) -> float:
    return math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)


def _angle_deg(a: tuple, b: tuple, c: tuple) -> float:
    """Ugao u tački b (a-b-c)."""
    ba = (a[0]-b[0], a[1]-b[1])
    bc = (c[0]-b[0], c[1]-b[1])
    cos_a = (ba[0]*bc[0] + ba[1]*bc[1]) / (
        math.sqrt(ba[0]**2+ba[1]**2) * math.sqrt(bc[0]**2+bc[1]**2) + 1e-9
    )
    return math.degrees(math.acos(max(-1, min(1, cos_a))))


def _clamp(val: float, lo=50, hi=100) -> int:
    return int(max(lo, min(hi, val)))


def analyze_front(image_path: str) -> dict:
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Ne mogu da učitam sliku")

    h, w = img.shape[:2]
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    with mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
    ) as mesh:
        result = mesh.process(rgb)

    if not result.multi_face_landmarks:
        raise ValueError("Nije detektovano lice na frontalnoj fotografiji")

    lms = result.multi_face_landmarks[0].landmark

    def p(key): return _lm(lms, key, w, h)

    # ── Osnovna merenja ──────────────────────────────────────────
    face_w = _dist(p("left_jaw"), p("right_jaw"))         # bizigomatic width
    face_h = _dist(p("forehead_top"), p("chin"))          # morphological height
    zygom_w = _dist(p("left_zygoma"), p("right_zygoma"))  # zygomatic width
    jaw_w = _dist(p("left_gonion"), p("right_gonion"))    # bigonial width
    nose_w = _dist(p("nose_left_ala"), p("nose_right_ala"))
    mouth_w = _dist(p("mouth_left"), p("mouth_right"))
    eye_l_w = _dist(p("left_eye_outer"), p("left_eye_inner"))
    eye_r_w = _dist(p("right_eye_outer"), p("right_eye_inner"))
    interocular = _dist(p("right_eye_inner"), p("left_eye_inner"))  # endocanthal dist
    lip_h = _dist(p("upper_lip_top"), p("lower_lip_bot"))

    # Trećine lica (Farkas)
    upper_third = _dist(p("forehead_top"), p("glabella"))
    mid_third = _dist(p("glabella"), p("subnasale"))
    lower_third = _dist(p("subnasale"), p("menton"))

    # ── Simetrija ───────────────────────────────────────────────
    nose_x, _ = p("nose_tip")
    face_cx = (p("left_jaw")[0] + p("right_jaw")[0]) / 2
    nose_deviation = abs(nose_x - face_cx) / (face_w + 1e-9)

    eye_l_cx = (p("left_eye_inner")[0] + p("left_eye_outer")[0]) / 2
    eye_r_cx = (p("right_eye_inner")[0] + p("right_eye_outer")[0]) / 2
    eye_sym = abs(abs(eye_l_cx - face_cx) - abs(eye_r_cx - face_cx)) / (face_w + 1e-9)

    symmetry_raw = 1 - (nose_deviation * 0.5 + eye_sym * 0.5)
    symmetry = _clamp(symmetry_raw * 110, 50, 100)

    # ── Zlatni rez (φ = 1.618) ───────────────────────────────────
    PHI = 1.618
    ratios = [
        face_h / (face_w + 1e-9),                       # idealno 1.618
        zygom_w / (jaw_w + 1e-9),                        # idealno 1.618
        nose_w / (mouth_w + 1e-9),                       # idealno 0.618
        interocular / (eye_l_w + eye_r_w + 1e-9) * 2,   # idealno 1.0
    ]
    ideal = [PHI, PHI, 1/PHI, 1.0]
    gr_deviations = [abs(r - i) / (i + 1e-9) for r, i in zip(ratios, ideal)]
    golden_ratio = _clamp(100 - np.mean(gr_deviations) * 120)

    # ── Trećine (Farkas: idealno 1:1:1) ──────────────────────────
    thirds_total = upper_third + mid_third + lower_third + 1e-9
    thirds_ideal = thirds_total / 3
    thirds_dev = (
        abs(upper_third - thirds_ideal) +
        abs(mid_third - thirds_ideal) +
        abs(lower_third - thirds_ideal)
    ) / (thirds_total)
    facial_thirds = _clamp(100 - thirds_dev * 150)

    # ── Canthal tilt ─────────────────────────────────────────────
    l_inner = p("left_canthus_inner")
    l_outer = p("left_canthus_outer")
    r_inner = p("right_canthus_inner")
    r_outer = p("right_canthus_outer")

    l_tilt = math.degrees(math.atan2(l_outer[1] - l_inner[1], l_outer[0] - l_inner[0]))
    r_tilt = math.degrees(math.atan2(r_inner[1] - r_outer[1], r_inner[0] - r_outer[0]))
    avg_tilt = (l_tilt + r_tilt) / 2
    # Pozitivan canthal tilt (oči nagore ka spoljašnjem uglu) = poželjno
    # avg_tilt negativan u image koordinatama = pozitivan tilt
    canthal_tilt_raw = max(0, -avg_tilt)  # 0–15° je idealan opseg
    canthal_tilt = _clamp(60 + canthal_tilt_raw * 3.5, 55, 100)

    # ── Razmak očiju ─────────────────────────────────────────────
    # Idealno: interocular = prosek širine jednog oka
    avg_eye_w = (eye_l_w + eye_r_w) / 2
    eye_ratio = interocular / (avg_eye_w + 1e-9)
    eye_ratio_dev = abs(eye_ratio - 1.0)
    eye_spacing = _clamp(100 - eye_ratio_dev * 70)

    # ── Širina nosa ───────────────────────────────────────────────
    # Farkas: nos/lice idealno 0.25
    nose_ratio = nose_w / (face_w + 1e-9)
    nose_ratio_dev = abs(nose_ratio - 0.25) / 0.25
    nose_width_ratio = _clamp(100 - nose_ratio_dev * 80)

    # ── Proporcija usana ─────────────────────────────────────────
    # Gornja:donja = 1:1.618 (idealno)
    upper_lip_h = _dist(p("upper_lip_top"), p("stomion"))
    lower_lip_h = _dist(p("stomion"), p("lower_lip_bot"))
    lip_ratio_val = upper_lip_h / (lower_lip_h + 1e-9)
    lip_ratio_dev = abs(lip_ratio_val - (1/PHI))
    lip_ratio = _clamp(100 - lip_ratio_dev * 100)

    # ── Oblik lica ────────────────────────────────────────────────
    face_shape, jaw_class = _classify_face(face_h, face_w, jaw_w, zygom_w)

    # ── Farkas indeks ─────────────────────────────────────────────
    # Morfometrički indeks: idealno kombinacija proporcija
    morphological_index = (face_w / (face_h + 1e-9)) * 100
    # Idealan opseg: 80-85 (euryprosop vs leptoprosop)
    farkas_dev = abs(morphological_index - 82) / 82
    farkas_index = _clamp(100 - farkas_dev * 120)

    # ── Jawline ───────────────────────────────────────────────────
    # Jaw taper: jaw_w/zygom_w, idealno 0.75-0.80
    jaw_taper = jaw_w / (zygom_w + 1e-9)
    jaw_dev = abs(jaw_taper - 0.775) / 0.775
    jawline = _clamp(100 - jaw_dev * 100)

    # ── Harmonija ─────────────────────────────────────────────────
    harmony = _clamp(np.mean([symmetry, golden_ratio, facial_thirds, eye_spacing]) * 0.97)

    # ── Overall ───────────────────────────────────────────────────
    weights = {
        "symmetry": 0.22,
        "golden_ratio": 0.18,
        "canthal_tilt": 0.12,
        "farkas_index": 0.12,
        "facial_thirds": 0.10,
        "jawline": 0.10,
        "eye_spacing": 0.08,
        "nose_width_ratio": 0.05,
        "lip_ratio": 0.03,
    }
    scores = dict(
        symmetry=symmetry, golden_ratio=golden_ratio, jawline=jawline,
        canthal_tilt=canthal_tilt, facial_thirds=facial_thirds,
        eye_spacing=eye_spacing, nose_width_ratio=nose_width_ratio,
        lip_ratio=lip_ratio, harmony=harmony, farkas_index=farkas_index,
        nasofrontal_angle=0, nasolabial_angle=0,  # popunjava se iz profila
    )
    overall = int(sum(scores.get(k, 75) * w for k, w in weights.items()))

    return {
        "scores": scores,
        "overall": overall,
        "face_shape": face_shape,
        "jaw_class": jaw_class,
        "measurements": {
            "face_width_mm": round(face_w, 1),
            "face_height_mm": round(face_h, 1),
            "zygomatic_width": round(zygom_w, 1),
            "jaw_width": round(jaw_w, 1),
            "nose_width": round(nose_w, 1),
            "mouth_width": round(mouth_w, 1),
            "interocular_distance": round(interocular, 1),
            "upper_facial_third": round(upper_third, 1),
            "mid_facial_third": round(mid_third, 1),
            "lower_facial_third": round(lower_third, 1),
            "canthal_tilt_degrees": round(avg_tilt, 2),
            "facial_index": round(morphological_index, 1),
        },
    }


def analyze_profile(image_path: str, side: str = "left") -> dict:
    """Powell profil analiza — nasolabijalni i nazofrontalni ugao."""
    img = cv2.imread(image_path)
    if img is None:
        return {"nasofrontal_angle": 75, "nasolabial_angle": 75}

    h, w = img.shape[:2]
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    with mp_face_mesh.FaceMesh(
        static_image_mode=True, max_num_faces=1,
        refine_landmarks=True, min_detection_confidence=0.5
    ) as mesh:
        result = mesh.process(rgb)

    if not result.multi_face_landmarks:
        return {"nasofrontal_angle": 75, "nasolabial_angle": 75}

    lms = result.multi_face_landmarks[0].landmark
    def p(key): return _lm(lms, key, w, h)

    # Nazofrontalni ugao (glabela - nasion - nos tip) — idealno 115-130°
    nasofrontal_raw = _angle_deg(p("glabella"), p("nasion"), p("nose_tip"))
    nasofrontal_dev = abs(nasofrontal_raw - 122.5) / 7.5
    nasofrontal_score = _clamp(100 - nasofrontal_dev * 40)

    # Nasolabijalni ugao (columela - subnasale - gornja usna) — idealno 90-120° (ž: 95-115, m: 90-105)
    nasolabial_raw = _angle_deg(p("nose_tip"), p("subnasale"), p("upper_lip_top"))
    nasolabial_dev = abs(nasolabial_raw - 107.5) / 12.5
    nasolabial_score = _clamp(100 - nasolabial_dev * 40)

    return {
        "nasofrontal_angle": nasofrontal_score,
        "nasolabial_angle": nasolabial_score,
        "nasofrontal_angle_deg": round(nasofrontal_raw, 1),
        "nasolabial_angle_deg": round(nasolabial_raw, 1),
    }


def _classify_face(h: float, w: float, jaw_w: float, zygom_w: float) -> tuple[str, str]:
    ratio = h / (w + 1e-9)
    taper = jaw_w / (zygom_w + 1e-9)

    if ratio < 1.1:
        shape = "Okruglo"
    elif ratio < 1.25:
        if taper < 0.75:
            shape = "Srce"
        else:
            shape = "Kvadratno"
    elif ratio < 1.45:
        if taper < 0.72:
            shape = "Dijamant"
        else:
            shape = "Ovalno"
    elif ratio < 1.6:
        shape = "Pravokutno"
    else:
        shape = "Izduženo"

    # Jaw klasa (simplicistička — za pravu okluziju potreban je CBCT)
    jaw_class = "Klasa I"  # Placeholder — profil analiza može dati bolji uvid

    return shape, jaw_class


def extract_landmarks(image_path: str) -> list[dict] | None:
    """Ekstraktuje 468 landmark koordinata (normalizovano 0-1) za canvas overlay."""
    img = cv2.imread(image_path)
    if img is None:
        return None
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    with mp_face_mesh.FaceMesh(
        static_image_mode=True, max_num_faces=1,
        refine_landmarks=True, min_detection_confidence=0.5
    ) as mesh:
        result = mesh.process(rgb)
    if not result.multi_face_landmarks:
        return None
    lms = result.multi_face_landmarks[0].landmark
    return [{"x": round(lm.x, 4), "y": round(lm.y, 4), "z": round(lm.z, 4)} for lm in lms]


def merge_results(front: dict, profile_l: dict, profile_r: dict) -> dict:
    """Kombinuje frontalnu i profil analizu u finalni rezultat."""
    # Uzimamo prosek oba profila za uglove
    nf_score = (profile_l.get("nasofrontal_angle", 75) + profile_r.get("nasofrontal_angle", 75)) // 2
    nl_score = (profile_l.get("nasolabial_angle", 75) + profile_r.get("nasolabial_angle", 75)) // 2

    front["scores"]["nasofrontal_angle"] = nf_score
    front["scores"]["nasolabial_angle"] = nl_score

    # Recompute overall sa svim metrikama
    weights = {
        "symmetry": 0.20, "golden_ratio": 0.16, "canthal_tilt": 0.12,
        "farkas_index": 0.10, "facial_thirds": 0.09, "jawline": 0.09,
        "nasofrontal_angle": 0.07, "nasolabial_angle": 0.07,
        "eye_spacing": 0.05, "nose_width_ratio": 0.03, "lip_ratio": 0.02,
    }
    overall = int(sum(front["scores"].get(k, 75) * w for k, w in weights.items()))
    front["overall"] = min(100, max(0, overall))

    # Dodaj merenja iz profila
    front.setdefault("measurements", {})
    front["measurements"]["nasofrontal_angle_deg"] = profile_l.get("nasofrontal_angle_deg")
    front["measurements"]["nasolabial_angle_deg"] = profile_l.get("nasolabial_angle_deg")

    return front
