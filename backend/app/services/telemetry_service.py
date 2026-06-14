import fastf1


def get_driver_telemetry(year: int, grand_prix: str, driver: str):
    session = fastf1.get_session(year, grand_prix, "R")

    session.load()

    laps = session.laps.pick_drivers(driver)

    fastest_lap = laps.pick_fastest()

    telemetry = fastest_lap.get_car_data()

    return {
        "driver": driver,
        "speed": telemetry["Speed"].tolist(),
        "samples": list(range(len(telemetry))),
    }
