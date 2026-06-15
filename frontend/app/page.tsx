"use client";

import { useEffect, useState } from "react";
import { getRace, getTelemetry } from "../lib/api";
import DriverSelector from "../components/DriverSelector";
import MetricSelector, { MetricKey } from "../components/MetricSelector";
import TelemetryChart from "../components/TelemetryChart";
import TrackMap from "../components/TrackMap";

interface RaceData {
	event: string;
	location: string;
	country: string;
	year: number;
	drivers: string[];
}

interface TelemetryData {
	driver: string;
	speed: number[];
	throttle: number[];
	brake: number[];
	rpm: number[];
	gear: number[];
	drs: number[];
	samples: number[];
}

export default function Home() {
	const [raceData, setRaceData] = useState<RaceData | null>(null);

	const [telemetryA, setTelemetryA] = useState<TelemetryData | null>(null);

	const [telemetryB, setTelemetryB] = useState<TelemetryData | null>(null);

	const [driverA, setDriverA] = useState("VER");

	const [driverB, setDriverB] = useState("HAM");

	const [metric, setMetric] = useState<MetricKey>("speed");

	const [loading, setLoading] = useState(true);

	const [error, setError] = useState("");

	useEffect(() => {
		async function loadRace() {
			try {
				const race = await getRace(2024, "Bahrain");

				setRaceData(race);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load race",
				);
			}
		}

		loadRace();
	}, []);

	useEffect(() => {
		async function loadTelemetry() {
			try {
				setLoading(true);

				const [dataA, dataB] = await Promise.all([
					getTelemetry(2024, "Bahrain", driverA),
					getTelemetry(2024, "Bahrain", driverB),
				]);

				setTelemetryA(dataA);
				setTelemetryB(dataB);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load telemetry",
				);
			} finally {
				setLoading(false);
			}
		}

		loadTelemetry();
	}, [driverA, driverB]);

	return (
		<main className="min-h-screen bg-black text-white p-8">
			<div className="max-w-7xl mx-auto">
				<div className="mb-10">
					<h1 className="text-5xl font-extrabold">
						🏎️ F1 Strategy Lab
					</h1>

					<p className="text-zinc-400 mt-2">
						Telemetry Analysis Workbench
					</p>
				</div>

				{error && (
					<div className="rounded-2xl border border-red-500 bg-red-950 p-6 mb-8">
						{error}
					</div>
				)}

				{raceData && (
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 mb-8">
						<div className="flex flex-col md:flex-row md:justify-between gap-6">
							<div>
								<h2 className="text-3xl font-bold">
									{raceData.event}
								</h2>

								<p className="text-zinc-400 mt-2">
									📍 {raceData.location}, {raceData.country}
								</p>
							</div>

							<div>
								<p className="text-zinc-500 uppercase text-sm">
									Season
								</p>

								<p className="text-3xl font-bold">
									{raceData.year}
								</p>
							</div>
						</div>
					</div>
				)}

				{raceData && (
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 mb-8">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<DriverSelector
								label="Driver A"
								value={driverA}
								drivers={raceData.drivers}
								onChange={setDriverA}
							/>

							<DriverSelector
								label="Driver B"
								value={driverB}
								drivers={raceData.drivers}
								onChange={setDriverB}
							/>

							<MetricSelector
								value={metric}
								onChange={setMetric}
							/>
						</div>
					</div>
				)}

				{loading && (
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
						Loading telemetry...
					</div>
				)}

				{telemetryA && telemetryB && !loading && (
					<>
						<TelemetryChart
							driverA={driverA}
							driverB={driverB}
							telemetryA={telemetryA}
							telemetryB={telemetryB}
							metric={metric}
						/>

						<TrackMap driver={driverA} />
					</>
				)}
			</div>
		</main>
	);
}
