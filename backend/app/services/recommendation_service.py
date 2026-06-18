import fastf1

SOFT_MAX = 18
MEDIUM_MAX = 25
HARD_MAX = 32


def get_strategy_recommendation(
    year: int,
    grand_prix: str,
    driver: str,
):
    session = fastf1.get_session(
        year,
        grand_prix,
        "R",
    )

    session.load()

    laps = session.laps.pick_drivers(driver)

    latest_lap = laps.iloc[-1]

    compound = latest_lap["Compound"]

    tyre_life = int(latest_lap["TyreLife"])

    max_life = {
        "SOFT": SOFT_MAX,
        "MEDIUM": MEDIUM_MAX,
        "HARD": HARD_MAX,
    }.get(compound, 20)

    remaining_laps = max_life - tyre_life

    if remaining_laps <= 0:
        message = "BOX THIS LAP"
    elif remaining_laps <= 3:
        message = "PIT WINDOW OPEN"
    else:
        message = "STAY OUT"

    return {
        "driver": driver,
        "current_compound": compound,
        "current_tyre_life": tyre_life,
        "recommended_pit_lap": int(latest_lap["LapNumber"] + max(remaining_laps, 0)),
        "remaining_laps": remaining_laps,
        "message": message,
    }
