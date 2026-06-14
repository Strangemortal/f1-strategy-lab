"use client";

import { useEffect, useState } from "react";

interface RaceData {
	event: string;
	location: string;
	country: string;
	year: number;
	drivers: string[];
}

export default function Home() {
	const [data, setData] = useState<RaceData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function fetchRaceData() {
			try {
				const response = await fetch(
					"http://localhost:8000/race/2024/Bahrain",
				);

				if (!response.ok) {
					throw new Error(`HTTP Error: ${response.status}`);
				}

				const raceData = await response.json();

				setData(raceData);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Something went wrong",
				);
			} finally {
				setLoading(false);
			}
		}

		fetchRaceData();
	}, []);

	return (
		<main className="min-h-screen bg-black text-white p-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-10">
					<h1 className="text-5xl font-extrabold">
						🏎️ F1 Strategy Lab
					</h1>

					<p className="text-zinc-400 mt-2">
						Race Analytics & Strategy Platform
					</p>
				</div>

				{/* Loading */}
				{loading && (
					<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
						<p className="text-lg">Loading race data...</p>
					</div>
				)}

				{/* Error */}
				{error && (
					<div className="rounded-2xl border border-red-500 bg-red-950 p-6">
						<p className="font-semibold">Error</p>

						<p className="mt-2 text-red-300">{error}</p>
					</div>
				)}

				{/* Data */}
				{data && (
					<>
						{/* Race Info Card */}
						<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
								<div>
									<h2 className="text-3xl font-bold">
										{data.event}
									</h2>

									<p className="text-zinc-400 mt-2">
										📍 {data.location}, {data.country}
									</p>
								</div>

								<div className="text-left md:text-right">
									<p className="text-zinc-500 text-sm uppercase">
										Season
									</p>

									<p className="text-3xl font-bold">
										{data.year}
									</p>
								</div>
							</div>
						</div>

						{/* Drivers */}
						<div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-2xl font-bold">Drivers</h3>

								<span className="text-zinc-500">
									{data.drivers.length} Drivers
								</span>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
								{data.drivers.map((driver) => (
									<div
										key={driver}
										className="rounded-xl bg-zinc-800 p-4 text-center font-semibold transition hover:bg-zinc-700 hover:scale-105 cursor-pointer"
									>
										{driver}
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
