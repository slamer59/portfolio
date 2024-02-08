"use client"

import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import Layout from "components/Layout";
import Head from "next/head";
import PhotoProjectLayout from "../../components/Photo/PhotoProjectLayout";

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
      <Layout className="flex flex-col items-center justify-center w-full mb-16 dark:text-light">
        <AnimatedText
          text="L'imagination l'emporte sur la connaissance !"
          className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
        >
          <h2 className="mb-4 text-xl text-center dark:text-light">
            C'est souvent dit que l'<span className="font-bold text-primary dark:text-lime-500">imagination</span> est plus importante que la <span className="font-bold text-primary dark:text-lime-500">connaissance</span>.
            Cette idée, souvent attribuée à <span className="italic font-bold text-primary dark:text-lime-500">Albert Einstein</span>, souligne l'importance de la créativité et de l'innovation dans la recherche de nouvelles idées et de solutions aux problèmes.
            Bien que la connaissance soit essentielle pour comprendre le monde qui nous entoure, c'est l'imagination qui nous pousse à aller au-delà des limites actuelles et à envisager des possibilités nouvelles et inexplorées. L'<span className="font-bold text-primary dark:text-lime-500">imagination</span> nourrit la pensée créative et la capacité à voir les choses sous un angle différent, ce qui peut conduire à des <span className="font-bold text-primary dark:text-lime-500">découvertes</span> et des réalisations importantes.
          </h2>
        </AnimatedText>
        <PhotoProjectLayout />
      </Layout>
    </>
  );
}
