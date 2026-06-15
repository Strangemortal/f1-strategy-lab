const API_BASE = "http://localhost:8000";

export async function getRace(year: number, grandPrix: string) {
	const response = await fetch(`${API_BASE}/race/${year}/${grandPrix}`);

	if (!response.ok) {
		throw new Error("Failed to fetch race");
	}

	return response.json();
}

export async function getTelemetry(
	year: number,
	grandPrix: string,
	driver: string,
) {
	const response = await fetch(
		`${API_BASE}/telemetry/${year}/${grandPrix}/${driver}`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch telemetry");
	}

	return response.json();
}

export async function getTrack(
	year: number,
	grandPrix: string,
	driver: string,
) {
	const response = await fetch(
		`${API_BASE}/track/${year}/${grandPrix}/${driver}`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch track");
	}

	return response.json();
}
