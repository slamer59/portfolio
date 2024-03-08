

import AnimatedText from "@/components/AnimatedText";

import { ButtonsCardPrimary, ButtonsCardSecondary } from "@/components/ui/tailwindcss-buttons";
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


export default function Home() {
    // https://websitedemos.net/photographer-04/
    return (
        <>
            <TransitionEffect />
            <div
                className="bg-fixed bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url('/images/profile/717A1222.png')` }}
            >
                <div className="container bg-light dark:bg-dark">
                    <div className="container flex flex-row items-center gap-6 pb-32 mt-10 sm:flex-col md:flex-row max-w-8xl">
                        <div className="">
                            <AnimatedText
                                text="Immortaliser l'instant présent, savourer chaque moment."
                                // text=" Un monde de photos !"
                                className="mb-16 lg:!text-4xl md:!text-4xl !leading-tight sm:mb-8 sm:!text-3xl xs:!text-4xl"
                            >
                                <h2 className="mb-4 text-xl text-center dark:text-light">
                                    Toujours en quête de nouvelles perspectives à travers l'<span className="font-bold text-primary dark:text-lime-500">objectif</span> de mon appareil photo ou les lignes de code, je m'efforce de marier l'art et la technologie pour donner vie à des <span className="font-bold text-primary dark:text-lime-500">projets uniques et inspirants</span>.
                                </h2>
                            </AnimatedText>
                            <div className="flex flex-row items-center justify-center gap-2 m-8 lg:flex-col xl:flex-col md:justify-start">
                                <ButtonsCardPrimary text="Lire mes articles" href="/articles" />
                                <ButtonsCardSecondary text="Regarder mes photos" href="/photographie" />
                            </div>
                        </div>
                        <div className="z-20 flex justify-center w-2/3 md:w-full sm:w-full md:justify-end">
                            <div className="flex flex-wrap items-center content-center justify-center h-48">
                                <Image
                                    className="inline-block sm:hidden md:hidden"
                                    src="/images/profile/1.png"
                                    width="256"
                                    height="256"
                                    alt={"Image hero 1"}
                                />
                                <Image
                                    className="inline-block p-8 mt-10 hover:scale-125"
                                    src="/images/profile/13.png"
                                    width="512"
                                    height="512"
                                    alt={"Image hero 2"}
                                />
                                <Image
                                    className="inline-block md:hidden sm:hidden hover:scale-110"
                                    src="/images/profile/15.png"
                                    width="256"
                                    height="256"
                                    alt={"Image hero 3"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-row w-full mx-auto bg-transparent md:grid-cols-1 h-[900px] md:flex-col">
                    <div className="flex flex-col items-center content-center justify-center w-full bg-opacity-50 bg-light">
                        <h2 className="flex m-4 text-4xl font-semibold text-center text-dark dark:text-primary">
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
                    <div className="flex flex-col items-center content-center justify-center w-full bg-light dark:bg-dark dark:text-light">
                        <div className="p-2 m-2 text-2xl text-center">
                            <p>
                                J'ai découvert la photographie en 2011 grâce à mon frère qui m'a donné son appareil photo reflex Canon 350D.
                            </p>
                            <br />
                            <p>
                                Pour mon voyage au <span className="font-bold text-primary dark:text-lime-500">Mexique</span>, j'ai pu utiliser sans crainte cette appareil dans un des pays les plus beaux que j'ai pu visiter.
                                C'est au retour de ce voyage que j'ai pris conscience de l'importance de capturer des moments de vie, des paysages, des <span className="font-bold text-primary dark:text-lime-500">émotions</span>.
                            </p>
                            <br />
                            <p>
                                Depuis, je n'ai jamais arrêté de photographier, de m'améliorer.
                            </p>
                        </div>
                    </div>
                </div>
                <Image
                    className="hidden md:inline-block sm:inline-block"
                    src="/images/profile/717A0941.png"
                    width="512"
                    height="512"
                    alt={"Image hero 2"}
                />
                <div className="relative flex flex-row w-full mx-auto md:grid-cols-1">
                    <div className="flex flex-col w-full p-4 bg-light dark:bg-dark h-[700px] ">
                        <h2 className="flex items-center justify-center m-4 text-4xl font-semibold text-dark dark:text-light">
                            Musique, Danse, Cirque
                        </h2>

                        <div className="p-4 text-2xl text-center dark:text-light">
                            <p>Des ami.e.s musicien.ne.s m'ont donné l'opportunité de les photographier lors de <span className="font-bold text-primary dark:text-lime-500">concerts</span>, de répétitions, de tournages de clips.</p>
                            <br />
                            <p>
                                C'est avec le temps que mes premières opportunités s'offrent à moi.
                            </p>
                            <br />
                            <p>
                                Des collaborations avec des <span className="font-bold text-primary dark:text-lime-500">circacien.ne.s</span>, des danseur.se.s, des comédien.ne.s, des artistes, des particuliers, des <span className="font-bold text-primary dark:text-lime-500">concerts</span>, des festivals, des spectacles, des <span className="font-bold text-primary dark:text-lime-500">portraits</span>, des paysages.
                            </p>
                            <br />
                            <p>
                                Je décide alors d'exposer ce travail avec vous pour partager mon amour pour cet art.
                            </p>
                        </div>
                    </div>

                </div>
                <div className="relative flex flex-row w-full mx-auto bg-transparent h-[450px] md:flex-col dark:text-light">
                    <div className="flex flex-col items-center content-center justify-center w-full bg-light dark:bg-dark ">
                        <Image
                            className="hidden md:inline-block sm:inline-block"
                            src="/images/profile/717A1217.png"
                            width="512"
                            height="512"
                            alt={"Image hero 2"}
                        />
                        <div className="m-2 text-2xl text-center">

                            <p>
                                Vous souhaitez échanger avec moi pour un projet ?
                            </p>
                            <br />
                            <p>
                                Ouvert à la discussion, je serais très heureux d'échanger avec vous de vos projets.
                            </p>
                            <br />
                            <p>
                                <span className="font-bold text-primary dark:text-lime-500">N'hésitez pas à me contacter !</span>
                            </p>
                        </div>

                    </div>
                    <div className="flex flex-col items-center content-center justify-center w-full bg-opacity-50 bg-light ">

                        <h2 className="w-full m-8 text-4xl font-semibold text-center text-dark dark:text-primary">
                            Interessé par mon travail ?
                        </h2>
                        <ButtonsCardSecondary
                            text="Contactez moi !"
                            href="mailto:thomas.pedot@gmail.com"
                        />
                    </div>
                </div>
            </div >
        </>
    );
}
