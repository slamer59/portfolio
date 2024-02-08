import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import Layout from "components/Layout";
import PhotoProjectLayout from "../../components/Photo/PhotoProjectLayout";


export const metadata = {
  title: "Créatif & Passioné  docteur en énergétique, architecte informatique ou développeur, avec une passion pour la création photographiques ou la musique",
  description: "Découvrez mon univers photographique, où je partage mes expériences, conseils et inspirations pour capturer des moments uniques à travers l'objectif. Que ce soit dans le monde des technologies, de l'énergie ou de la photographie, je suis ravi de vous emmener dans cette aventure de découverte et d'exploration.",
  openGraph: {
    title: "Mon univers photographique",
    description: "Découvrez mon univers photographique, où je partage mes expériences, conseils et inspirations pour capturer des moments uniques à travers l'objectif. Que ce soit dans le monde des technologies, de l'énergie ou de la photographie, je suis ravi de vous emmener dans cette aventure de découverte et d'exploration.",
    type: "website",
  },
}

export default function Projects() {
  return (
    <>
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
