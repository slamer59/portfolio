import { Github, Gitlab, Star } from "lucide-react";
import type { ReactNode } from "react";

interface RepoLinkProps {
	url: string;
	platform?: "github" | "gitlab";
	children?: ReactNode;
}

export function RepoLink({ url, platform, children }: RepoLinkProps) {
	const detectedPlatform =
		platform || (url.includes("github.com") ? "github" : "gitlab");

	const config = {
		github: {
			icon: <Github className="w-[25px] h-[25px] text-black" />,
			label: "GitHub",
			bgColor: "bg-[#24292e]",
			hoverColor: "group-hover:bg-[#1a1e22]",
		},
		gitlab: {
			icon: <Gitlab className="w-[25px] h-[25px] text-black" />,
			label: "GitLab",
			bgColor: "bg-[#FC6D26]",
			hoverColor: "group-hover:bg-[#e85622]",
		},
	};

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer nofollow"
			className="inline-flex items-center overflow-hidden transition-all duration-300 rounded-lg group hover:scale-105 hover:shadow-lg"
		>
			{/* Icône */}
			<div className="flex items-center justify-center bg-white px-3 h-[47px]">
				{config[detectedPlatform].icon}
			</div>

			{/* Texte */}
			<div
				className={`flex items-center justify-center gap-2 px-4 h-[47px] uppercase text-xs font-bold tracking-wider text-white transition-colors ${config[detectedPlatform].bgColor} ${config[detectedPlatform].hoverColor}`}
			>
				<Star className="w-5 h-5 fill-yellow-400 stroke-none" />
				{children || `Voir mon ${config[detectedPlatform].label}`}
			</div>
		</a>
	);
}
