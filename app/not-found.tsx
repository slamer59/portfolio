"use client"

import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Awesome Portfolio Built with Nextjs | 404 Page </title>
        <meta
          name="description"
          content="Explore CodeBucks's Next.js developer portfolio and 
        discover the latest webapp projects and software engineering articles. 
        Showcase your skills as a full-stack developer and software engineer."
        />
      </Head>
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
