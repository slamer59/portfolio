
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ButtonsCardPrimary, ButtonsCardSecondary } from "@/components/ui/tailwindcss-buttons";
import AnimatedText from "components/AnimatedText";

import TransitionEffect from "components/TransitionEffect";
import Image from "next/image";
export const metadata = {
    title: "Thomas Pedot photographe, docteur en énergie et développeur. Immortaliser L'instant Présent, Savourer Chaque Moment. | Accueil",
    description: "Photographe et développeur web, je m'efforce de marier l'art et la technologie pour donner vie à des projets uniques et inspirants.",
    keywords: "photographe, développeur, web, photographe, docteur, énergie",
    opengraph: {
        "title": "Thomas Pedot | Accueil",
        "description": "Photographe et développeur web, je m'efforce de marier l'art et la technologie pour donner vie à des projets uniques et inspirants."
    },
}

const testimonials = [
    {
        src: "/images/camera-roll/1.webp",
        alt: "Photo Camera Roll #1 de Thomas Pedot",
    },
    {
        src: "/images/camera-roll/2.webp",
        alt: "Photo Camera Roll #2 de Thomas Pedot",
    },
    {
        src: "/images/camera-roll/3.webp",
        alt: "Photo Camera Roll #3 de Thomas Pedot",
    },
    {
        src: "/images/camera-roll/4.webp",
        alt: "Photo Camera Roll #4 de Thomas Pedot",
    },
    {
        src: "/images/camera-roll/5.webp",
        alt: "Photo Camera Roll #5 de Thomas Pedot",
    },
    {
        src: "/images/camera-roll/6.webp",
        alt: "Photo Camera Roll #6 de Thomas Pedot",
    },
    {
        src: "/images/camera-roll/7.webp",
        alt: "Photo Camera Roll #7 de Thomas Pedot",
    }


];

