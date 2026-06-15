"use client";

interface DriverSelectorProps {
	label: string;
	value: string;
	drivers: string[];
	onChange: (value: string) => void;
}

export default function DriverSelector({
	label,
	value,
	drivers,
	onChange,
}: DriverSelectorProps) {
	return (
		<div>
			<label className="block mb-2 text-zinc-400">{label}</label>

			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
			>
				{drivers.map((driver) => (
					<option key={driver} value={driver}>
						{driver}
					</option>
				))}
			</select>
		</div>
	);
}
