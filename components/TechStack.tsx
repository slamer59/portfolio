"use client";

import { cn } from "@/lib/utils";
import { groupTechnologiesByCategory } from "@/lib/technologyColors";
import { TechBadge } from "./TechBadge";
import { motion } from "framer-motion";
import { useState } from "react";

export interface TechStackProps {
	/**
	 * Array of technology names
	 */
	technologies: string[];

	/**
	 * Layout variant
	 * @default "full"
	 */
	variant?: "full" | "compact" | "minimal";

	/**
	 * Maximum number of badges to show initially
	 * Remaining badges will be hidden behind a "+X more" button
	 */
	limit?: number;

	/**
	 * Show technologies grouped by category
	 * @default false
	 */
	grouped?: boolean;

	/**
	 * Additional CSS classes
	 */
	className?: string;

	/**
	 * Badge size (passed to TechBadge)
	 * @default "default"
	 */
	badgeVariant?: "default" | "compact" | "minimal";

	/**
	 * Show icons on badges
	 * @default true
	 */
	showIcons?: boolean;

	/**
	 * Enable stagger animation
	 * @default true
	 */
	animated?: boolean;
}

/**
 * Technology stack display component
 * Intelligently displays multiple technology badges with optional grouping and limits
 */
export function TechStack({
	technologies,
	variant = "full",
	limit,
	grouped = false,
	className,
	badgeVariant = "default",
	showIcons = true,
	animated = true,
}: TechStackProps) {
	const [showAll, setShowAll] = useState(false);

	if (!technologies || technologies.length === 0) {
		return null;
	}

	// Determine how many to show
	const displayLimit = limit && !showAll ? limit : technologies.length;
	const hasMore = limit && technologies.length > limit;
	const remainingCount = technologies.length - displayLimit;

	// Variant-specific styles
	const containerStyles = {
		full: "gap-2",
		compact: "gap-1.5",
		minimal: "gap-1",
	};

	// Render ungrouped stack
	if (!grouped) {
		return (
			<div
				className={cn(
					"flex flex-wrap items-center",
					containerStyles[variant],
					className,
				)}
			>
				{technologies.slice(0, displayLimit).map((tech, index) => (
					<motion.div
						key={tech}
						initial={animated ? { opacity: 0, y: 10 } : false}
						animate={animated ? { opacity: 1, y: 0 } : false}
						transition={animated ? { duration: 0.3, delay: index * 0.05 } : {}}
					>
						<TechBadge
							technology={tech}
							variant={badgeVariant}
							showIcon={showIcons}
							animated={false} // Handle animation at parent level
						/>
					</motion.div>
				))}

				{hasMore && !showAll && (
					<motion.button
						type="button"
						onClick={() => setShowAll(true)}
						className={cn(
							"inline-flex items-center rounded-full border transition-all duration-200",
							"bg-gray-100 text-gray-700 border-gray-300",
							"dark:bg-gray-800/80 dark:text-gray-300 dark:border-gray-600",
							"hover:bg-gray-200 dark:hover:bg-gray-700",
							"hover:scale-105",
							badgeVariant === "default" && "px-3 py-1.5 text-xs font-semibold",
							badgeVariant === "compact" && "px-2 py-1 text-[10px] font-medium",
							badgeVariant === "minimal" &&
								"px-2 py-0.5 text-[10px] font-medium",
						)}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1.05 }}
					>
						+{remainingCount} more
					</motion.button>
				)}

				{showAll && hasMore && (
					<motion.button
						type="button"
						onClick={() => setShowAll(false)}
						className={cn(
							"inline-flex items-center rounded-full border transition-all duration-200",
							"bg-gray-100 text-gray-700 border-gray-300",
							"dark:bg-gray-800/80 dark:text-gray-300 dark:border-gray-600",
							"hover:bg-gray-200 dark:hover:bg-gray-700",
							"hover:scale-105",
							badgeVariant === "default" && "px-3 py-1.5 text-xs font-semibold",
							badgeVariant === "compact" && "px-2 py-1 text-[10px] font-medium",
							badgeVariant === "minimal" &&
								"px-2 py-0.5 text-[10px] font-medium",
						)}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1.05 }}
					>
						Show less
					</motion.button>
				)}
			</div>
		);
	}

	// Render grouped stack
	const groupedTechs = groupTechnologiesByCategory(technologies);
	const categoryLabels = {
		framework: "Frameworks",
		"cms-database": "CMS & Databases",
		language: "Languages",
		"tool-service": "Tools & Services",
	};

	return (
		<div className={cn("space-y-4", className)}>
			{Object.entries(groupedTechs).map(([category, techs]) => {
				if (techs.length === 0) return null;

				return (
					<div key={category} className="space-y-2">
						<h4 className="text-sm font-semibold text-foreground/70 dark:text-foreground/60">
							{categoryLabels[category as keyof typeof categoryLabels]}
						</h4>
						<div
							className={cn(
								"flex flex-wrap items-center",
								containerStyles[variant],
							)}
						>
							{techs.map((tech, index) => (
								<motion.div
									key={tech}
									initial={animated ? { opacity: 0, y: 10 } : false}
									animate={animated ? { opacity: 1, y: 0 } : false}
									transition={
										animated ? { duration: 0.3, delay: index * 0.05 } : {}
									}
								>
									<TechBadge
										technology={tech}
										variant={badgeVariant}
										showIcon={showIcons}
										animated={false}
									/>
								</motion.div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

/**
 * Simplified tech stack for static contexts (no animations)
 */
export function StaticTechStack(props: TechStackProps) {
	return <TechStack {...props} animated={false} />;
}
