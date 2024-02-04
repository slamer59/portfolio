import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { ListArticles } from "@/components/ListArticles";
import { ListFeaturedArticles } from "@/components/ListFeaturedArticles";
import { getArticles, getFeaturedArticles } from "@/sanity/queries/articles";
import TransitionEffect from "components/TransitionEffect";
import Head from "next/head";

export default async function Articles() {
  const featuredArticles = await getFeaturedArticles();
  const articles = await getArticles();

  return (
    <>
      <Head>
        <title>Simple Portfolio Built with Nextjs | Articles Page</title>
        <meta
          name="description"
          content="Browse through CodeBucks's collection of software engineering articles and 
        tutorials on Next.js, React.js, web development, and more. 
        Gain valuable insights and stay up-to-date with SEO tips for building a developer portfolio."
        />
      </Head>
      <TransitionEffect />
      <main
        className={`w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Words Can Change the World!"
            className="!text-8xl !leading-tight mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <ListFeaturedArticles articles={featuredArticles} />
          <h2 className="w-full my-16 mt-32 text-4xl font-bold text-center">
            Tous les articles
          </h2>
          <ListArticles articles={articles} />
        </Layout>
      </main>
    </>
  );
}
