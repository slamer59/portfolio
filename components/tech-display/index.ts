/**
 * Technology Display Components
 * Beautiful, categorized technology badges and stacks
 */

export { TechBadge, StaticTechBadge } from "../TechBadge";
export type { TechBadgeProps } from "../TechBadge";

export { TechStack, StaticTechStack } from "../TechStack";
export type { TechStackProps } from "../TechStack";

// Re-export utilities for convenience
export {
	getTechnologyCategory,
	getTechnologyColorConfig,
	getTechnologyClassName,
	getCategoryLabel,
	groupTechnologiesByCategory,
} from "../../lib/technologyColors";
export type {
	TechnologyCategory,
	TechnologyColorConfig,
} from "../../lib/technologyColors";

export {
	getTechnologyIcon,
	hasTechnologyIcon,
	TECHNOLOGY_ICONS,
} from "../../lib/technologyIcons";
export type { TechnologyIconMap } from "../../lib/technologyIcons";
