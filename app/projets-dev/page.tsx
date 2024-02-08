"use client"

import AnimatedText from "@/components/AnimatedText";
import DevProjectLayout from "@/components/Projets/DevProjectLayout";
import TransitionEffect from "@/components/TransitionEffect";
import Layout from "components/Layout";
import Head from "next/head";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Modern Portfolio Built with Nextjs | Projects Page</title>
        <meta
          name="description"
          content="Discover the latest webapp projects created by CodeBucks, a Next.js developer with 
        expertise in React.js and full-stack development. Browse software engineering articles and tutorials for tips on creating your own portfolio."
        />
      </Head>
      <TransitionEffect />
      <main
        className={`mb-16  flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Galaxie Numérique : Exploration des Projets"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          >
            <h2 className="mb-4 text-xl text-center dark:text-light">
              Voici la vitrine <span className="font-bold text-primary dark:text-lime-500">numérique</span> à mon parcours et à mon <span className="font-bold text-primary dark:text-lime-500">expertise</span>.
              À travers cette plateforme, vous pouvez appercevoir la diversité des projets sur lesquels j'ai travaillé publiquement (une infime partie donc), mettant en avant mes compétences dans différents domaines tels que <span className="font-bold text-primary dark:text-lime-500">l'architecture de solutions logiciels</span>, la science des données, l'apprentissage automatique, le développement web, et bien plus encore.
              Il sert de fenêtre sur mes compétences, mes intérêts et mes contributions dans le domaine <span className="font-bold text-primary dark:text-lime-500">numérique</span>, offrant ainsi aux autres la possibilité d'explorer et d'apprécier mon travail au sein de la communauté GitHub et au-delà.
            </h2>
          </AnimatedText>
          <DevProjectLayout />
        </Layout>
      </main >
    </>
  );
}
