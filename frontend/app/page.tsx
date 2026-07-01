"use client";

import { useEffect, useState, useCallback } from "react";
import {
	getRace,
	getTelemetry,
	getDelta,
	getStrategy,
} from "../lib/api";

import RaceSearch from "../components/RaceSearch";
import DriverSelector from "../components/DriverSelector";
import MetricSelector, { MetricKey } from "../components/MetricSelector";
import TelemetryChart from "../components/TelemetryChart";
import TrackMap from "../components/TrackMap";
import LapDeltaChart from "../components/LapDeltaChart";
import StrategyCard from "../components/StrategyCard";
import RecommendationCard from "../components/RecommendationCard";

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

interface DeltaData {
	driver_a: string;
	driver_b: string;
	delta: number[];
	samples: number[];
}

interface Stint {
	compound: string;
	start_lap: number;
	end_lap: number;
}

interface StrategyData {
	driver: string;
	stints: Stint[];
}



export default function Home() {
	const [year, setYear] = useState(2024);
	const [grandPrix, setGrandPrix] = useState("Bahrain");

	const [raceData, setRaceData] = useState<RaceData | null>(null);

	const [telemetryA, setTelemetryA] = useState<TelemetryData | null>(null);

	const [telemetryB, setTelemetryB] = useState<TelemetryData | null>(null);

	const [deltaData, setDeltaData] = useState<DeltaData | null>(null);

	const [strategyData, setStrategyData] = useState<StrategyData | null>(null);



	const [driverA, setDriverA] = useState("VER");

	const [driverB, setDriverB] = useState("HAM");

	const [metric, setMetric] = useState<MetricKey>("speed");

	const [loading, setLoading] = useState(true);

	const [error, setError] = useState("");

	const handleSelectRace = useCallback((newYear: number, newGrandPrix: string) => {
		setYear(newYear);
		setGrandPrix(newGrandPrix);
		// Reset state for new race
		setRaceData(null);
		setTelemetryA(null);
		setTelemetryB(null);
		setDeltaData(null);
		setStrategyData(null);
		setError("");
	}, []);

	useEffect(() => {
		async function loadRace() {
			try {
				setLoading(true);
				const race = await getRace(year, grandPrix);

				setRaceData(race);

				// Set default drivers from the race data if available
				if (race.drivers && race.drivers.length >= 2) {
					setDriverA(race.drivers[0]);
					setDriverB(race.drivers[1]);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load race",
				);
			} finally {
				setLoading(false);
			}
		}

		loadRace();
	}, [year, grandPrix]);

	useEffect(() => {
		if (!raceData) return;

		async function loadAnalytics() {
			try {
				setLoading(true);

				const [dataA, dataB, delta, strategy] =
					await Promise.all([
						getTelemetry(year, grandPrix, driverA),
						getTelemetry(year, grandPrix, driverB),
						getDelta(year, grandPrix, driverA, driverB),
						getStrategy(year, grandPrix, driverA),
					]);

				setTelemetryA(dataA);
				setTelemetryB(dataB);
				setDeltaData(delta);
				setStrategyData(strategy);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load analytics",
				);
			} finally {
				setLoading(false);
			}
		}

		loadAnalytics();
	}, [driverA, driverB, raceData, year, grandPrix]);

	return (
		<main className="min-h-screen bg-black text-white p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header with Search */}
				<div className="mb-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-5xl font-extrabold">
								🏎️ F1 Strategy Lab
							</h1>

							<p className="text-zinc-400 mt-2">
								Telemetry Analysis Workbench
							</p>
						</div>

						<RaceSearch
							onSelectRace={handleSelectRace}
							currentYear={year}
							currentGrandPrix={grandPrix}
						/>
					</div>
				</div>

				{error && (
					<div className="rounded-2xl border border-red-500 bg-red-950 p-6 mb-6">
						{error}
					</div>
				)}

				{raceData && (
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mb-6">
						<div className="flex flex-col md:flex-row md:justify-between gap-4">
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
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mb-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex items-center gap-3">
						<div className="w-5 h-5 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
						<span className="text-zinc-400">Loading analytics...</span>
					</div>
				)}

				{telemetryA && telemetryB && deltaData && !loading && (
					<>
						<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
							<TrackMap driver={driverA} />

							<RecommendationCard driver={driverA} />
						</div>

						<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
							{strategyData && (
								<StrategyCard data={strategyData} />
							)}

							<LapDeltaChart data={deltaData} />
						</div>

						<TelemetryChart
							driverA={driverA}
							driverB={driverB}
							telemetryA={telemetryA}
							telemetryB={telemetryB}
							metric={metric}
						/>
					</>
				)}
			</div>
		</main>
	);
}

