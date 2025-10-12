"use client";

import { DevProjectCard } from "@/components/DevBlog/DevProjectCard";
import { DevProjectSearchFilters } from "@/components/DevBlog/DevProjectSearchFilters";
import { TrendingSidebar } from "@/components/DevBlog/TrendingSidebar";
import type { DevProject } from "@/lib/devProject";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface DevProjectsClientProps {
	projects: DevProject[];
	searchParams?: { page?: string; tech?: string };
}

export function DevProjectsClient({
	projects,
	searchParams,
}: DevProjectsClientProps) {
	const [searchQuery, setSearchQuery] = useState("");
	// Initialize activeFilters with tech param from URL if present
	const [activeFilters, setActiveFilters] = useState<string[]>(() => {
		if (searchParams?.tech) {
			return [decodeURIComponent(searchParams.tech)];
		}
		return [];
	});

	// Filter projects based on search and filters
	const filteredProjects = useMemo(() => {
		let filtered = projects;

		// Search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(project) =>
					project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					project.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
					project.keywords?.some((kw) =>
						kw.toLowerCase().includes(searchQuery.toLowerCase()),
					) ||
					project.technologies?.some((tech) =>
						tech.toLowerCase().includes(searchQuery.toLowerCase()),
					),
			);
		}

		// Technology filters
		if (activeFilters.length > 0) {
			filtered = filtered.filter((project) => {
				const keywords = project.keywords?.join(" ") || "";
				const techs = project.technologies?.join(" ") || "";
				return activeFilters.some(
					(filter) =>
						keywords.toLowerCase().includes(filter.toLowerCase()) ||
						techs.toLowerCase().includes(filter.toLowerCase()) ||
						project.title.toLowerCase().includes(filter.toLowerCase()),
				);
			});
		}

		return filtered;
	}, [projects, searchQuery, activeFilters]);

	const featuredProjects = filteredProjects.filter(
		(project) => project.featured,
	);
	const regularProjects = filteredProjects.filter(
		(project) => !project.featured,
	);

	// Extract all unique technologies from all projects
	const allTechnologies = useMemo(() => {
		const techs = new Set<string>();
		projects.forEach((project) => {
			project.technologies?.forEach((tech) => techs.add(tech));
		});
		return Array.from(techs);
	}, [projects]);

	// Pagination
	const currentPage = Number(searchParams?.page) || 1;
	const projectsPerPage = 9;
	const totalPages = Math.ceil(regularProjects.length / projectsPerPage);
	const paginatedProjects = regularProjects.slice(
		(currentPage - 1) * projectsPerPage,
		currentPage * projectsPerPage,
	);

	return (
		<div className="min-h-screen dark:bg-dark">
			{/* Hero Section */}
			<h2 className="container px-4 mb-6 text-5xl font-bold text-center md:text-6xl lg:text-7xl text-dark dark:text-light">
				Projets de Développement
			</h2>

			<div className="container px-4 py-16 mx-auto">
				{/* Search and Filters */}
				<div className="mb-16">
					<DevProjectSearchFilters
						onSearch={setSearchQuery}
						onFilterChange={setActiveFilters}
						totalProjects={projects.length}
						filteredProjects={filteredProjects.length}
						allTechnologies={allTechnologies}
						initialFilters={activeFilters}
					/>
				</div>

				{/* Main Content Area */}
				<div className="grid grid-cols-1 gap-12 min-lg:grid-cols-4">
					{/* Main Projects */}
					<div className="min-lg:col-span-3">
						{/* Featured Projects */}
						{featuredProjects.length > 0 && (
							<section className="mb-16">
								<h2 className="flex items-center gap-3 mb-8 text-3xl font-bold md:text-4xl text-dark dark:text-light">
									<span>Projets Mis en Avant</span>
									<div className="flex-1 h-1 rounded-full bg-gradient-to-r from-primary/50 to-transparent" />
								</h2>

								{/* Magazine-style asymmetric grid */}
								<div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-6">
									{featuredProjects.map((project, index) => {
										if (index === 0) {
											// Hero featured project
											return (
												<div
													key={project.slug}
													className="md:col-span-4 md:row-span-2"
												>
													<DevProjectCard
														project={project}
														variant="featured"
														priority={true}
														index={index}
													/>
												</div>
											);
										}
										if (index === 1) {
											// Secondary featured
											return (
												<div key={project.slug} className="md:col-span-2">
													<DevProjectCard
														project={project}
														variant="regular"
														index={index}
													/>
												</div>
											);
										}
										if (index === 2) {
											// Third featured
											return (
												<div key={project.slug} className="md:col-span-2">
													<DevProjectCard
														project={project}
														variant="regular"
														index={index}
													/>
												</div>
											);
										}
										// Additional featured projects in regular grid
										return (
											<div key={project.slug} className="md:col-span-2">
												<DevProjectCard
													project={project}
													variant="compact"
													index={index}
												/>
											</div>
										);
									})}
								</div>
							</section>
						)}

						{/* Latest Projects */}
						{regularProjects.length > 0 && (
							<section>
								<h2 className="flex items-center gap-3 mb-8 text-3xl font-bold md:text-4xl text-dark dark:text-light">
									<span>Derniers Projets</span>
									<div className="flex-1 h-1 rounded-full bg-gradient-to-r from-primary/50 to-transparent" />
								</h2>

								<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
									{paginatedProjects.map((project, index) => (
										<DevProjectCard
											key={project.slug}
											project={project}
											variant="regular"
											index={index}
										/>
									))}
								</div>

								{/* Enhanced Pagination */}
								{totalPages > 1 && (
									<div className="flex items-center justify-center gap-4 mt-16">
										<Link
											href={`/articles?page=${Math.max(currentPage - 1, 1)}`}
											className={`px-4 py-2 text-sm font-medium bg-light dark:bg-dark/50 backdrop-blur-lg border border-dark/10 dark:border-light/10 rounded-lg hover:border-primary/50 transition-all ${
												currentPage === 1
													? "pointer-events-none opacity-50"
													: ""
											}`}
										>
											<ArrowLeftIcon className="w-4 h-4" />
										</Link>

										<div className="flex gap-2">
											{Array.from(
												{ length: Math.min(5, totalPages) },
												(_, i) => {
													let page: number;
													if (totalPages <= 5) {
														page = i + 1;
													} else if (currentPage <= 3) {
														page = i + 1;
													} else if (currentPage >= totalPages - 2) {
														page = totalPages - 4 + i;
													} else {
														page = currentPage - 2 + i;
													}

													return (
														<Link
															key={page}
															href={`/articles?page=${page}`}
															className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
																currentPage === page
																	? "bg-primary text-light"
																	: "bg-light dark:bg-dark/50 backdrop-blur-lg border border-dark/10 dark:border-light/10 hover:border-primary/50 text-dark dark:text-light"
															}`}
														>
															{page}
														</Link>
													);
												},
											)}
										</div>

										<Link
											href={`/articles?page=${Math.min(currentPage + 1, totalPages)}`}
											className={`px-4 py-2 text-sm font-medium bg-light dark:bg-dark/50 backdrop-blur-lg border border-dark/10 dark:border-light/10 rounded-lg hover:border-primary/50 transition-all ${
												currentPage === totalPages
													? "pointer-events-none opacity-50"
													: ""
											}`}
										>
											<ArrowRightIcon className="w-4 h-4" />
										</Link>
									</div>
								)}
							</section>
						)}

						{/* No Results State */}
						{filteredProjects.length === 0 && (
							<div className="py-16 text-center">
								<div className="max-w-md mx-auto">
									<div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-light dark:bg-dark/50">
										<span className="text-4xl">💻</span>
									</div>
									<h3 className="mb-2 text-xl font-semibold text-dark dark:text-light">
										Aucun projet trouvé
									</h3>
									<p className="text-dark/70 dark:text-light/70">
										Essayez d'ajuster vos critères de recherche ou d'effacer les
										filtres.
									</p>
								</div>
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div className="min-lg:col-span-1">
						<div className="sticky top-8">
							<TrendingSidebar
								projects={projects}
								onFilterChange={setActiveFilters}
								activeFilters={activeFilters}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
