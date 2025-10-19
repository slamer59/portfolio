"use client";

import { TechBadge } from "./TechBadge";

interface TechBadgeWrapperProps {
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
}

/**
 * TechBadgeWrapper component for MDX articles
 *
 * Usage in MDX:
 * 1. Basic usage: <TechBadge technology="React" />
 * 2. Compact variant: <TechBadge technology="TypeScript" variant="compact" />
 * 3. Minimal variant: <TechBadge technology="Next.js" variant="minimal" />
 * 4. Without icon: <TechBadge technology="Tailwind CSS" showIcon={false} />
 * 5. Multiple badges: <TechBadge technology="React" /> <TechBadge technology="TypeScript" /> <TechBadge technology="Node.js" />
 *
 * Available variants:
 * - "default": Standard size with icon (px-3 py-1.5)
 * - "compact": Smaller size (px-2 py-1)
 * - "minimal": Minimal size (px-2 py-0.5)
 *
 * The component automatically:
 * - Categorizes the technology by type (frontend, backend, database, etc.)
 * - Applies appropriate color coding based on the category
 * - Shows the technology icon if available
 * - Adds hover effects and animations
 */
export function TechBadgeWrapper({
	technology,
	variant = "default",
	showIcon = true,
}: TechBadgeWrapperProps) {
	// Don't render if no technology is provided
	if (!technology) {
		return null;
	}

	return (
		<span className="inline-flex items-center">
			<TechBadge
				technology={technology}
				variant={variant}
				showIcon={showIcon}
				animated={false} // Disable animation in MDX context for better compatibility
			/>
		</span>
	);
}
