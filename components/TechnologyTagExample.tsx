/**
 * Example component showing how technology tags are colored
 * This is just for reference - not used in production
 */

import { getTechnologyClassName } from "@/lib/technologyColors";

const exampleTechnologies = [
	// Frameworks (Primary - Wine Red)
	"Next.js",
	"React",
	"Vue",

	// CMS/Databases (Secondary - Teal Blue)
	"Sanity CMS",
	"MongoDB",
	"PostgreSQL",

	// Languages (Accent - Amber Brown)
	"TypeScript",
	"JavaScript",
	"Python",

	// Tools/Services (Neutral)
	"Vercel",
	"Tailwind CSS",
	"Docker",
];

export function TechnologyTagExample() {
	return (
		<div className="p-8 space-y-6">
			<h2 className="text-2xl font-bold text-dark dark:text-light">
				Technology Tag Colors
			</h2>

			<div className="space-y-4">
				<div>
					<h3 className="mb-2 text-sm font-semibold text-dark/70 dark:text-light/70">
						Frameworks (Primary - Wine Red)
					</h3>
					<div className="flex flex-wrap gap-2">
						{["Next.js", "React", "Vue"].map((tech) => (
							<span
								key={tech}
								className={`px-3 py-1 text-xs border rounded-full ${getTechnologyClassName(tech)}`}
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				<div>
					<h3 className="mb-2 text-sm font-semibold text-dark/70 dark:text-light/70">
						CMS/Databases (Secondary - Teal Blue)
					</h3>
					<div className="flex flex-wrap gap-2">
						{["Sanity CMS", "MongoDB", "PostgreSQL"].map((tech) => (
							<span
								key={tech}
								className={`px-3 py-1 text-xs border rounded-full ${getTechnologyClassName(tech)}`}
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				<div>
					<h3 className="mb-2 text-sm font-semibold text-dark/70 dark:text-light/70">
						Languages (Accent - Amber Brown)
					</h3>
					<div className="flex flex-wrap gap-2">
						{["TypeScript", "JavaScript", "Python"].map((tech) => (
							<span
								key={tech}
								className={`px-3 py-1 text-xs border rounded-full ${getTechnologyClassName(tech)}`}
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				<div>
					<h3 className="mb-2 text-sm font-semibold text-dark/70 dark:text-light/70">
						Tools/Services (Neutral)
					</h3>
					<div className="flex flex-wrap gap-2">
						{["Vercel", "Tailwind CSS", "Docker"].map((tech) => (
							<span
								key={tech}
								className={`px-3 py-1 text-xs border rounded-full ${getTechnologyClassName(tech)}`}
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className="p-4 mt-6 rounded-lg bg-dark/5 dark:bg-light/5">
				<p className="text-sm text-dark dark:text-light">
					<strong>Note:</strong> The system automatically categorizes each
					technology and assigns the appropriate color. The order of tags from
					your data is preserved. All 3 color variants work in both light and
					dark modes.
				</p>
			</div>
		</div>
	);
}
