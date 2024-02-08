"use client"

import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Link from "next/link";


export const metadata = {
  title: "Page non trouvée",
  description: "La page que vous cherchez n'existe pas. Vous pouvez retourner à la page principale.",
  openGraph: {
    title: "Page non trouvée",
    description: "La page que vous cherchez n'existe pas. Vous pouvez retourner à la page principale.",
    type: "website",
  },
  twitter: {
    title: "Page non trouvée",
    description: "La page que vous cherchez n'existe pas. Vous pouvez retourner à la page principale.",
  }
}
const NotFound = () => {
  return (
    <>

      <TransitionEffect />
      <Layout className="h-[75vh] w-full dark:bg-dark  relative !bg-transparent !pt-16 flex flex-col items-center justify-center">
        <AnimatedText text="404" className="" />
        <AnimatedText
          text="Page Not Found."
          className=" !text-7xl "
        />
        <Link
          href="/"
          className="self-center !mt-4 inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2
        font-semibold text-light hover:border-dark hover:bg-light hover:text-dark 
        dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
        "
        >
          Allez à la page principale
        </Link>
      </Layout>
    </>
  );
};

export default NotFound;
