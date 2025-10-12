import { GalleryCustom } from "@/components/Photo/GalleryCustom";
import GalleryHeadLine from "@/components/Photo/GalleryHeadLine";
import { PortableComponentsDefinitions as components } from "@/components/PortableComponentsDefinitions";
import { urlFor } from "@/sanity/lib/client";
import {
	getGalleryImageByIndex,
	getGalleryImages,
	getGalleryNextImages,
} from "@/sanity/queries/galleries";
import { PortableText } from "@portabletext/react";
import type { Metadata, ResolvingMetadata } from "next";
import { domain } from "portfolio.config";
import GalleryPage from "./GalleryPage";

export const revalidate = 30; // revalidate at most 30 seconds

const widths = [500, 1000, 1600];
const ratios = [2.2, 4, 6, 8];

export async function generateMetadata(
	{
		params,
		searchParams,
	}: {
		params: Promise<{ galleryId: string }>;
		searchParams: Promise<{ photoId?: string }>;
	},
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const resolvedParams = await params;
	const resolvedSearchParams = await searchParams;
	const photoId = resolvedSearchParams.photoId
		? Number(resolvedSearchParams.photoId)
		: 0;
	const galleryData = await getGalleryImages(resolvedParams.galleryId);
	const galleryImageData = await getGalleryImageByIndex(
		resolvedParams.galleryId,
		photoId,
	);
	const galleryNextData = await getGalleryNextImages(resolvedParams.galleryId);

	const ogImages = resolvedSearchParams.photoId
		? [urlFor(galleryImageData.image[0]).format("webp").url()]
		: galleryNextData.gallery.images.map((image) =>
				urlFor(image).format("webp").url(),
			);

	// Construct the canonical URL
	const baseUrl = domain; // Replace with your actual base URL
	const canonicalUrl = `${baseUrl}/photographie/${resolvedParams.galleryId}`;

	return {
		title: galleryData.title,
		description: galleryData.description,
		keywords: galleryData.keywords,
		authors: galleryData.author
			? [{ name: galleryData.author.name }]
			: undefined,
		openGraph: {
			title: galleryData.title,
			description: galleryData.description,
			type: "website",
			url: canonicalUrl, // Add the canonical URL here
			images: ogImages,
		},
		twitter: {
			card: "summary_large_image",
			title: galleryData.title,
			description: galleryData.description,
			images: ogImages,
			creator: galleryData.author ? galleryData.author.name : undefined,
		},
		alternates: {
			canonical: canonicalUrl, // Add the canonical URL here
		},
	};
}

export default async function ImageGalleryPage({
	params,
	searchParams,
}: {
	params: Promise<{ galleryId: string }>;
	searchParams: Promise<{ photoId?: string }>;
}) {
	const resolvedParams = await params;
	const resolvedSearchParams = await searchParams;
	const photoId = resolvedSearchParams.photoId
		? Number(resolvedSearchParams.photoId)
		: 0;
	const galleryData = await getGalleryImages(resolvedParams.galleryId);
	const galleryNextData = await getGalleryNextImages(resolvedParams.galleryId);
	const galleryImageData = await getGalleryImageByIndex(
		resolvedParams.galleryId,
		photoId,
	);

	if (resolvedSearchParams.photoId) {
		return (
			<div className="mx-auto max-w-[1960px] p-4">
				<GalleryPage
					galleryData={galleryData}
					galleryImageData={galleryImageData}
					photoId={resolvedSearchParams.photoId || "0"}
				/>
			</div>
		);
	}

	const images = galleryNextData.gallery.images.map((image) => ({
		aspect_ratio: image.aspect_ratio,
		src: urlFor(image).format("webp").url(),
		lqip: image.lqip,
		hotspot: image.hotspot,
		alt: image.alt,
		title: image.title,
	}));

	return (
		<div className="container mt-8">
			<GalleryHeadLine date={galleryData.date} title={galleryData.title} />
			<article className="w-full max-w-6xl mx-auto mb-8 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
				<div className="mt-8 mb-8 prose prose-lg prose-blue dark:prose-invert prose-li:marker:text-primary dark:text-light prose-a:text-primary">
					<PortableText components={components} value={galleryData.body} />
				</div>
				<GalleryCustom
					images={images}
					widths={widths}
					ratios={ratios}
					galleryId={resolvedParams.galleryId}
					lastRowBehavior="match-previous"
					overlay={(i) => (
						<div
							key={i}
							className="z-20 flex flex-col items-center justify-center h-full"
						>
							<div className="text-2xl font-bold text-white">
								{galleryNextData.gallery.images[i].title}
							</div>
							<div className="text-lg text-white">
								{galleryNextData.gallery.images[i].description}
							</div>
						</div>
					)}
				/>
			</article>
		</div>
	);
}
