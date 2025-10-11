import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import Layout from "components/Layout";
import { getAllDevProjects } from "@/sanity/queries/devProjects";
import { DevProjectsClient } from "./dev-projects-client";
import { revalidatePage } from "portfolio.config";

export const revalidate = revalidatePage;

export const metadata = {
	title: "Galaxie Numérique : Exploration des Projets",
	description:
		"Voici la vitrine numérique à mon parcours et à mon expertise. À travers cette plateforme, vous pouvez appercevoir la diversité des projets sur lesquels j'ai travaillé publiquement (une infime partie donc), mettant en avant mes compétences dans différents domaines tels que l'architecture de solutions logiciels, la science des données, l'apprentissage automatique, le développement web, et bien plus encore. Il sert de fenêtre sur mes compétences, mes intérêts et mes contributions dans le domaine numérique, offrant ainsi aux autres la possibilité d'explorer et d'apprécier mon travail au sein de la communauté GitHub et au-delà.",
	openGraph: {
		title: "Galaxie Numérique : Exploration des Projets",
		description:
			"Voici la vitrine numérique à mon parcours et à mon expertise. À travers cette plateforme, vous pouvez appercevoir la diversité des projets sur lesquels j'ai travaillé publiquement (une infime partie donc), mettant en avant mes compétences dans différents domaines tels que l'architecture de solutions logiciels, la science des données, l'apprentissage automatique, le développement web, et bien plus encore. Il sert de fenêtre sur mes compétences, mes intérêts et mes contributions dans le domaine numérique, offrant ainsi aux autres la possibilité d'explorer et d'apprécier mon travail au sein de la communauté GitHub et au-delà.",
		type: "website",
	},
};

interface ProjectsPageProps {
	searchParams: Promise<{ page?: string }>;
}

export default async function Projects({ searchParams }: ProjectsPageProps) {
	const projects = await getAllDevProjects();
	const params = await searchParams;

	// Transform Sanity data to match DevProject type expected by client
	const transformedProjects = projects.map((project) => ({
		slug: project.currentSlug,
		title: project.title,
		summary: project.summary,
		description: project.description,
		image: project.mainImage,
		technologies: project.technologies || [],
		github: project.github,
		link: project.link,
		date: project.publishedAt || "",
		featured: project.featured ?? false,
		published: project.published ?? true,
		keywords: project.keywords || [],
		type: project.type,
	}));

	return (
		<>
			<TransitionEffect />
			<Layout className="flex flex-col items-center justify-center w-full pt-20 mb-16 dark:text-light">
				<AnimatedText
					text="Galaxie Numérique : Exploration des Projets"
					className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
				>
					<h2 className="mb-4 text-xl text-center dark:text-light">
						Voici la vitrine{" "}
						<span className="font-bold text-primary dark:text-light">
							numérique
						</span>{" "}
						à mon parcours et à mon{" "}
						<span className="font-bold text-primary dark:text-light">
							expertise
						</span>
						. À travers cette plateforme, vous pouvez appercevoir la diversité
						des projets sur lesquels j'ai travaillé publiquement (une infime
						partie donc), mettant en avant mes compétences dans différents
						domaines tels que{" "}
						<span className="font-bold text-primary dark:text-light">
							l'architecture de solutions logiciels
						</span>
						, la science des données, l'apprentissage automatique, le
						développement web, et bien plus encore. Il sert de fenêtre sur mes
						compétences, mes intérêts et mes contributions dans le domaine{" "}
						<span className="font-bold text-primary dark:text-light">
							numérique
						</span>
						, offrant ainsi aux autres la possibilité d'explorer et d'apprécier
						mon travail au sein de la communauté GitHub et au-delà.
					</h2>
				</AnimatedText>
				<DevProjectsClient
					projects={transformedProjects}
					searchParams={params}
				/>
			</Layout>
		</>
	);
}
