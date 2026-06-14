"use client";

import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

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
	samples: number[];
}

export default function Home() {
	const [raceData, setRaceData] = useState<RaceData | null>(null);
	const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(
		null,
	);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function fetchData() {
			try {
				const [raceResponse, telemetryResponse] = await Promise.all([
					fetch("http://localhost:8000/race/2024/Bahrain"),
					fetch("http://localhost:8000/telemetry/2024/Bahrain/VER"),
				]);

				if (!raceResponse.ok) {
					throw new Error(`Race API Error: ${raceResponse.status}`);
				}

				if (!telemetryResponse.ok) {
					throw new Error(
						`Telemetry API Error: ${telemetryResponse.status}`,
					);
				}

				const race = await raceResponse.json();
				const telemetry = await telemetryResponse.json();

				setRaceData(race);
				setTelemetryData(telemetry);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Something went wrong",
				);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	return (
		<main className="min-h-screen bg-black text-white p-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-10">
					<h1 className="text-5xl font-extrabold">
						🏎️ F1 Strategy Lab
					</h1>

					<p className="text-zinc-400 mt-2">
						Race Analytics & Strategy Platform
					</p>
				</div>

				{loading && (
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
						<p className="text-lg">Loading telemetry...</p>
					</div>
				)}

				{error && (
					<div className="rounded-2xl border border-red-500 bg-red-950 p-6">
						<p>{error}</p>
					</div>
				)}

				{raceData && (
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
							<div>
								<h2 className="text-3xl font-bold">
									{raceData.event}
								</h2>

								<p className="text-zinc-400 mt-2">
									📍 {raceData.location}, {raceData.country}
								</p>
							</div>

							<div className="text-left md:text-right">
								<p className="text-zinc-500 text-sm uppercase">
									Season
								</p>

								<p className="text-3xl font-bold">
									{raceData.year}
								</p>
							</div>
						</div>
					</div>
				)}

				{telemetryData && (
					<div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-2xl font-bold">
								{telemetryData.driver} Fastest Lap
							</h3>

							<span className="text-zinc-400">Speed Trace</span>
						</div>

						<Plot
							data={[
								{
									x: telemetryData.samples,
									y: telemetryData.speed,
									type: "scatter",
									mode: "lines",
								},
							]}
							layout={{
								title: "Speed Telemetry",
								height: 500,
								paper_bgcolor: "rgb(24,24,27)",
								plot_bgcolor: "rgb(24,24,27)",
								font: {
									color: "white",
								},
								margin: {
									l: 50,
									r: 20,
									t: 50,
									b: 50,
								},
							}}
							style={{
								width: "100%",
							}}
							config={{
								responsive: true,
							}}
						/>
					</div>
				)}
			</div>
		</main>
	);
}
