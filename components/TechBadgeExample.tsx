"use client";

import { TechBadge } from "./TechBadge";
import { TechStack } from "./TechStack";

/**
 * Example component showcasing TechBadge and TechStack usage
 * This demonstrates all variants and features
 */
export function TechBadgeExample() {
	const exampleTechnologies = [
		"React",
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"Sanity CMS",
		"PostgreSQL",
		"Docker",
		"Vercel",
		"Framer Motion",
		"Node.js",
		"GraphQL",
		"Prisma",
	];

	const projectTechnologies = [
		"React",
		"Next.js",
		"TypeScript",
		"Sanity CMS",
		"Tailwind CSS",
	];

	return (
		<div className="container p-8 mx-auto space-y-12">
			{/* Header */}
			<div className="space-y-2">
				<h1 className="text-4xl font-bold text-dark dark:text-light">
					Technology Badge System
				</h1>
				<p className="text-dark/80 dark:text-light/80">
					Beautiful, categorized technology badges with icons
				</p>
			</div>

			{/* Individual Badge Variants */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-dark dark:text-light">
					Individual Badges
				</h2>

				<div className="space-y-4">
					<div className="space-y-2">
						<h3 className="text-sm font-medium text-dark/80 dark:text-light/80">
							Default Size
						</h3>
						<div className="flex flex-wrap gap-3">
							<TechBadge technology="React" />
							<TechBadge technology="TypeScript" />
							<TechBadge technology="Next.js" />
							<TechBadge technology="Sanity CMS" />
							<TechBadge technology="Docker" />
						</div>
					</div>

					<div className="space-y-2">
						<h3 className="text-sm font-medium text-dark/80 dark:text-light/80">
							Compact Size
						</h3>
						<div className="flex flex-wrap gap-2">
							<TechBadge technology="React" variant="compact" />
							<TechBadge technology="TypeScript" variant="compact" />
							<TechBadge technology="Next.js" variant="compact" />
							<TechBadge technology="Sanity CMS" variant="compact" />
							<TechBadge technology="Docker" variant="compact" />
						</div>
					</div>

					<div className="space-y-2">
						<h3 className="text-sm font-medium text-dark/80 dark:text-light/80">
							Minimal Size
						</h3>
						<div className="flex flex-wrap gap-2">
							<TechBadge technology="React" variant="minimal" />
							<TechBadge technology="TypeScript" variant="minimal" />
							<TechBadge technology="Next.js" variant="minimal" />
							<TechBadge technology="Sanity CMS" variant="minimal" />
							<TechBadge technology="Docker" variant="minimal" />
						</div>
					</div>

					<div className="space-y-2">
						<h3 className="text-sm font-medium text-dark/80 dark:text-light/80">
							Without Icons
						</h3>
						<div className="flex flex-wrap gap-2">
							<TechBadge technology="React" showIcon={false} />
							<TechBadge technology="TypeScript" showIcon={false} />
							<TechBadge technology="Next.js" showIcon={false} />
							<TechBadge technology="Sanity CMS" showIcon={false} />
							<TechBadge technology="Docker" showIcon={false} />
						</div>
					</div>
				</div>
			</section>

			{/* Tech Stack - Full */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Tech Stack - Full Display
				</h2>
				<TechStack technologies={exampleTechnologies} />
			</section>

			{/* Tech Stack - With Limit */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Tech Stack - Limited (Top 5)
				</h2>
				<TechStack technologies={exampleTechnologies} limit={5} />
			</section>

			{/* Tech Stack - Compact */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Tech Stack - Compact Variant
				</h2>
				<TechStack
					technologies={projectTechnologies}
					variant="compact"
					badgeVariant="compact"
				/>
			</section>

			{/* Tech Stack - Grouped */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Tech Stack - Grouped by Category
				</h2>
				<TechStack technologies={exampleTechnologies} grouped />
			</section>

			{/* Tech Stack - Minimal Without Icons */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Tech Stack - Minimal (No Icons)
				</h2>
				<TechStack
					technologies={projectTechnologies}
					variant="minimal"
					badgeVariant="minimal"
					showIcons={false}
				/>
			</section>

			{/* Category Examples */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Technology Categories
				</h2>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<h3 className="text-sm font-medium text-muted-foreground">
							Frameworks (Blue-Gray)
						</h3>
						<div className="flex flex-wrap gap-2">
							<TechBadge technology="React" />
							<TechBadge technology="Next.js" />
							<TechBadge technology="Vue" />
							<TechBadge technology="Express" />
						</div>
					</div>

					<div className="space-y-2">
						<h3 className="text-sm font-medium text-muted-foreground">
							Languages (Amber)
						</h3>
						<div className="flex flex-wrap gap-2">
							<TechBadge technology="TypeScript" />
							<TechBadge technology="Python" />
							<TechBadge technology="Go" />
							<TechBadge technology="Rust" />
						</div>
					</div>

					<div className="space-y-2">
						<h3 className="text-sm font-medium text-muted-foreground">
							CMS & Databases (Teal)
						</h3>
						<div className="flex flex-wrap gap-2">
							<TechBadge technology="Sanity CMS" />
							<TechBadge technology="PostgreSQL" />
							<TechBadge technology="MongoDB" />
							<TechBadge technology="GraphQL" />
						</div>
					</div>

					<div className="space-y-2">
						<h3 className="text-sm font-medium text-muted-foreground">
							Tools & Services (Gray)
						</h3>
						<div className="flex flex-wrap gap-2">
							<TechBadge technology="Docker" />
							<TechBadge technology="Vercel" />
							<TechBadge technology="GitHub" />
							<TechBadge technology="Tailwind CSS" />
						</div>
					</div>
				</div>
			</section>

			{/* Usage Examples */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Common Use Cases
				</h2>

				<div className="space-y-6">
					{/* Project Card Example */}
					<div className="p-6 space-y-3 border rounded-lg border-border bg-card">
						<h3 className="text-lg font-semibold">E-Commerce Platform</h3>
						<p className="text-sm text-muted-foreground dark:text-white">
							A modern e-commerce platform built with the latest technologies
						</p>
						<TechStack
							technologies={[
								"Next.js",
								"TypeScript",
								"Tailwind CSS",
								"Sanity CMS",
								"Stripe",
								"Vercel",
							]}
							limit={4}
							badgeVariant="compact"
						/>
					</div>

					{/* Article Meta Example */}
					<div className="p-6 space-y-3 border rounded-lg border-border bg-card">
						<h3 className="text-lg font-semibold">
							Building Scalable APIs with Node.js
						</h3>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<span>5 min read</span>
							<span>•</span>
							<TechStack
								technologies={["Node.js", "Express", "PostgreSQL", "Docker"]}
								variant="minimal"
								badgeVariant="minimal"
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
