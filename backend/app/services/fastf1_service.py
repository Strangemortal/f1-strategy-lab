from pathlib import Path
from functools import lru_cache
import fastf1

BASE_DIR = Path(__file__).resolve().parents[3]
CACHE_DIR = BASE_DIR / "data" / "raw"

CACHE_DIR.mkdir(parents=True, exist_ok=True)

fastf1.Cache.enable_cache(str(CACHE_DIR))


@lru_cache(maxsize=4)
def get_loaded_session(year: int, grand_prix: str, session_type: str = "R"):
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    return session


@lru_cache(maxsize=32)
def get_race_info(year: int, grand_prix: str):
    session = get_loaded_session(year, grand_prix)
    return {
        "event": session.event["EventName"],
        "location": session.event["Location"],
        "country": session.event["Country"],
        "year": year,
        "drivers": session.results["Abbreviation"].tolist(),
    }

