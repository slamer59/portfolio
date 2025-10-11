"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { useState } from "react";

interface DevProjectSearchFiltersProps {
	onSearch: (query: string) => void;
	onFilterChange: (filters: string[]) => void;
	totalProjects: number;
	filteredProjects: number;
}

const availableFilters = [
	"React",
	"Next.js",
	"TypeScript",
	"Node.js",
	"Python",
	"Vue",
	"Angular",
	"Full Stack",
	"Frontend",
	"Backend",
	"Mobile",
	"DevOps",
];

export function DevProjectSearchFilters({
	onSearch,
	onFilterChange,
	totalProjects,
	filteredProjects,
}: DevProjectSearchFiltersProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

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
					<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
					<input
						type="text"
						placeholder="Rechercher des projets..."
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
					/>
				</div>
			</div>

			{/* Filter Toggle & Results Count */}
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						className="flex items-center gap-2 bg-white/5 backdrop-blur-lg border-white/10 hover:border-white/20"
					>
						<Filter className="w-4 h-4" />
						<span>Filtres</span>
						{activeFilters.length > 0 && (
							<Badge variant="secondary" className="ml-1">
								{activeFilters.length}
							</Badge>
						)}
					</Button>

					{(activeFilters.length > 0 || searchQuery) && (
						<Button
							variant="ghost"
							onClick={clearFilters}
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
						>
							<X className="w-4 h-4" />
							<span>Tout effacer</span>
						</Button>
					)}
				</div>

				<div className="text-sm text-muted-foreground">
					{filteredProjects} sur {totalProjects} projets
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
						<Badge
							key={filter}
							variant="secondary"
							className="flex items-center gap-1 bg-primary/20 text-primary border-primary/30 cursor-pointer hover:bg-primary/30 transition-colors"
							onClick={() => handleFilterToggle(filter)}
						>
							<span>{filter}</span>
							<X className="w-3 h-3" />
						</Badge>
					))}
				</motion.div>
			)}

			{/* Filter Options */}
			{isFilterOpen && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl"
				>
					<h3 className="text-lg font-semibold mb-4 text-foreground">
						Filtrer par technologie
					</h3>
					<div className="flex flex-wrap gap-3">
						{availableFilters.map((filter) => (
							<Badge
								key={filter}
								variant={activeFilters.includes(filter) ? "default" : "outline"}
								className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
									activeFilters.includes(filter)
										? "bg-primary text-primary-foreground border-primary"
										: "bg-white/5 text-foreground border-white/20 hover:border-primary/50"
								}`}
								onClick={() => handleFilterToggle(filter)}
							>
								{filter}
							</Badge>
						))}
					</div>
				</motion.div>
			)}
		</div>
	);
}
