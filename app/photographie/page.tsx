import AnimatedText from "@/components/AnimatedText";
import PhotoProjectLayout from "@/components/Photo/PhotoProjectLayout";
import TransitionEffect from "@/components/TransitionEffect";
import Layout from "components/Layout";

import { revalidatePage } from "portfolio.config";

export const revalidate = revalidatePage; // revalidate at most 30 seconds


export const metadata = {
  title: "Mon univers photographique",
  description: "Découvrez mon univers photographique, où je partage mes expériences, conseils et inspirations pour capturer des moments uniques à travers l'objectif. Que ce soit dans le monde des technologies, de l'énergie ou de la photographie, je suis ravi de vous emmener dans cette aventure de découverte et d'exploration.",
  openGraph: {
    title: "Mon univers photographique",
    description: "Découvrez mon univers photographique, où je partage mes expériences, conseils et inspirations pour capturer des moments uniques à travers l'objectif. Que ce soit dans le monde des technologies, de l'énergie ou de la photographie, je suis ravi de vous emmener dans cette aventure de découverte et d'exploration.",
    type: "website",
    images: [
      {
        url: "./images/profile/developer-pic-1.jpg",
        width: 800,
        height: 600,
        alt: "Thomas Pedot, photographe, docteur en énergie et développeur.",
      },
    ],
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
            Cette idée souligne l'importance de la créativité et de l'innovation dans la recherche de nouvelles idées et de solutions aux problèmes.
            Bien que la connaissance soit essentielle pour comprendre le monde qui nous entoure, c'est l'imagination qui nous pousse à aller au-delà des limites actuelles et à envisager des possibilités nouvelles et inexplorées. L'<span className="font-bold text-primary dark:text-lime-500">imagination</span> nourrit la pensée créative et la capacité à voir les choses sous un angle différent, ce qui peut conduire à des <span className="font-bold text-primary dark:text-lime-500">découvertes</span> et des réalisations importantes.
          </h2>
          <div className="mb-4 text-xl text-center dark:text-light">
            Je vous ouvre les portes de mes explorations photographiques, cherchant à immortaliser des instants uniques et inspirants à travers le regard de mon appareil photo.
            Dans ces images, l'essence de <span className="font-bold text-primary dark:text-lime-500">mes univers</span>, que j'espère riches en émotions et en créativité.
            Chaque cliché tente de révéler des <span className="font-bold text-primary dark:text-lime-500">mondes variés</span> ancrés dans l'art, tels que la musique, la danse, le théâtre, la peinture, la sculpture, et l'architecture, trés souvent portés et incarnés par mes <span className="font-bold text-primary dark:text-lime-500">ami.e.s artistes</span>.
          </div>
        </AnimatedText>
        <PhotoProjectLayout />
      </Layout>
    </>
  );
}