export default function Home() {
    // https://websitedemos.net/photographer-04/
    return (
        <>
            <TransitionEffect />
            <div className="fixed inset-y-0 right-0 items-end inline-block object-right w-1/2 col-span-1 bg-center bg-cover sm:hidden md:hidden"
                style={{
                    backgroundImage: 'url("/images/profile/717A1222.png")'
                }}
            >
            </div >
            <section className="z-10 pt-6 pb-6 bg-transparent top-10 dark:text-light">
                <div className="grid items-center content-center grid-cols-2 mx-auto sm:grid-cols-1">
                    <AnimatedText
                        isSection
                        text="Immortaliser l'instant présent, savourer chaque moment."
                        className="px-6 py-16 font-extrabold dark:text-light" //mb-16 lg:!text-4xl md:!text-4xl !leading-tight sm:mb-8 sm:!text-3xl xs:!text-4xl"
                    >
                        <div className="w-full px-6 rounded-md">
                            <h2 className="mt-4 mb-2 text-xl dark:text-light">
                                Toujours en quête de nouvelles perspectives à travers l'<span className="font-bold text-primary dark:text-light">objectif</span> de mon appareil photo ou les lignes de code, je m'efforce de marier l'art et la technologie pour donner vie à des <span className="font-bold text-primary dark:text-light">projets uniques et inspirants</span>.
                            </h2>
                        </div>
                    </AnimatedText>
                    <div className="flex flex-row items-center justify-center gap-2 m-8 lg:flex-col xl:flex-col md:justify-start">
                        <ButtonsCardPrimary text="Lire mes articles" href="/articles" />
                        <ButtonsCardSecondary text="Regarder mes photos" href="/photographie" />
                    </div>
                </div>
            </section>
            <Image
                className="items-center hidden object-cover md:inline-block "
                src="/images/profile/717A1222.png"
                width="1024"
                height="1024"
                alt={"Image hero 2"}
            />
            <section className="z-10 border-t-2 border-black dark:border-primaryDark relative flex flex-row w-full bg-transparent mx-auto md:grid-cols-1 h-[900px] md:flex-col">
                <div className="flex-col items-center content-center justify-center hidden w-full bg-light sm:inline-block md:inline-block">
                    <h2 className="flex m-4 text-4xl font-semibold text-center text-dark dark:text-primary ">
                        Ma passion de la photographie
                    </h2>
                    <Image
                        className="hidden md:inline-block sm:inline-block"
                        src="/images/profile/717A1179.png"
                        width="512"
                        height="512"
                        alt={"Image hero 2"}
                    />
                </div>
                <div
                    className="flex flex-col items-center content-center justify-center w-full bg-center bg-no-repeat bg-cover bg-light sm:hidden md:hidden"
                    style={{ backgroundImage: `url('/images/profile/717A1179.png')` }}
                >
                    <h2 className="flex object-center m-4 text-4xl font-semibold text-center text-dark dark:text-primary">
                        Ma passion de la photographie
                    </h2>
                </div>

                <div className="flex flex-col items-center content-center justify-center w-full bg-light dark:bg-dark dark:text-light">
                    <h3 className="p-2 m-2 text-4xl font-semibold text-center text-dark dark:text-light">
                        Découverte de la photographie
                    </h3>
                    <div className="p-2 m-2 text-xl">
                        <p>
                            J'ai découvert la photographie en 2011 grâce à mon frère qui m'a donné son appareil photo reflex Canon 350D.
                        </p>
                        <br />
                        <p>
                            Pour mon voyage au <span className="font-bold text-primary dark:text-light">Mexique</span>, j'ai pu utiliser sans crainte cette appareil dans un des pays les plus beaux que j'ai pu visiter.
                            C'est au retour de ce voyage que j'ai pris conscience de l'importance de capturer des moments de vie, des paysages, des <span className="font-bold text-primary dark:text-light">émotions</span>.
                        </p>
                        <br />
                        <p>
                            Depuis, je n'ai jamais arrêté de photographier, de m'améliorer.
                        </p>
                    </div>
                    <Image
                        className="hidden md:inline-block sm:inline-block"
                        src="/images/profile/717A1217.png"
                        width="512"
                        height="512"
                        alt={"Image hero 2"}
                    />
                </div>

            </section>
            <section
                className="relative z-20 flex flex-col items-center justify-center object-center w-full mx-auto border-t-2 dark:border-primaryDark border-black bg-light dark:bg-dark h-[1000px] md:flex-col dark:text-light">
                <div className="flex h-[1000px] items-center content-center w-screen flex-col-1 bg-light dark:bg-dark
                    bg-[url('/images/profile/services-02-free-img.png')] 
                    bg-no-repeat 
                    bg-top
                    bg-contain
                    "
                >
                </div>
                <div className="flex flex-col items-center object-center text-center">
                    <h2 className="flex m-4 text-4xl font-semibold text-center text-dark dark:text-light">
                        🎶 Musique
                        💃 Danse
                        🎪 Cirque
                    </h2>
                    <div className="p-4 text-2xl text-center dark:text-light">
                        <p>Des ami.e.s musicien.ne.s m'ont donné l'opportunité de les photographier lors de <span className="font-bold text-primary dark:text-light">concerts</span>, de répétitions, de tournages de clips.
                        </p>
                        <br />
                        <p>
                            C'est avec le temps que mes premières opportunités s'offrent à moi.
                        </p>
                        <br />
                    </div>
                </div>

                <div className="container flex items-center content-center w-full">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="slow"
                    />
                </div>
            </section>
            <section className="relative z-20 flex flex-col w-full mx-auto bg-light dark:bg-dark dark:text-light">
                <div className="flex flex-col items-center object-center text-center">
                    <h2 className="flex m-4 text-4xl font-semibold text-center text-dark dark:text-light">
                        Interessé par mon travail ?
                    </h2>
                    <div className="p-4 text-2xl text-center dark:text-light">
                        <p>
                            Vous souhaitez échanger avec moi pour un projet ?
                        </p>
                        <br />
                        <p>
                            Ouvert à la discussion, je serais très heureux d'échanger avec vous de vos projets.
                        </p>
                        <br />
                        <p className="font-bold text-primary dark:text-light">N'hésitez pas à me contacter !</p>
                    </div>
                </div>
            </section >
        </>
    );
}
