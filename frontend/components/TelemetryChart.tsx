"use client";

import dynamic from "next/dynamic";
import { MetricKey } from "./MetricSelector";

const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
});

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

interface TelemetryChartProps {
	driverA: string;
	driverB: string;
	telemetryA: TelemetryData;
	telemetryB: TelemetryData;
	metric: MetricKey;
}

export default function TelemetryChart({
	driverA,
	driverB,
	telemetryA,
	telemetryB,
	metric,
}: TelemetryChartProps) {
	const metricLabel = {
		speed: "Speed",
		throttle: "Throttle",
		brake: "Brake",
		rpm: "RPM",
		gear: "Gear",
		drs: "DRS",
	};

	return (
		<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
			<div className="flex justify-between items-center mb-6">
				<h3 className="text-2xl font-bold">
					{metricLabel[metric]} Comparison
				</h3>

				<div className="flex gap-4 text-sm">
					<span>🟦 {driverA}</span>

					<span>🟥 {driverB}</span>
				</div>
			</div>

			<Plot
				data={[
					{
						x: telemetryA.samples,
						y: telemetryA[metric] as number[],
						type: "scatter",
						mode: "lines",
						name: driverA,
					},
					{
						x: telemetryB.samples,
						y: telemetryB[metric] as number[],
						type: "scatter",
						mode: "lines",
						name: driverB,
					},
				]}
				layout={{
					title: `${metricLabel[metric]} Telemetry`,
					height: 600,
					paper_bgcolor: "rgb(24,24,27)",
					plot_bgcolor: "rgb(24,24,27)",
					font: {
						color: "white",
					},
					margin: {
						l: 60,
						r: 20,
						t: 60,
						b: 60,
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
	);
}
