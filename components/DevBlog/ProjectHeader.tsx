"use client";

import Image from "next/image";

interface ProjectHeaderProps {
	title: string;
	category?: string;
	readTime?: string;
	image?: string;
	author?: string;
	date: string;
}

export function ProjectHeader({
	title,
	category = "Projet Dev",
	readTime = "5 min de lecture",
	image = "/api/placeholder/1200/400",
	author,
	date,
}: ProjectHeaderProps) {
	return (
		<div className="relative w-full h-[30vh] min-h-[300px] mb-8">
			{/* Hero Image */}
			<div className="absolute inset-0 w-full h-full opacity-50">
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover"
					priority
					sizes="100vw"
				/>
			</div>

			{/* Bottom-centered content overlay */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-3xl px-4">
				<div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
					{/* Category and read time */}
					<div className="flex items-center justify-center gap-x-4 text-sm text-gray-600 dark:text-gray-400">
						<span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
							{category}
						</span>
						<span>•</span>
						<span>{readTime}</span>
					</div>

					{/* Title */}
					<h1 className="mt-4 text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white">
						{title}
					</h1>

					{/* Author and date */}
					{author && (
						<div className="mt-6 flex items-center justify-center gap-x-3 text-sm text-gray-600 dark:text-gray-400">
							<span>Par {author}</span>
							<span>•</span>
							<time>
								{new Date(date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>
						</div>
					)}

					{/* If no author, just show date */}
					{!author && (
						<div className="mt-6 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
							<time>
								{new Date(date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>
						</div>
					)}
				</div>
			</div>

			{/* Spacer for overlay */}
			<div className="h-16 sm:h-20" />
		</div>
	);
}

export default ProjectHeader;
