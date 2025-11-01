import Breadcrumb from "@/components/Breadcrumb";
import { InlineCode, Pre } from "@/components/CodeBlock";
import { TechBadgeWrapper } from "@/components/TechBadgeWrapper";
import { ViewRepository } from "@/components/ViewRepository";
import { getDevProjectBySlug, getDevProjectsSitemap } from "@/lib/devProjects";
import type { Metadata, ResolvingMetadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import remarkGfm from "remark-gfm";

export const revalidate = 30;

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
	const articles = getDevProjectsSitemap();
	return articles.map((article) => ({
		slug: article.slug,
	}));
}

// Custom components for MDX
// Note: H1 is omitted because the page already has an H1 from the article title
// MDX content should start with H2 for proper heading hierarchy
const components = {
	h2: (props: ComponentProps<"h2">) => (
		<h2
			className="mb-3 mt-6 text-3xl font-semibold text-dark dark:text-light"
			{...props}
		/>
	),
	h3: (props: ComponentProps<"h3">) => (
		<h3
			className="mb-2 mt-4 text-2xl font-medium text-dark dark:text-light"
			{...props}
		/>
	),
	h4: (props: ComponentProps<"h4">) => (
		<h4
			className="mb-2 mt-3 text-xl font-medium text-dark/80 dark:text-light/80"
			{...props}
		/>
	),
	p: (props: ComponentProps<"p">) => (
		<p
			className="mb-4 text-lg leading-relaxed text-dark/80 dark:text-light/80"
			{...props}
		/>
	),
	ul: (props: ComponentProps<"ul">) => (
		<ul
			className="mb-4 list-inside list-disc space-y-2 text-dark/80 dark:text-light/80"
			{...props}
		/>
	),
	ol: (props: ComponentProps<"ol">) => (
		<ol
			className="mb-4 list-inside list-decimal space-y-2 text-dark/80 dark:text-light/80"
			{...props}
		/>
	),
	li: (props: ComponentProps<"li">) => (
		<li className="text-lg leading-relaxed" {...props} />
	),
	blockquote: (props: ComponentProps<"blockquote">) => (
		<blockquote
			className="my-4 border-l-4 border-primary pl-4 italic text-dark/70 dark:text-light/70"
			{...props}
		/>
	),
	a: (props: ComponentProps<"a"> & { href?: string }) => {
		const href = props.href;

		// Handle external links
		if (href?.startsWith("http")) {
			return (
				<a
					href={props.href}
					className="text-primary dark:text-primaryDark underline transition-colors hover:text-primary/80 dark:hover:text-primaryDark/80"
					target="_blank"
					rel="noopener noreferrer"
					{...props}
				>
					{props.children}
				</a>
			);
		}

		const { href: _, ...rest } = props;
		return (
			<Link
				href={href || "#"}
				className="text-primary dark:text-primaryDark underline transition-colors hover:text-primary/80 dark:hover:text-primaryDark/80"
				{...rest}
			>
				{props.children}
			</Link>
		);
	},
	code: InlineCode,
	pre: Pre,
	img: (props: ComponentProps<"img"> & { src: string; alt?: string }) => {
		let cleanSrc = props.src;

		// Remove /public prefix if present
		if (cleanSrc.startsWith("/public")) {
			cleanSrc = cleanSrc.replace("/public", "");
		}

		// Ensure the path starts with / for absolute paths
		if (!cleanSrc.startsWith("/")) {
			cleanSrc = `/${cleanSrc}`;
		}

		const { width: _width, height: _height, ...otherProps } = props;
		const cleanProps = {
			...otherProps,
			src: cleanSrc,
			alt: props.alt || "Image",
		};

		return (
			<div className="flex items-center justify-center">
				<Image
					className="my-6 h-auto max-w-full rounded-lg object-cover"
					width={800}
					height={600}
					style={{ width: "auto", height: "auto" }}
					{...cleanProps}
				/>
			</div>
		);
	},
	table: (props: ComponentProps<"table">) => (
		<div className="my-6 overflow-x-auto">
			<table
				className="w-full border-collapse text-dark dark:text-light"
				{...props}
			/>
		</div>
	),
	th: (props: ComponentProps<"th">) => (
		<th
			className="border border-dark/20 dark:border-light/20 bg-dark/5 dark:bg-light/5 px-4 py-2 font-semibold"
			{...props}
		/>
	),
	td: (props: ComponentProps<"td">) => (
		<td
			className="border border-dark/20 dark:border-light/20 px-4 py-2"
			{...props}
		/>
	),
	ViewRepository,
	TechBadge: TechBadgeWrapper,
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const resolvedParams = await params;
	const data = getDevProjectBySlug(resolvedParams.slug);

	if (!data) {
		notFound();
	}

	const previousImages = (await parent).openGraph?.images || [];

	// Use absolute title (not template) to keep titles under 60 chars for SEO
	// The template adds " | Portfolio de Thomas PEDOT" which makes titles too long
	return {
		title: {
			absolute: data.title,
		},
		description: data.summary || data.title,
		openGraph: {
			title: data.title,
			description: data.summary || data.title,
			type: "website",
			images: [
				...(data.image
					? [
							{
								url: data.image,
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
	const data = getDevProjectBySlug(resolvedParams.slug);

	if (!data) {
		notFound();
	}

	return (
		<article className="max-w-4xl px-6 py-12 mx-auto">
			{/* Breadcrumb Navigation */}
			<Breadcrumb
				items={[
					{ label: "Accueil", href: "/" },
					{ label: "Articles", href: "/articles" },
					{ label: data.title },
				]}
			/>

			{/* Article Header */}
			<header className="mb-8">
				{/* Author and Date */}
				{data.author && data.date && (
					<div className="mb-6 flex items-center gap-4">
						<div>
							<p className="text-sm font-medium text-dark dark:text-light">
								{data.author}
							</p>
							<p className="text-sm text-dark/60 dark:text-light/60">
								{new Date(data.date).toLocaleDateString("fr-FR", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>
						</div>
					</div>
				)}

				{/* Title */}
				<h1 className="mb-6 text-4xl font-bold leading-tight text-dark dark:text-light lg:text-5xl">
					{data.title}
				</h1>

				{/* Metadata: Tags */}
				{data.technologies && data.technologies.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-6">
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
			</header>

			{/* Main Image */}
			{data.image && (
				<Image
					src={data.image}
					width={1200}
					height={400}
					alt={data.title}
					priority
					className="w-full mx-auto mb-8 border rounded-lg"
				/>
			)}

			{/* Article Content with MDX */}
			<div className="mt-8 prose prose-lg dark:prose-invert max-w-none prose-li:marker:text-primary prose-a:text-primary dark:prose-a:text-primaryDark">
				<MDXRemote
					source={data.content || ""}
					// biome-ignore lint/suspicious/noExplicitAny: MDX components type compatibility
					components={components as any}
					options={{
						mdxOptions: {
							remarkPlugins: [remarkGfm],
						},
					}}
				/>
			</div>
		</article>
	);
}
