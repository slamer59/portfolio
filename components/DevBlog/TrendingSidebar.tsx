"use client";

import { Badge } from "@/components/ui/badge";
import type { DevProject } from "@/lib/devProject";
import { urlFor } from "@/sanity/lib/client";
import { motion } from "framer-motion";
import { Clock, Eye, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TrendingSidebarProps {
	projects: DevProject[];
	className?: string;
	onFilterChange?: (filters: string[]) => void;
	activeFilters?: string[];
}

// Get top projects by view count
const getTrendingProjects = (projects: DevProject[]) => {
	// Sort by views (descending) and take top 5
	const sorted = [...projects]
		.sort((a, b) => (b.views || 0) - (a.views || 0))
		.slice(0, 5);

	return sorted.map((project, index) => ({
		...project,
		trending: index < 3, // Top 3 are marked as trending
	}));
};

const getPopularTechnologies = () => [
	{ name: "React", count: 12, growth: "+15%" },
	{ name: "Next.js", count: 8, growth: "+12%" },
	{ name: "TypeScript", count: 15, growth: "+8%" },
	{ name: "Node.js", count: 6, growth: "+5%" },
	{ name: "Python", count: 10, growth: "+18%" },
];

export function TrendingSidebar({
	projects,
	className = "",
	onFilterChange,
	activeFilters = [],
}: TrendingSidebarProps) {
	const trendingProjects = getTrendingProjects(projects);
	const popularTechnologies = getPopularTechnologies();

	const handleTechnologyClick = (technologyName: string) => {
		if (!onFilterChange) return;

		const isActive = activeFilters.includes(technologyName);
		if (isActive) {
			// Remove filter if already active
			onFilterChange(
				activeFilters.filter((filter) => filter !== technologyName),
			);
		} else {
			// Add filter if not active
			onFilterChange([...activeFilters, technologyName]);
		}
	};

	return (
		<div className={`space-y-8 ${className}`}>
			{/* Trending Projects */}
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				className="p-6 bg-dark/5 dark:bg-white/5 backdrop-blur-lg border border-dark/10 dark:border-white/10 rounded-2xl shadow-sm"
			>
				<div className="flex items-center gap-2 mb-6">
					<TrendingUp className="w-5 h-5 text-primary" />
					<h3 className="text-lg font-semibold text-foreground">Tendances</h3>
				</div>

				<div className="space-y-4">
					{trendingProjects.map((project, index) => (
						<Link key={project.slug} href={`/articles/${project.slug}`}>
							<motion.div
								className="flex gap-3 p-3 rounded-lg hover:bg-dark/5 dark:hover:bg-white/5 transition-colors group cursor-pointer"
								whileHover={{ x: 5 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								<div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
									{project.mainImage ? (
										<Image
											src={urlFor(project.mainImage)
												.width(128)
												.height(128)
												.format("webp")
												.url()}
											alt={project.title}
											fill
											className="object-cover"
											sizes="64px"
										/>
									) : (
										<div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
											{project.title.substring(0, 2).toUpperCase()}
										</div>
									)}
								</div>

								<div className="flex-1 min-w-0 space-y-1">
									<div className="flex items-center gap-2">
										<span className="text-xs font-bold text-primary">
											#{index + 1}
										</span>
										{project.trending && (
											<Badge
												variant="secondary"
												className="text-xs bg-secondary/20 text-secondary"
											>
												<TrendingUp className="w-3 h-3 mr-1" />
												Hot
											</Badge>
										)}
									</div>

									<h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
										{project.title}
									</h4>

									<div className="flex items-center gap-3 text-xs text-muted-foreground">
										{project.views !== undefined && project.views > 0 && (
											<>
												<div className="flex items-center gap-1">
													<Eye className="w-3 h-3" />
													<span>{project.views.toLocaleString()}</span>
												</div>
												<span>•</span>
											</>
										)}
										<div className="flex items-center gap-1">
											<Clock className="w-3 h-3" />
											<span>
												{new Date(project.date).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
												})}
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						</Link>
					))}
				</div>
			</motion.div>

			{/* Popular Technologies */}
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1 }}
				className="p-6 bg-dark/5 dark:bg-white/5 backdrop-blur-lg border border-dark/10 dark:border-white/10 rounded-2xl shadow-sm"
			>
				<div className="flex items-center gap-2 mb-6">
					<Star className="w-5 h-5 text-primary" />
					<h3 className="text-lg font-semibold text-foreground">
						Technologies Populaires
					</h3>
				</div>

				<div className="space-y-3">
					{popularTechnologies.map((technology) => {
						const isActive = activeFilters.includes(technology.name);
						return (
							<motion.div
								key={technology.name}
								className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer group ${
									isActive
										? "bg-primary/20 border border-primary/30"
										: "hover:bg-dark/5 dark:hover:bg-white/5"
								}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
								onClick={() => handleTechnologyClick(technology.name)}
							>
								<div className="flex items-center gap-3">
									<div
										className={`w-2 h-2 rounded-full transition-colors ${
											isActive ? "bg-primary" : "bg-primary/60"
										}`}
									/>
									<span
										className={`text-sm font-medium transition-colors ${
											isActive
												? "text-primary font-semibold"
												: "text-foreground group-hover:text-primary"
										}`}
									>
										{technology.name}
									</span>
									<Badge
										variant="outline"
										className={`text-xs transition-colors ${
											isActive
												? "bg-primary/10 border-primary/30 text-primary"
												: "bg-white/5 border-white/20"
										}`}
									>
										{technology.count}
									</Badge>
								</div>

								<div className="text-xs text-success font-medium">
									{technology.growth}
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
}
