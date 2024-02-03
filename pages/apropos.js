import AnimatedText from "components/AnimatedText";
import Education from "components/Education";
import Experience from "components/Experience";
import Layout from "components/Layout";
import TransitionEffect from "components/TransitionEffect";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import profile from "../public/images/profile/developer-pic-2.jpg";

function AnimatedNumberFramerMotion({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0);
        }
      }),
    [springValue, value]
  );

  return <span ref={ref} />;
}

export default function About() {
    // Date de référence (2008)
  var dateDeReference = new Date('2008-02-01');

  // Date actuelle
  var dateActuelle = new Date();

  // Calcul de la différence en millisecondes entre les deux dates
  var difference = dateActuelle.getTime() - dateDeReference.getTime();

  // Conversion de la différence de millisecondes en années
  var anneesExperience = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));


  // Année de début des projets
    var anneeDebut = 2012;

    // Année actuelle
    var anneeActuelle = new Date().getFullYear();

    // Nombre moyen de projets photo par an
    var projetsParAnMin = 4;
    var morceaux = 100;
    // Calcul du nombre d'années écoulées depuis le début
    var anneesEcoulees = anneeActuelle - anneeDebut;

    // Calcul du nombre total de projets photo
  var nbProjetsPhotos = anneesEcoulees * projetsParAnMin + Math.floor(Math.random() * 3) - 1;
  
  var nbFaussesNotes = anneesEcoulees * morceaux + Math.floor(Math.random() * 30) - 1;

  return (
    <>
      <Head>
        <title>Minimal Portfolio Built with Nextjs | About Page</title>
        <meta name="description" content="Learn more about CodeBucks, a Next.js developer with a passion for 
        creating innovative solutions. Discover tips for building a developer portfolio and insights on 
        full-stack development, front-end development, and back-end development." />
      </Head>
      <TransitionEffect />
      <main
        className={`flex  w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Créativité & passioné"
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div className="flex flex-col items-start justify-start col-span-3 xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                BIOGRAPHIE
              </h2>
              <p className="font-medium ">
                Je m'appelle Thomas, docteur en énergétique, architecte informatique ou développeur, avec une passion pour la création photographiques ou la musique. 
                Que ce soit pour les problématiques sociales, par mon travail, ou la culture par passion, j'essaie d'avoir un regard ouvert sur le monde.
              </p>
              <p className="my-4 font-medium">
                J'essaie tous les jours d'enrichir ma compréhension du monde.
              </p>
            </div>
            <div className="relative col-span-3 p-8 border-2 border-solid h-max rounded-2xl border-dark bg-light dark:border-light dark:bg-dark xl:col-span-4 md:col-span-8 md:order-1 ">
              <div
                className="absolute  top-0 -right-3 -z-10 h-[103%] w-[102%]  rounded-[2rem] rounded-br-3xl 
                bg-dark
        dark:bg-light  "
              />
              <Image
                className="w-full h-auto rounded-2xl"
                src={profile}
                alt="Codebucks"
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                priority
              />
            </div>
            <div className="flex flex-col items-end justify-between col-span-2 xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block font-bold text-7xl md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={nbFaussesNotes} />
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  fausses notes par an
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block font-bold text-7xl md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={nbProjetsPhotos} />+
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  sessions photos
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block font-bold text-7xl md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumberFramerMotion value={anneesExperience} />+
                </span>
                <h2 className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Années d'expériences
                </h2>
              </div>
            </div>
          </div>

          {/* <Skills /> */}
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
}
