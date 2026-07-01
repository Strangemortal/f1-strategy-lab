"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface RaceSearchProps {
	onSelectRace: (year: number, grandPrix: string) => void;
	currentYear: number;
	currentGrandPrix: string;
}

// Popular F1 races for quick suggestions
const POPULAR_RACES = [
	{ name: "Bahrain", emoji: "🇧🇭", country: "Bahrain" },
	{ name: "Saudi Arabian", emoji: "🇸🇦", country: "Saudi Arabia" },
	{ name: "Australian", emoji: "🇦🇺", country: "Australia" },
	{ name: "Japanese", emoji: "🇯🇵", country: "Japan" },
	{ name: "Chinese", emoji: "🇨🇳", country: "China" },
	{ name: "Miami", emoji: "🇺🇸", country: "USA" },
	{ name: "Emilia Romagna", emoji: "🇮🇹", country: "Italy" },
	{ name: "Monaco", emoji: "🇲🇨", country: "Monaco" },
	{ name: "Canadian", emoji: "🇨🇦", country: "Canada" },
	{ name: "Spanish", emoji: "🇪🇸", country: "Spain" },
	{ name: "Austrian", emoji: "🇦🇹", country: "Austria" },
	{ name: "British", emoji: "🇬🇧", country: "United Kingdom" },
	{ name: "Hungarian", emoji: "🇭🇺", country: "Hungary" },
	{ name: "Belgian", emoji: "🇧🇪", country: "Belgium" },
	{ name: "Dutch", emoji: "🇳🇱", country: "Netherlands" },
	{ name: "Italian", emoji: "🇮🇹", country: "Italy" },
	{ name: "Azerbaijan", emoji: "🇦🇿", country: "Azerbaijan" },
	{ name: "Singapore", emoji: "🇸🇬", country: "Singapore" },
	{ name: "United States", emoji: "🇺🇸", country: "USA" },
	{ name: "Mexico City", emoji: "🇲🇽", country: "Mexico" },
	{ name: "São Paulo", emoji: "🇧🇷", country: "Brazil" },
	{ name: "Las Vegas", emoji: "🇺🇸", country: "USA" },
	{ name: "Abu Dhabi", emoji: "🇦🇪", country: "UAE" },
];

const AVAILABLE_YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

interface RecentSearch {
	year: number;
	grandPrix: string;
	timestamp: number;
}

