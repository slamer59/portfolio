import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { ListArticles } from "@/components/ListArticles";
import { ListFeaturedArticles } from "@/components/ListFeaturedArticles";
import { getArticles, getFeaturedArticles } from "@/sanity/queries/articles";
import TransitionEffect from "components/TransitionEffect";

export const metadata = {
  title: "L'imagination L'emporte Sur La Connaissance ! ",
  description: "Explorez une diversité de sujets qui captivent mon intérêt et nourrissent ma passion. Dans ce voyage à travers mes réflexions, vous découvrirez des articles traitant des dernières avancées en matière de technologies web, explorant les tendances émergentes et les innovations qui façonnent notre expérience en ligne. De plus, je partagerai avec vous mes réflexions sur l'énergie et son impact sur notre société, explorant les solutions durables et les défis actuels liés à cette ressource essentielle. Enfin, plongez dans l'univers de la photographie avec moi, où je partage mes expériences, conseils et inspirations pour capturer des moments uniques à travers l'objectif. Que ce soit dans le monde des technologies, de l'énergie ou de la photographie, je suis ravi de vous emmener dans cette aventure de découverte et d'exploration.",
  openGraph: {
    title: "L'imagination L'emporte Sur La Connaissance ! ",
    description: "Explorez une diversité de sujets qui captivent mon intérêt et nourrissent ma passion. Dans ce voyage à travers mes réflexions, vous découvrirez des articles traitant des dernières avancées en matière de technologies web, explorant les tendances émergentes et les innovations qui façonnent notre expérience en ligne. De plus, je partagerai avec vous mes réflexions sur l'énergie et son impact sur notre société, explorant les solutions durables et les défis actuels liés à cette ressource essentielle. Enfin, plongez dans l'univers de la photographie avec moi, où je partage mes expériences, conseils et inspirations pour capturer des moments uniques à travers l'objectif. Que ce soit dans le monde des technologies, de l'énergie ou de la photographie, je suis ravi de vous emmener dans cette aventure de découverte et d'exploration.",
    type: "website",
  },
}

export default async function Articles() {
  const featuredArticles = await getFeaturedArticles();
  const articles = await getArticles();

  return (
    <>
      <TransitionEffect />
      <Layout className="flex flex-col items-center justify-center w-full mb-16 overflow-hidden dark:text-light">
        <AnimatedText
          text="L'imagination l'emporte sur la connaissance !"
          className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
        >
          <h2 className="mb-4 text-xl text-center dark:text-light">
            Bienvenue dans la section dédiée à mon univers, où je vous invite à explorer une diversité de sujets qui captivent mon intérêt et nourrissent ma passion. Dans ce voyage à travers mes réflexions, vous découvrirez des articles traitant des dernières avancées en matière de <span className="font-bold text-primary dark:text-lime-500">technologies web</span>, explorant les tendances émergentes et les innovations qui façonnent notre expérience en ligne.
            De plus, je partagerai avec vous mes réflexions sur <span className="font-bold text-primary dark:text-lime-500">l'énergie</span> et son impact sur notre société, explorant les solutions durables et les défis actuels liés à cette ressource essentielle.
            Enfin, plongez dans l'univers de la <span className="font-bold text-primary dark:text-lime-500">photographie</span> avec moi, où je partage mes expériences, conseils et inspirations pour capturer des moments uniques à travers l'objectif.
            Que ce soit dans le monde des technologies, de <span className="font-bold text-primary dark:text-lime-500">l'énergie</span> ou de la <span className="font-bold text-primary dark:text-lime-500">photographie</span>, je suis ravi de vous emmener dans cette aventure de découverte et d'exploration.
          </h2>
        </AnimatedText>
        <ListFeaturedArticles articles={featuredArticles} />
        <h2 className="w-full my-16 mt-16 text-4xl font-bold text-center">
          Tous les articles
        </h2>
        <ListArticles articles={articles} />
      </Layout>
    </>
  );
}
