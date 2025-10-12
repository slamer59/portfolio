import Image from "next/image";

interface AuthorProfileProps {
	name?: string;
	title?: string;
	date?: string;
	imageSrc: string;
	imageAlt?: string;
}

export function AuthorProfile({
	name = "Thomas PEDOT",
	title = "CTO Jokosun",
	date,
	imageSrc,
	imageAlt = "Thomas PEDOT",
}: AuthorProfileProps) {
	return (
		<div className="flex items-center gap-4 mb-8">
			<div className="relative w-12 h-12 overflow-hidden rounded-full shrink-0">
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					className="object-cover"
					sizes="48px"
				/>
			</div>
			<div className="flex flex-col">
				<div className="font-semibold text-dark dark:text-light">{name}</div>
				<div className="text-sm opacity-70 text-dark dark:text-light">
					{title}
				</div>
				{date && (
					<div className="text-sm opacity-70 text-dark dark:text-light">
						{date}
					</div>
				)}
			</div>
		</div>
	);
}
