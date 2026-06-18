"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
});

interface DeltaData {
	driver_a: string;
	driver_b: string;
	delta: number[];
	samples: number[];
}

interface LapDeltaChartProps {
	data: DeltaData;
}

export default function LapDeltaChart({ data }: LapDeltaChartProps) {
	return (
		<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 mt-8">
			<div className="flex justify-between items-center mb-6">
				<h3 className="text-2xl font-bold">Lap Delta Analysis</h3>

				<span className="text-zinc-400">
					{data.driver_a} vs {data.driver_b}
				</span>
			</div>

			<Plot
				data={[
					{
						x: data.samples,
						y: data.delta,
						type: "scatter",
						mode: "lines",
						fill: "tozeroy",
						name: "Delta",
					},
				]}
				layout={{
					height: 500,
					paper_bgcolor: "rgb(24,24,27)",
					plot_bgcolor: "rgb(24,24,27)",
					font: {
						color: "white",
					},
					title: "Speed Difference Across Lap",
					margin: {
						l: 60,
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
	);
}
