"use client";

import Plot from "react-plotly.js";

export default function TelemetryChart({
	distance,
	speed,
}: {
	distance: number[];
	speed: number[];
}) {
	return (
		<Plot
			data={[
				{
					x: distance,
					y: speed,
					type: "scatter",
					mode: "lines",
				},
			]}
			layout={{
				title: "Speed Trace",
				height: 500,
				paper_bgcolor: "#18181b",
				plot_bgcolor: "#18181b",
				font: {
					color: "white",
				},
			}}
			style={{
				width: "100%",
			}}
		/>
	);
}
