import { ViewTracker } from "@/components/DevBlog/ViewTracker";
import { PortableComponentsDefinitions as components } from "@/components/PortableComponentsDefinitions";
import { splitContentAtIntro } from "@/lib/contentUtils";
import { getTechnologyClassName } from "@/lib/technologyColors";
import { urlFor } from "@/sanity/lib/client";
import {
	getDevProjectBySlug,
	getDevProjectsSitemap,
} from "@/sanity/queries/devProjects";
import { PortableText } from "@portabletext/react";
import { ExternalLink, Eye, Github } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePage } from "portfolio.config";

export const revalidate = revalidatePage;

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
	const projects = await getDevProjectsSitemap();
	return projects.map((project) => ({
		slug: project.currentSlug,
	}));
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const resolvedParams = await params;
	const data = await getDevProjectBySlug(resolvedParams.slug);

	if (!data) {
		notFound();
	}

	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: data.title,
		description: data.summary,
		openGraph: {
			title: data.title,
			description: data.summary,
			type: "website",
			images: [
				...(data.mainImage
					? [
							{
								url: urlFor(data.mainImage.asset)
									.width(800)
									.height(600)
									.format("webp")
									.url(),
								width: 800,
								height: 600,
								alt: `Image du projet ${data.title}`,
							},
						]
					: []),
				...previousImages,
			],
		},
	};
}

export default async function DevProjectPage({ params }: Props) {
	const resolvedParams = await params;
	const data = await getDevProjectBySlug(resolvedParams.slug);

	if (!data) {
		notFound();
	}

	// Split content into intro and rest
	const { intro: introBlocks, rest: restBlocks } = splitContentAtIntro(
		data.description || [],
	);

	return (
		<>
			<ViewTracker slug={resolvedParams.slug} />
			<article className="max-w-3xl px-6 py-12 mx-auto">
				{/* Simple Hero */}
				<header className="mb-12">
					<h1 className="mb-4 text-5xl font-bold text-dark dark:text-light">
						{data.title}
					</h1>
					<div className="flex gap-4 mb-6 text-sm opacity-70 text-dark dark:text-light">
						{data.publishedAt && (
							<>
								<time>
									{new Date(data.publishedAt).toLocaleDateString("fr-FR", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
								<span>•</span>
							</>
						)}
						<span>{data.type || "Projet"}</span>
						{data.views !== undefined && data.views > 0 && (
							<>
								<span>•</span>
								<div className="flex items-center gap-1">
									<Eye className="w-4 h-4" />
									<span>{data.views.toLocaleString()} vues</span>
								</div>
							</>
						)}
					</div>

					{/* Technologies */}
					{data.technologies && data.technologies.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{data.technologies.map((tech) => (
								<Link
									key={tech}
									href={`/articles?tech=${encodeURIComponent(tech)}`}
									className={`px-3 py-1 text-xs border rounded-full transition-all hover:scale-105 hover:shadow-md ${getTechnologyClassName(tech)}`}
									title={`Voir tous les projets avec ${tech}`}
								>
									{tech}
								</Link>
							))}
						</div>
					)}
				</header>

				{/* Content with automatic link insertion */}
				<div className="prose prose-xl dark:prose-invert max-w-none">
					{/* Intro Content */}
					{introBlocks.length > 0 && (
						<PortableText components={components} value={introBlocks} />
					)}

					{/* Project Info Card - Image + Links */}
					{(data.mainImage || data.github || data.link) && (
						<aside className="my-12 overflow-hidden border rounded-xl border-dark/10 dark:border-light/20 bg-dark/5 dark:bg-light/5">
							{/* Image at top */}
							{data.mainImage && (
								<Image
									src={urlFor(data.mainImage.asset)
										.width(1200)
										.height(600)
										.format("webp")
										.url()}
									width={1200}
									height={600}
									alt={data.mainImage.alt || "Image du projet"}
									className="w-full"
									placeholder="blur"
									blurDataURL={data.mainImage.lqip}
									priority
								/>
							)}

							{/* Links below image */}
							{(data.github || data.link) && (
								<div className="p-6">
									<div className="flex flex-row items-center justify-center gap-4 sm:flex-row">
										{data.github && (
											<Link
												href={data.github}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-opacity rounded-lg bg-dark dark:bg-light text-light dark:text-dark hover:opacity-90"
											>
												<Github className="w-5 h-5" />
												Voir sur GitHub
											</Link>
										)}
										{data.link && (
											<Link
												href={data.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-opacity rounded-lg bg-primary text-light hover:opacity-90"
											>
												<ExternalLink className="w-5 h-5" />
												Voir le projet
											</Link>
										)}
									</div>
								</div>
							)}
						</aside>
					)}

					{/* Rest of Content */}
					{restBlocks.length > 0 && (
						<PortableText components={components} value={restBlocks} />
					)}
				</div>
			</article>
		</>
	);
}