export default function RaceSearch({
	onSelectRace,
	currentYear,
	currentGrandPrix,
}: RaceSearchProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedYear, setSelectedYear] = useState(currentYear);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
	const [isAnimatingOut, setIsAnimatingOut] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	// Load recent searches from localStorage
	useEffect(() => {
		try {
			const stored = localStorage.getItem("f1-recent-searches");
			if (stored) {
				setRecentSearches(JSON.parse(stored));
			}
		} catch {
			// ignore
		}
	}, []);

	const saveRecentSearch = (year: number, grandPrix: string) => {
		const newSearch: RecentSearch = { year, grandPrix, timestamp: Date.now() };
		const updated = [
			newSearch,
			...recentSearches.filter(
				(s) => !(s.year === year && s.grandPrix === grandPrix),
			),
		].slice(0, 5);
		setRecentSearches(updated);
		try {
			localStorage.setItem("f1-recent-searches", JSON.stringify(updated));
		} catch {
			// ignore
		}
	};

	const filteredRaces = POPULAR_RACES.filter(
		(race) =>
			race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			race.country.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const handleSelect = useCallback(
		(raceName: string) => {
			onSelectRace(selectedYear, raceName);
			saveRecentSearch(selectedYear, raceName);
			closeModal();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[selectedYear, onSelectRace],
	);

	const closeModal = () => {
		setIsAnimatingOut(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsAnimatingOut(false);
			setSearchQuery("");
			setHighlightedIndex(-1);
		}, 200);
	};

	const openModal = () => {
		setIsOpen(true);
		setTimeout(() => inputRef.current?.focus(), 50);
	};

	// Keyboard shortcut: Ctrl+K / Cmd+K to open search
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				if (isOpen) {
					closeModal();
				} else {
					openModal();
				}
			}
			if (e.key === "Escape" && isOpen) {
				closeModal();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	// Keyboard navigation in list
	const handleInputKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlightedIndex((prev) =>
				prev < filteredRaces.length - 1 ? prev + 1 : 0,
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlightedIndex((prev) =>
				prev > 0 ? prev - 1 : filteredRaces.length - 1,
			);
		} else if (e.key === "Enter" && highlightedIndex >= 0) {
			e.preventDefault();
			handleSelect(filteredRaces[highlightedIndex].name);
		}
	};

	// Scroll highlighted item into view
	useEffect(() => {
		if (highlightedIndex >= 0 && listRef.current) {
			const items = listRef.current.querySelectorAll("[data-race-item]");
			items[highlightedIndex]?.scrollIntoView({ block: "nearest" });
		}
	}, [highlightedIndex]);

	// Click outside to close
	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				closeModal();
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	return (
		<>
			{/* Search Trigger Button */}
			<button
				id="race-search-trigger"
				onClick={openModal}
				className="group relative flex items-center gap-3 px-5 py-3 rounded-xl
					bg-gradient-to-r from-zinc-900 to-zinc-800
					border border-zinc-700/50 hover:border-red-500/50
					transition-all duration-300 ease-out
					hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]
					cursor-pointer w-full md:w-auto"
			>
				{/* Animated search icon */}
				<div className="relative">
					<svg
						className="w-5 h-5 text-zinc-400 group-hover:text-red-400 transition-colors duration-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<div className="absolute inset-0 bg-red-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
				</div>

				<span className="text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 text-sm">
					Search races...
				</span>

				{/* Keyboard shortcut badge */}
				<div className="hidden md:flex items-center gap-1 ml-auto pl-4">
					<kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-500 bg-zinc-800 border border-zinc-700 rounded">
						Ctrl
					</kbd>
					<kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-500 bg-zinc-800 border border-zinc-700 rounded">
						K
					</kbd>
				</div>

				{/* Glow effect on hover */}
				<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
			</button>

			{/* Search Modal Overlay */}
			{isOpen && (
				<div
					className={`fixed inset-0 z-50 flex items-start justify-center pt-[10vh]
						${isAnimatingOut ? "animate-fade-out" : "animate-fade-in"}`}
				>
					{/* Backdrop */}
					<div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

					{/* Modal */}
					<div
						ref={modalRef}
						className={`relative w-full max-w-2xl mx-4
							bg-gradient-to-b from-zinc-900 to-zinc-950
							border border-zinc-700/50 rounded-2xl shadow-2xl
							shadow-black/50 overflow-hidden
							${isAnimatingOut ? "animate-slide-down" : "animate-slide-up"}`}
					>
						{/* Top glow accent */}
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

						{/* Search Input Area */}
						<div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800">
							<svg
								className="w-5 h-5 text-red-400 shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>

							<input
								ref={inputRef}
								id="race-search-input"
								type="text"
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setHighlightedIndex(-1);
								}}
								onKeyDown={handleInputKeyDown}
								placeholder="Search Grand Prix races..."
								className="flex-1 bg-transparent text-white text-lg placeholder-zinc-500 outline-none"
							/>

							<button
								onClick={closeModal}
								className="px-2 py-1 text-xs text-zinc-500 bg-zinc-800 border border-zinc-700 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
							>
								ESC
							</button>
						</div>

						{/* Year Selector Pills */}
						<div className="px-5 py-3 border-b border-zinc-800/50">
							<div className="flex items-center gap-2 overflow-x-auto pb-1">
								<span className="text-xs text-zinc-500 uppercase tracking-wider shrink-0 font-semibold">
									Season
								</span>
								{AVAILABLE_YEARS.map((year) => (
									<button
										key={year}
										onClick={() => setSelectedYear(year)}
										className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 shrink-0 cursor-pointer
											${
												selectedYear === year
													? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
													: "text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent"
											}`}
									>
										{year}
									</button>
								))}
							</div>
						</div>

						{/* Results Area */}
						<div
							ref={listRef}
							className="max-h-[50vh] overflow-y-auto"
							style={{ scrollbarWidth: "thin", scrollbarColor: "#3f3f46 transparent" }}
						>
							{/* Recent Searches */}
							{!searchQuery && recentSearches.length > 0 && (
								<div className="px-5 pt-3 pb-1">
									<p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
										<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										Recent Searches
									</p>
									{recentSearches.map((search) => {
										const raceInfo = POPULAR_RACES.find(
											(r) => r.name === search.grandPrix,
										);
										return (
											<button
												key={`${search.year}-${search.grandPrix}`}
												onClick={() => {
													setSelectedYear(search.year);
													handleSelect(search.grandPrix);
												}}
												className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
													hover:bg-zinc-800/70 transition-all duration-150 group/item cursor-pointer"
											>
												<span className="text-lg">{raceInfo?.emoji || "🏁"}</span>
												<div className="flex-1 text-left">
													<span className="text-sm text-zinc-300 group-hover/item:text-white transition-colors">
														{search.grandPrix} Grand Prix
													</span>
													<span className="text-xs text-zinc-600 ml-2">
														{search.year}
													</span>
												</div>
												<svg className="w-4 h-4 text-zinc-600 group-hover/item:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
												</svg>
											</button>
										);
									})}
								</div>
							)}

							{/* Divider between recent and all races */}
							{!searchQuery && recentSearches.length > 0 && (
								<div className="mx-5 my-1 border-t border-zinc-800/50" />
							)}

							{/* Race List */}
							<div className="px-5 pt-3 pb-4">
								<p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
									<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
									</svg>
									{searchQuery ? "Search Results" : "All Grand Prix Races"}
								</p>

								{filteredRaces.length === 0 && (
									<div className="flex flex-col items-center justify-center py-10 text-zinc-500">
										<svg className="w-12 h-12 mb-3 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<p className="text-sm">No races found for &quot;{searchQuery}&quot;</p>
										<p className="text-xs text-zinc-600 mt-1">Try a different search term</p>
									</div>
								)}

								{filteredRaces.map((race, index) => {
									const isActive =
										race.name === currentGrandPrix &&
										selectedYear === currentYear;
									return (
										<button
											key={race.name}
											data-race-item
											onClick={() => handleSelect(race.name)}
											className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
												transition-all duration-150 group/item cursor-pointer
												${
													highlightedIndex === index
														? "bg-red-500/10 border border-red-500/20"
														: isActive
															? "bg-zinc-800/50 border border-zinc-700/50"
															: "hover:bg-zinc-800/70 border border-transparent"
												}`}
										>
											<span className="text-lg">{race.emoji}</span>

											<div className="flex-1 text-left">
												<span
													className={`text-sm transition-colors ${
														highlightedIndex === index
															? "text-red-300"
															: "text-zinc-300 group-hover/item:text-white"
													}`}
												>
													{race.name} Grand Prix
												</span>
												<span className="text-xs text-zinc-600 ml-2">
													{race.country}
												</span>
											</div>

											{isActive && (
												<span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
													Active
												</span>
											)}

											<svg
												className={`w-4 h-4 transition-colors ${
													highlightedIndex === index
														? "text-red-400"
														: "text-zinc-600 group-hover/item:text-zinc-400"
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</button>
									);
								})}
							</div>
						</div>

						{/* Footer */}
						<div className="flex items-center justify-between px-5 py-3 border-t border-zinc-800/50 bg-zinc-950/50">
							<div className="flex items-center gap-4 text-xs text-zinc-600">
								<span className="flex items-center gap-1">
									<kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px]">↑↓</kbd>
									Navigate
								</span>
								<span className="flex items-center gap-1">
									<kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px]">↵</kbd>
									Select
								</span>
								<span className="flex items-center gap-1">
									<kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px]">Esc</kbd>
									Close
								</span>
							</div>
							<span className="text-xs text-zinc-600">
								{filteredRaces.length} race{filteredRaces.length !== 1 ? "s" : ""}
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
