"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTechnologyClassName } from "@/lib/technologyColors";
import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface DevProjectSearchFiltersProps {
	onSearch: (query: string) => void;
	onFilterChange: (filters: string[]) => void;
	totalProjects: number;
	filteredProjects: number;
	allTechnologies?: string[];
	initialFilters?: string[];
}

export function DevProjectSearchFilters({
	onSearch,
	onFilterChange,
	totalProjects,
	filteredProjects,
	allTechnologies = [],
	initialFilters = [],
}: DevProjectSearchFiltersProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>(initialFilters);
	const [isFilterOpen, setIsFilterOpen] = useState(initialFilters.length > 0);

	// Extract unique technologies and sort them
	const availableFilters = useMemo(() => {
		const uniqueTechs = Array.from(new Set(allTechnologies)).sort();
		return uniqueTechs;
	}, [allTechnologies]);

	// Sync with initialFilters when they change
	useEffect(() => {
		if (initialFilters.length > 0) {
			setActiveFilters(initialFilters);
			setIsFilterOpen(true);
		}
	}, [initialFilters]);

	const handleSearchChange = (query: string) => {
		setSearchQuery(query);
		onSearch(query);
	};

	const handleFilterToggle = (filter: string) => {
		const newFilters = activeFilters.includes(filter)
			? activeFilters.filter((f) => f !== filter)
			: [...activeFilters, filter];

		setActiveFilters(newFilters);
		onFilterChange(newFilters);
	};

	const clearFilters = () => {
		setActiveFilters([]);
		setSearchQuery("");
		onSearch("");
		onFilterChange([]);
	};

	return (
		<div className="space-y-6">
			{/* Search Bar */}
			<div className="relative max-w-2xl mx-auto">
				<div className="relative">
					<Search className="absolute w-5 h-5 transform -translate-y-1/2 left-4 top-1/2 text-dark/40 dark:text-white/40" />
					<input
						type="text"
						placeholder="Rechercher des projets..."
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="w-full py-3 sm:py-4 pl-10 sm:pl-12 pr-4 transition-all duration-300 border shadow-sm bg-dark/5 dark:bg-white/10 backdrop-blur-lg border-dark/10 dark:border-white/30 rounded-2xl focus:border-primary/50 dark:focus:border-primaryDark/50 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primaryDark/20 text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/50"
					/>
				</div>
			</div>

			{/* Filter Toggle & Results Count */}
			<div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						className="flex items-center gap-2 shadow-sm bg-dark/5 dark:bg-white/10 backdrop-blur-lg border-dark/10 dark:border-white/30 hover:border-dark/20 dark:hover:border-primaryDark/50 text-dark dark:text-white"
					>
						<Filter className="w-4 h-4" />
						<span>Filtres</span>
						{activeFilters.length > 0 && (
							<Badge
								variant="secondary"
								className="ml-1 bg-primary/20 text-primary dark:bg-primaryDark/20 dark:text-primaryDark"
							>
								{activeFilters.length}
							</Badge>
						)}
					</Button>

					{(activeFilters.length > 0 || searchQuery) && (
						<Button
							variant="ghost"
							onClick={clearFilters}
							className="flex items-center gap-2 text-dark/60 dark:text-white/70 hover:text-dark dark:hover:text-primaryDark hover:bg-dark/5 dark:hover:bg-primaryDark/10"
						>
							<X className="w-4 h-4" />
							<span>Tout effacer</span>
						</Button>
					)}
				</div>

				<div className="text-xs sm:text-sm font-medium text-dark/70 dark:text-white/70">
					<span className="font-semibold text-primary dark:text-primaryDark">
						{filteredProjects}
					</span>{" "}
					sur {totalProjects} projets
				</div>
			</div>

			{/* Active Filters */}
			{activeFilters.length > 0 && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					className="flex flex-wrap gap-1.5 sm:gap-2"
				>
					{activeFilters.map((filter) => (
						<button
							key={filter}
							type="button"
							className={`flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs sm:px-3 border rounded-full transition-all hover:scale-105 hover:shadow-md cursor-pointer ${getTechnologyClassName(filter)}`}
							onClick={() => handleFilterToggle(filter)}
						>
							<span>{filter}</span>
							<X className="w-3 h-3" />
						</button>
					))}
				</motion.div>
			)}

			{/* Filter Options */}
			{isFilterOpen && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					className="p-4 sm:p-5 md:p-6 border shadow-sm bg-dark/5 dark:bg-white/5 backdrop-blur-lg border-dark/10 dark:border-white/10 rounded-2xl"
				>
					<h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
						Filtrer par technologie
					</h3>
					<div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
						{availableFilters.map((filter) => (
							<button
								key={filter}
								type="button"
								className={`px-2.5 py-1 text-[10px] sm:text-xs sm:px-3 border rounded-full transition-all hover:scale-105 hover:shadow-md cursor-pointer ${
									activeFilters.includes(filter)
										? getTechnologyClassName(filter)
										: "bg-white dark:bg-white/10 text-dark dark:text-white border-dark/20 dark:border-white/30 hover:border-primary/50 dark:hover:border-primaryDark/50"
								}`}
								onClick={() => handleFilterToggle(filter)}
							>
								{filter}
							</button>
						))}
					</div>
				</motion.div>
			)}
		</div>
	);
}
