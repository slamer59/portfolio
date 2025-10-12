"use client";

import { Badge } from "@/components/ui/badge";
import type { DevProject } from "@/lib/devProject";
import { getTechnologyClassName } from "@/lib/technologyColors";
import { urlFor } from "@/sanity/lib/client";
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
	// Use Sanity urlFor() if image exists and has a valid asset
	if (project.image?.asset) {
		try {
			return urlFor(project.image.asset)
				.width(800)
				.height(600)
				.format("webp")
				.url();
		} catch (error) {
			console.error("Error generating image URL:", error);
		}
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
		featured: "h-full md:h-[500px]",
		compact: "h-[300px]",
	};

	const imageVariants = {
		regular: "h-48",
		featured: "h-64 md:h-80",
		compact: "h-32",
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
							<div className="w-full h-full bg-primary/20 flex items-center justify-center">
								<span className="text-6xl font-bold text-primary">
									{project.title.substring(0, 2).toUpperCase()}
								</span>
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
									className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
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
									className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
								>
									<ExternalLink className="w-4 h-4 text-white" />
								</button>
							)}
						</div>
					</div>

					{/* Content Section */}
					<div className="p-6 space-y-4">
						{/* Meta Information */}
						<div className="flex items-center justify-between flex-wrap gap-2 text-sm text-muted-foreground">
							<div className="flex items-center gap-4">
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
									<Badge
										key={tech}
										variant="secondary"
										className={`text-xs font-semibold px-2 py-1 rounded-full border ${getTechnologyClassName(tech)}`}
									>
										{tech}
									</Badge>
								))}
							</div>
						</div>

						{/* Title */}
						<h3
							className={`font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight ${
								variant === "featured"
									? "text-2xl"
									: variant === "compact"
										? "text-lg"
										: "text-xl"
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
								{project.author.image && (
									<div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary/10">
										<Image
											src={project.author.image}
											alt={project.author.name}
											fill
											className="object-cover"
										/>
									</div>
								)}
								<div className="flex-1 min-w-0">
									<span className="text-sm font-medium text-foreground truncate block">
										{project.author.name}
									</span>
									{project.author.position && (
										<span className="text-xs text-muted-foreground truncate block">
											{project.author.position}
										</span>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
