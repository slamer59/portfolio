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
					<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark/40 dark:text-muted-foreground" />
					<input
						type="text"
						placeholder="Rechercher des projets..."
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="w-full pl-12 pr-4 py-4 bg-dark/5 dark:bg-white/5 backdrop-blur-lg border border-dark/10 dark:border-white/10 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-dark dark:text-foreground placeholder:text-dark/40 dark:placeholder:text-muted-foreground shadow-sm"
					/>
				</div>
			</div>

			{/* Filter Toggle & Results Count */}
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						className="flex items-center gap-2 bg-dark/5 dark:bg-white/5 backdrop-blur-lg border-dark/10 dark:border-white/10 hover:border-dark/20 dark:hover:border-white/20 shadow-sm"
					>
						<Filter className="w-4 h-4" />
						<span>Filtres</span>
						{activeFilters.length > 0 && (
							<Badge
								variant="secondary"
								className="ml-1 bg-primary/20 text-primary"
							>
								{activeFilters.length}
							</Badge>
						)}
					</Button>

					{(activeFilters.length > 0 || searchQuery) && (
						<Button
							variant="ghost"
							onClick={clearFilters}
							className="flex items-center gap-2 text-dark/60 dark:text-muted-foreground hover:text-dark dark:hover:text-foreground"
						>
							<X className="w-4 h-4" />
							<span>Tout effacer</span>
						</Button>
					)}
				</div>

				<div className="text-sm font-medium text-dark/70 dark:text-muted-foreground">
					<span className="text-primary font-semibold">{filteredProjects}</span>{" "}
					sur {totalProjects} projets
				</div>
			</div>

			{/* Active Filters */}
			{activeFilters.length > 0 && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					className="flex flex-wrap gap-2"
				>
					{activeFilters.map((filter) => (
						<button
							key={filter}
							type="button"
							className={`flex items-center gap-1 px-3 py-1 text-xs border rounded-full transition-all hover:scale-105 hover:shadow-md cursor-pointer ${getTechnologyClassName(filter)}`}
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
					className="p-6 bg-dark/5 dark:bg-white/5 backdrop-blur-lg border border-dark/10 dark:border-white/10 rounded-2xl shadow-sm"
				>
					<h3 className="text-lg font-semibold mb-4 text-dark dark:text-foreground">
						Filtrer par technologie
					</h3>
					<div className="flex flex-wrap gap-3">
						{availableFilters.map((filter) => (
							<button
								key={filter}
								type="button"
								className={`px-3 py-1 text-xs border rounded-full transition-all hover:scale-105 hover:shadow-md cursor-pointer ${
									activeFilters.includes(filter)
										? getTechnologyClassName(filter)
										: "bg-white dark:bg-dark/50 text-dark dark:text-light border-dark/20 dark:border-light/20 hover:border-primary/50"
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
