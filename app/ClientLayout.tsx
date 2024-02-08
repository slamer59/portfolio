"use client"

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AnimatePresence } from "framer-motion";
import "../styles/globals.css";
// pages/_app.js
import { Montserrat } from "next/font/google";
import Head from "next/head";

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-mont" });

export default function App({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${montserrat.variable} pt-20 font-mont  bg-light dark:bg-dark w-full min-h-screen h-full`}
      >
        <Navbar />
        <AnimatePresence initial={false} mode="wait">
          {children}
        </AnimatePresence>
        <Footer />
      </main>
    </>
  );
}
