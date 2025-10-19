"use client";

import { StaticTechBadge } from "@/components/TechBadge";
import type { DevProject } from "@/lib/devProjects";
import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DevProjectCardProps {
	project: DevProject;
	variant?: "featured" | "regular" | "compact";
	priority?: boolean;
	index?: number;
}

// Function to calculate reading time based on description length
function calculateReadingTime(description: string): number {
	const wordsPerMinute = 200;
	const words = description.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute) || 1;
}

// Function to extract technologies from project
function extractTechnologies(project: DevProject): string[] {
	if (project.technologies && project.technologies.length > 0) {
		return project.technologies.slice(0, 3);
	}
	if (project.keywords && project.keywords.length > 0) {
		return project.keywords.slice(0, 3);
	}
	return ["Projet Dev"];
}

// Function to get project image
function getProjectImage(project: DevProject): string | null {
	// Use local image path directly
	if (project.image) {
		return project.image;
	}
	// Return null if no valid image
	return null;
}

export function DevProjectCard({
	project,
	variant = "regular",
	priority = false,
	index = 0,
}: DevProjectCardProps) {
	const readingTime = calculateReadingTime(project.summary);
	const technologies = extractTechnologies(project);
	const projectImage = getProjectImage(project);

	const cardVariants = {
		regular: "h-full",
		featured: "h-full",
		compact: "h-[300px]",
	};

	const imageVariants = {
		regular: "h-32 sm:h-40 md:h-48",
		featured: "h-40 sm:h-48 md:h-64 lg:h-80",
		compact: "h-24 sm:h-28 md:h-32",
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			whileHover={{ y: -5 }}
			className="group"
		>
			<Link href={`/articles/${project.slug}`} className="block h-full">
				<div
					className={`${cardVariants[variant]} overflow-hidden rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10`}
				>
					{/* Image Section */}
					<div
						className={`relative ${imageVariants[variant]} w-full overflow-hidden`}
					>
						{projectImage ? (
							<>
								<Image
									src={projectImage}
									alt={project.title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
									priority={priority}
									sizes={
										variant === "featured"
											? "(min-width: 768px) 50vw, 100vw"
											: "(min-width: 768px) 33vw, 100vw"
									}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</>
						) : (
							<div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 dark:from-primary/30 dark:via-primary/20 dark:to-primary/10 flex items-center justify-center">
								<div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/20 dark:bg-primary/30 border-4 border-primary/30 dark:border-primary/40 flex items-center justify-center backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:scale-110">
									<span className="text-4xl sm:text-5xl font-bold text-dark dark:text-light tracking-wider">
										{project.title.substring(0, 2).toUpperCase()}
									</span>
								</div>
							</div>
						)}

						{/* Project Links Overlay */}
						<div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							{project.github && (
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										window.open(
											project.github,
											"_blank",
											"noopener,noreferrer",
										);
									}}
									className="p-3 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
								>
									<Github className="w-4 h-4 text-white" />
								</button>
							)}
							{project.link && (
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										window.open(project.link, "_blank", "noopener,noreferrer");
									}}
									className="p-3 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
								>
									<ExternalLink className="w-4 h-4 text-white" />
								</button>
							)}
						</div>
					</div>

					{/* Content Section */}
					<div className="p-4 sm:p-5 md:p-6 space-y-4">
						{/* Meta Information */}
						<div className="flex items-center justify-between flex-wrap gap-2 text-sm text-muted-foreground">
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
								<div className="flex items-center gap-1">
									<Calendar className="w-4 h-4" />
									<span>
										{new Date(project.date).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</span>
								</div>
								<div className="flex items-center gap-1">
									<Clock className="w-4 h-4" />
									<span>{readingTime} min de lecture</span>
								</div>
							</div>

							{/* Technologies on the right */}
							<div className="flex flex-wrap gap-2">
								{technologies.slice(0, 2).map((tech) => (
									<StaticTechBadge
										key={tech}
										technology={tech}
										variant="compact"
										showIcon={true}
									/>
								))}
							</div>
						</div>

						{/* Title */}
						<h3
							className={`font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight ${
								variant === "featured"
									? "text-xl sm:text-2xl"
									: variant === "compact"
										? "text-lg sm:text-lg"
										: "text-lg sm:text-xl"
							}`}
						>
							{project.title}
						</h3>

						{/* Description */}
						<p
							className={`text-muted-foreground leading-relaxed ${
								variant === "compact" ? "text-sm line-clamp-2" : "line-clamp-3"
							}`}
						>
							{project.summary}
						</p>

						{/* Author Section (if available) */}
						{project.author && (
							<div className="flex items-center gap-3 pt-2">
								<div className="flex-1 min-w-0">
									<span className="text-sm font-medium text-foreground truncate block">
										{project.author}
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
