import { AuthorProfile } from "@/components/AuthorProfile";
import { PortableComponentsDefinitions as components } from "@/components/PortableComponentsDefinitions";
import { RepoLink } from "@/components/RepoLink";
import { urlFor } from "@/sanity/lib/client";
import {
	getDevProjectBySlug,
	getDevProjectsSitemap,
} from "@/sanity/queries/devProjects";
import { PortableText } from "@portabletext/react";
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
	const articles = await getDevProjectsSitemap();
	return articles.map((article) => ({
		slug: article.currentSlug,
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
		description: data.summary || data.title,
		openGraph: {
			title: data.title,
			description: data.summary || data.title,
			type: "website",
			images: [
				...(data.mainImage
					? [
							{
								url: urlFor(data.mainImage)
									.width(800)
									.height(600)
									.format("webp")
									.url(),
								width: 800,
								height: 600,
								alt: `Image de l'article ${data.title}`,
							},
						]
					: []),
				...previousImages,
			],
		},
	};
}

export default async function ArticlePage({ params }: Props) {
	const resolvedParams = await params;
	const data = await getDevProjectBySlug(resolvedParams.slug);

	if (!data) {
		notFound();
	}

	return (
		<article className="max-w-4xl px-6 py-12 mx-auto">
			{/* Article Header with Author Profile */}
			<header className="mb-8">
				{/* Author Profile */}
				{data.author && data.author.image && data.publishedAt && (
					<AuthorProfile
						name={data.author.name}
						title={data.author.postion}
						date={new Date(data.publishedAt).toLocaleDateString("fr-FR", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
						imageSrc={urlFor(data.author.image)
							.size(2 * 64, 2 * 64)
							.format("webp")
							.url()}
						imageAlt={data.author.name}
					/>
				)}

				{/* Title */}
				<h1 className="mb-6 text-4xl font-bold leading-tight text-dark dark:text-light lg:text-5xl">
					{data.title}
				</h1>

				{/* Metadata: Tags and Views */}
				<div className="flex flex-wrap items-center gap-4 mb-6">
					{/* Technologies/Tags */}
					{data.technologies && data.technologies.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{data.technologies.map((tech) => (
								<Link
									key={tech}
									href={`/articles?tech=${encodeURIComponent(tech)}`}
									className="px-3 py-1 text-sm font-medium transition-colors rounded-full bg-primary/10 text-primary dark:bg-light/20 dark:text-light hover:bg-primary/20 dark:hover:bg-light/30"
								>
									{tech}
								</Link>
							))}
						</div>
					)}

					{/* View Count */}
					{data.views !== undefined && data.views > 0 && (
						<span className="flex items-center gap-1 text-sm text-dark/60 dark:text-light/60">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							{data.views} {data.views === 1 ? "vue" : "vues"}
						</span>
					)}
				</div>
			</header>

			{/* Main Image */}
			{data.mainImage && (
				<Image
					src={urlFor(data.mainImage)
						.width(1200)
						.height(400)
						.format("webp")
						.url()}
					width={1200}
					height={400}
					alt="Title Image"
					priority
					className="w-full mx-auto mb-8 border rounded-lg"
					placeholder="blur"
					blurDataURL={data.mainImageMeta?.lqip}
				/>
			)}

			{/* Article Content */}
			<div className="mt-8 prose prose-lg dark:prose-invert max-w-none prose-li:marker:text-primary prose-a:text-primary">
				<PortableText components={components} value={data.description} />
			</div>
		</article>
	);
}
