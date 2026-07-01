from functools import lru_cache
from app.services.fastf1_service import get_loaded_session


@lru_cache(maxsize=32)
def get_driver_telemetry(year: int, grand_prix: str, driver: str):
    session = get_loaded_session(year, grand_prix)

    laps = session.laps.pick_drivers(driver)

    fastest_lap = laps.pick_fastest()

    telemetry = fastest_lap.get_car_data().reset_index(drop=True)

    return {
        "driver": driver,
        "speed": telemetry["Speed"].fillna(0).tolist(),
        "throttle": telemetry["Throttle"].fillna(0).tolist(),
        "brake": telemetry["Brake"].astype(int).tolist(),
        "rpm": telemetry["RPM"].fillna(0).tolist(),
        "gear": telemetry["nGear"].fillna(0).tolist(),
        "drs": telemetry["DRS"].fillna(0).tolist(),
        "samples": list(range(len(telemetry))),
    }

