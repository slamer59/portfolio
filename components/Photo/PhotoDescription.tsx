"use client";

interface PhotoDescriptionProps {
	photoTitle?: string;
	photoAlt?: string;
	photoDescription?: string;
	galleryTitle: string;
	galleryDescription?: string;
	photoIndex: number;
	totalPhotos: number;
	publishedDate?: string;
}

export default function PhotoDescription({
	photoTitle,
	photoAlt,
	photoDescription,
	galleryTitle,
	galleryDescription,
	photoIndex,
	totalPhotos,
	publishedDate,
}: PhotoDescriptionProps) {
	// Generate a meaningful title
	const displayTitle =
		photoTitle || photoAlt || `Photo ${photoIndex + 1} from ${galleryTitle}`;

	// Build descriptive content
	const description =
		photoDescription ||
		photoAlt ||
		`This image is part of the "${galleryTitle}" photography collection${galleryDescription ? `, ${galleryDescription.toLowerCase()}` : ""}. ${
			publishedDate
				? `Captured and published on ${new Date(publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.`
				: ""
		}`;

	return (
		<div className="absolute bottom-0 left-0 right-0 z-50 px-4 py-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white pointer-events-none">
			<div className="max-w-4xl mx-auto">
				{/* Photo Title */}
				<h2 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">
					{displayTitle}
				</h2>

				{/* Photo Description */}
				<p className="text-sm md:text-base text-gray-200 mb-3 line-clamp-3 drop-shadow-md">
					{description}
				</p>

				{/* Gallery Context and Navigation Info */}
				<div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-300">
					<span className="px-2 py-1 bg-white/10 rounded backdrop-blur-sm">
						{galleryTitle} Collection
					</span>
					<span className="px-2 py-1 bg-white/10 rounded backdrop-blur-sm">
						Photo {photoIndex + 1} of {totalPhotos}
					</span>
					{publishedDate && (
						<span className="px-2 py-1 bg-white/10 rounded backdrop-blur-sm">
							{new Date(publishedDate).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
							})}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
