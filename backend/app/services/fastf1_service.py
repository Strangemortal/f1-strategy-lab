from pathlib import Path
import fastf1

BASE_DIR = Path(__file__).resolve().parents[3]
CACHE_DIR = BASE_DIR / "data" / "raw"

CACHE_DIR.mkdir(parents=True, exist_ok=True)

fastf1.Cache.enable_cache(str(CACHE_DIR))


def get_race_info(year: int, grand_prix: str):
    session = fastf1.get_session(year, grand_prix, "R")

    session.load()

    return {
        "event": session.event["EventName"],
        "location": session.event["Location"],
        "country": session.event["Country"],
        "year": year,
        "drivers": session.results["Abbreviation"].tolist(),
    }
