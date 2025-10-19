"use client";

import { cn } from "@/lib/utils";
import {
	getTechnologyClassName,
	getTechnologyCategory,
} from "@/lib/technologyColors";
import { getTechnologyIcon } from "@/lib/technologyIcons";
import { motion } from "framer-motion";

export interface TechBadgeProps {
	/**
	 * Technology name (e.g., "React", "TypeScript", "Next.js")
	 */
	technology: string;

	/**
	 * Badge variant
	 * @default "default"
	 */
	variant?: "default" | "compact" | "minimal";

	/**
	 * Show icon
	 * @default true
	 */
	showIcon?: boolean;

	/**
	 * Additional CSS classes
	 */
	className?: string;

	/**
	 * Enable hover animation
	 * @default true
	 */
	animated?: boolean;
}

/**
 * Technology badge component with icon and smart color coding
 * Automatically categorizes technologies and applies appropriate styling
 */
export function TechBadge({
	technology,
	variant = "default",
	showIcon = true,
	className,
	animated = true,
}: TechBadgeProps) {
	const Icon = getTechnologyIcon(technology);
	const colorClassName = getTechnologyClassName(technology);
	const category = getTechnologyCategory(technology);

	// Variant-specific styles
	const variantStyles = {
		default: "px-3 py-1.5 text-xs font-semibold gap-1.5",
		compact: "px-2 py-1 text-[10px] font-medium gap-1",
		minimal: "px-2 py-0.5 text-[10px] font-medium gap-1",
	};

	const iconSizes = {
		default: "w-3.5 h-3.5",
		compact: "w-3 h-3",
		minimal: "w-2.5 h-2.5",
	};

	const BadgeContent = (
		<span
			className={cn(
				// Base styles
				"inline-flex items-center rounded-full border transition-all duration-200",
				// Category-based colors
				colorClassName,
				// Variant-specific sizing
				variantStyles[variant],
				// Hover effects
				"hover:shadow-md hover:scale-105",
				// Custom className
				className,
			)}
			title={`${technology} (${category})`}
		>
			{showIcon && <Icon className={cn("shrink-0", iconSizes[variant])} />}
			<span className="truncate">{technology}</span>
		</span>
	);

	// Wrap with motion if animated
	if (animated) {
		return (
			<motion.span
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.05 }}
				transition={{ duration: 0.2 }}
			>
				{BadgeContent}
			</motion.span>
		);
	}

	return BadgeContent;
}

/**
 * Simplified tech badge without animation (for static contexts)
 */
export function StaticTechBadge(props: TechBadgeProps) {
	return <TechBadge {...props} animated={false} />;
}
