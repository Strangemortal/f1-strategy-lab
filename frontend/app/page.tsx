"use client";

import { useEffect, useState } from "react";

export default function Home() {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function fetchRaceData() {
			try {
				const response = await fetch("http://localhost:8000/race/mock");

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
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
		<main className="min-h-screen p-10">
			<h1 className="text-4xl font-bold mb-6">🏎️ F1 Strategy Lab</h1>

			{loading && <p className="text-lg">Loading race data...</p>}

			{error && (
				<div className="p-4 rounded border border-red-500">
					<p>Error: {error}</p>
				</div>
			)}

			{data && (
				<div className="mt-6">
					<h2 className="text-2xl font-semibold mb-4">Race Data</h2>

					<pre className="bg-gray-100 p-4 rounded overflow-auto">
						{JSON.stringify(data, null, 2)}
					</pre>
				</div>
			)}
		</main>
	);
}
