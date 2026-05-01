"""
Etnički normativi za cefalometrijska merenja.
Izvor: Farkas LG (1994), Kolar JC & Salter EM (1997), Porter JP (2004).
Vrednosti su srednje vrednosti ± SD za svaku etničku grupu.

Koristi se za percentilni rang — gde se nalaze proporcije korisnika
u odnosu na statistički prosek njihove etničke grupe.
"""

from dataclasses import dataclass
from typing import Optional
import math

@dataclass
class EthnicNorm:
    """Normativne vrednosti za jednu metriku."""
    mean: float
    sd: float
    unit: str = "mm"

    def percentile(self, value: float) -> int:
        """Z-score → percentil (1–99)."""
        if self.sd == 0:
            return 50
        z = (value - self.mean) / self.sd
        # Approx normal CDF
        p = 0.5 * (1 + math.erf(z / math.sqrt(2)))
        return int(max(1, min(99, round(p * 100))))

    def score_100(self, value: float) -> int:
        """Koliko je vrednost blizu srednje vrednosti (100 = idealno)."""
        deviation = abs(value - self.mean) / (self.sd + 1e-9)
        return int(max(40, min(100, 100 - deviation * 20)))


# Tipovi etničkih grupa koje podržavamo
ETHNICITIES = [
    "european",
    "east_asian",
    "south_asian",
    "african",
    "latin",
    "middle_eastern",
    "slavic",   # Balkanska specifičnost
]

# Normativne tabele po etničkim grupama
# Merenja u pikselima su relativna, koristimo proporcije (bezdimenzione)
NORMS: dict[str, dict[str, EthnicNorm]] = {
    "european": {
        "facial_index":        EthnicNorm(mean=86.5, sd=6.2, unit=""),     # h/w * 100
        "nose_width_ratio":    EthnicNorm(mean=0.255, sd=0.022, unit=""),
        "mouth_nose_ratio":    EthnicNorm(mean=1.35, sd=0.11, unit=""),
        "interocular_ratio":   EthnicNorm(mean=0.31, sd=0.025, unit=""),
        "nasolabial_angle":    EthnicNorm(mean=109.5, sd=7.8, unit="°"),
        "nasofrontal_angle":   EthnicNorm(mean=122.0, sd=6.5, unit="°"),
        "canthal_tilt":        EthnicNorm(mean=2.1, sd=2.8, unit="°"),
    },
    "slavic": {
        "facial_index":        EthnicNorm(mean=85.0, sd=6.5, unit=""),
        "nose_width_ratio":    EthnicNorm(mean=0.250, sd=0.020, unit=""),
        "mouth_nose_ratio":    EthnicNorm(mean=1.38, sd=0.12, unit=""),
        "interocular_ratio":   EthnicNorm(mean=0.315, sd=0.024, unit=""),
        "nasolabial_angle":    EthnicNorm(mean=107.0, sd=8.0, unit="°"),
        "nasofrontal_angle":   EthnicNorm(mean=121.5, sd=6.8, unit="°"),
        "canthal_tilt":        EthnicNorm(mean=1.8, sd=2.5, unit="°"),
    },
    "east_asian": {
        "facial_index":        EthnicNorm(mean=83.5, sd=5.8, unit=""),
        "nose_width_ratio":    EthnicNorm(mean=0.290, sd=0.028, unit=""),
        "mouth_nose_ratio":    EthnicNorm(mean=1.28, sd=0.10, unit=""),
        "interocular_ratio":   EthnicNorm(mean=0.355, sd=0.028, unit=""),
        "nasolabial_angle":    EthnicNorm(mean=102.0, sd=9.2, unit="°"),
        "nasofrontal_angle":   EthnicNorm(mean=125.5, sd=7.0, unit="°"),
        "canthal_tilt":        EthnicNorm(mean=-1.2, sd=3.0, unit="°"),
    },
    "south_asian": {
        "facial_index":        EthnicNorm(mean=84.0, sd=6.0, unit=""),
        "nose_width_ratio":    EthnicNorm(mean=0.285, sd=0.026, unit=""),
        "mouth_nose_ratio":    EthnicNorm(mean=1.30, sd=0.11, unit=""),
        "interocular_ratio":   EthnicNorm(mean=0.330, sd=0.027, unit=""),
        "nasolabial_angle":    EthnicNorm(mean=104.5, sd=8.5, unit="°"),
        "nasofrontal_angle":   EthnicNorm(mean=123.0, sd=7.2, unit="°"),
        "canthal_tilt":        EthnicNorm(mean=0.5, sd=2.9, unit="°"),
    },
    "african": {
        "facial_index":        EthnicNorm(mean=88.0, sd=7.0, unit=""),
        "nose_width_ratio":    EthnicNorm(mean=0.335, sd=0.032, unit=""),
        "mouth_nose_ratio":    EthnicNorm(mean=1.20, sd=0.12, unit=""),
        "interocular_ratio":   EthnicNorm(mean=0.320, sd=0.030, unit=""),
        "nasolabial_angle":    EthnicNorm(mean=106.0, sd=9.5, unit="°"),
        "nasofrontal_angle":   EthnicNorm(mean=119.5, sd=8.0, unit="°"),
        "canthal_tilt":        EthnicNorm(mean=1.0, sd=3.2, unit="°"),
    },
    "latin": {
        "facial_index":        EthnicNorm(mean=85.5, sd=6.3, unit=""),
        "nose_width_ratio":    EthnicNorm(mean=0.275, sd=0.024, unit=""),
        "mouth_nose_ratio":    EthnicNorm(mean=1.32, sd=0.11, unit=""),
        "interocular_ratio":   EthnicNorm(mean=0.325, sd=0.026, unit=""),
        "nasolabial_angle":    EthnicNorm(mean=105.5, sd=8.2, unit="°"),
        "nasofrontal_angle":   EthnicNorm(mean=120.5, sd=7.0, unit="°"),
        "canthal_tilt":        EthnicNorm(mean=1.5, sd=2.7, unit="°"),
    },
    "middle_eastern": {
        "facial_index":        EthnicNorm(mean=87.0, sd=6.5, unit=""),
        "nose_width_ratio":    EthnicNorm(mean=0.265, sd=0.023, unit=""),
        "mouth_nose_ratio":    EthnicNorm(mean=1.33, sd=0.11, unit=""),
        "interocular_ratio":   EthnicNorm(mean=0.318, sd=0.025, unit=""),
        "nasolabial_angle":    EthnicNorm(mean=103.0, sd=8.8, unit="°"),
        "nasofrontal_angle":   EthnicNorm(mean=121.0, sd=7.5, unit="°"),
        "canthal_tilt":        EthnicNorm(mean=1.2, sd=2.6, unit="°"),
    },
}


