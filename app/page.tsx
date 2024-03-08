

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
            <div className="container z-50">
                <div className="container flex flex-row items-center gap-6 sm:flex-col md:flex-row max-w-8xl">
                    <div className="w-1/3 sm:w-full md:w-full">
                        <AnimatedText
                            text="Immortaliser l'instant présent, savourer chaque moment."
                            // text=" Un monde de photos !"
                            className="mb-16 lg:!text-4xl md:!text-4xl !leading-tight sm:mb-8 sm:!text-3xl xs:!text-4xl"
                        >
                            <h2 className="mb-4 text-xl text-center dark:text-light">
                                Toujours en quête de nouvelles perspectives à travers l'<span className="font-bold text-primary dark:text-lime-500">objectif</span> de mon appareil photo ou les lignes de code, je m'efforce de marier l'art et la technologie pour donner vie à des <span className="font-bold text-primary dark:text-lime-500">projets uniques et inspirants</span>.
                            </h2>
                        </AnimatedText>
                        <div className="flex flex-row items-center justify-center gap-2 m-4 lg:flex-col xl:flex-col md:justify-start">
                            <ButtonsCardPrimary text="Lire mes articles" href="/articles" />
                            <ButtonsCardSecondary text="Regarder mes photos" href="/photographie" />
                        </div>
                    </div>
                    <div className="flex justify-center w-2/3 md:w-full sm:w-full md:justify-end">
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
        </>
    );
}
