import fastf1


def get_lap_delta(
    year: int,
    grand_prix: str,
    driver_a: str,
    driver_b: str
):
    session = fastf1.get_session(
        year,
        grand_prix,
        "R"
    )

    session.load()

    lap_a = (
        session.laps
        .pick_drivers(driver_a)
        .pick_fastest()
    )

    lap_b = (
        session.laps
        .pick_drivers(driver_b)
        .pick_fastest()
    )

    telemetry_a = lap_a.get_car_data()
    telemetry_b = lap_b.get_car_data()

    min_len = min(
        len(telemetry_a),
        len(telemetry_b)
    )

    speed_a = (
        telemetry_a["Speed"]
        .tolist()[:min_len]
    )

    speed_b = (
        telemetry_b["Speed"]
        .tolist()[:min_len]
    )

    delta = [
        a - b
        for a, b in zip(
            speed_a,
            speed_b
        )
    ]

    return {
        "driver_a": driver_a,
        "driver_b": driver_b,
        "delta": delta,
        "samples": list(
            range(min_len)
        )
    }