def get_percentile_ranks(
    measurements: dict,
    ethnicity: str = "slavic"
) -> dict[str, int]:
    """
    Izračunaj percentilni rang za svako merenje.
    Vraća dict sa percentilima (1-99) za svaku dostupnu metriku.
    """
    norms = NORMS.get(ethnicity, NORMS["european"])
    result = {}

    mapping = {
        "facial_index":       "facial_index",
        "nose_width_ratio":   "nose_width_ratio",
        "nasolabial_angle_deg": "nasolabial_angle",
        "nasofrontal_angle_deg": "nasofrontal_angle",
        "canthal_tilt_degrees": "canthal_tilt",
    }

    for meas_key, norm_key in mapping.items():
        if meas_key in measurements and norm_key in norms:
            val = measurements[meas_key]
            if val is not None:
                result[norm_key] = norms[norm_key].percentile(float(val))

    return result


def get_ethnic_adjusted_scores(
    scores: dict,
    measurements: dict,
    ethnicity: str = "slavic"
) -> dict:
    """
    Prilagodi ocene u odnosu na etničke norme.
    Vraća ažurirane ocene.
    """
    norms = NORMS.get(ethnicity, NORMS["european"])
    adjusted = dict(scores)

    if "nasofrontal_angle_deg" in measurements and measurements["nasofrontal_angle_deg"]:
        val = measurements["nasofrontal_angle_deg"]
        adjusted["nasofrontal_angle"] = norms["nasofrontal_angle"].score_100(val)

    if "nasolabial_angle_deg" in measurements and measurements["nasolabial_angle_deg"]:
        val = measurements["nasolabial_angle_deg"]
        adjusted["nasolabial_angle"] = norms["nasolabial_angle"].score_100(val)

    return adjusted
