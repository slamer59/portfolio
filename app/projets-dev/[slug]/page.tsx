import { ProjectHeader } from "@/components/DevBlog/ProjectHeader";
import { PortableComponentsDefinitions as components } from "@/components/PortableComponentsDefinitions";
import { urlFor } from "@/sanity/lib/client";
import { getDevProjectBySlug } from "@/sanity/queries/devProjects";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { revalidatePage } from "portfolio.config";
import type { Metadata, ResolvingMetadata } from "next";

export const revalidate = revalidatePage;

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const resolvedParams = await params;
	const data = await getDevProjectBySlug(resolvedParams.slug);

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

	return (
		<div className="container mt-8">
			<ProjectHeader
				title={data.title}
				category={data.type || "Projet"}
				readTime="5 min"
				image={
					data.mainImage
						? urlFor(data.mainImage.asset)
								.width(1200)
								.height(400)
								.format("webp")
								.url()
						: undefined
				}
				date={data.publishedAt || ""}
			/>

			<article className="w-full max-w-6xl mx-auto mb-8">
				{/* Project Links */}
				{(data.github || data.link) && (
					<div className="flex gap-4 mb-8 justify-center">
						{data.github && (
							<Link
								href={data.github}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-6 py-3 bg-dark dark:bg-light text-light dark:text-dark rounded-lg hover:opacity-80 transition-opacity font-medium"
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
								className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-light rounded-lg hover:opacity-80 transition-opacity font-medium"
							>
								<ExternalLink className="w-5 h-5" />
								Voir le projet
							</Link>
						)}
					</div>
				)}

				{/* Technologies */}
				{data.technologies && data.technologies.length > 0 && (
					<div className="mb-8 text-center">
						<h3 className="text-lg font-semibold mb-3 text-dark dark:text-light">
							Technologies utilisées
						</h3>
						<div className="flex flex-wrap gap-2 justify-center">
							{data.technologies.map((tech) => (
								<span
									key={tech}
									className="px-4 py-2 bg-light dark:bg-dark border border-dark/20 dark:border-light/20 rounded-lg text-sm font-medium text-dark dark:text-light"
								>
									{tech}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Main Image */}
				{data.mainImage && (
					<Image
						src={urlFor(data.mainImage.asset)
							.width(1200)
							.height(400)
							.format("webp")
							.url()}
						width={1200}
						height={400}
						alt={data.mainImage.alt || "Image du projet"}
						priority
						className="w-full max-w-6xl mx-auto border rounded-lg sm:mt-2"
						placeholder="blur"
						blurDataURL={data.mainImage.lqip}
					/>
				)}

				{/* Project Description */}
				{data.description && (
					<div className="mt-8 prose prose-lg prose-blue dark:prose-invert prose-li:marker:text-primary dark:text-light prose-a:text-primary max-w-none">
						<PortableText components={components} value={data.description} />
					</div>
				)}
			</article>
		</div>
	);
}
