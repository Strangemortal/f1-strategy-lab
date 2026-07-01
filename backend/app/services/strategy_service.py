from functools import lru_cache
from app.services.fastf1_service import get_loaded_session


@lru_cache(maxsize=32)
def get_strategy(
    year: int,
    grand_prix: str,
    driver: str,
):
    session = get_loaded_session(
        year,
        grand_prix,
        "R",
    )


    laps = session.laps.pick_drivers(driver)

    compounds = laps["Compound"].tolist()

    stints = []

    start_lap = 1
    current_compound = compounds[0]

    for i in range(1, len(compounds)):
        if compounds[i] != compounds[i - 1]:
            stints.append(
                {
                    "compound": current_compound,
                    "start_lap": start_lap,
                    "end_lap": i,
                }
            )

            start_lap = i + 1
            current_compound = compounds[i]

    stints.append(
        {
            "compound": current_compound,
            "start_lap": start_lap,
            "end_lap": len(compounds),
        }
    )

    return {
        "driver": driver,
        "stints": stints,
    }
