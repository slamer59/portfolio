"use client"

import { motion } from "framer-motion";

const quote = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const AnimatedText = ({ text, className = "", isSection = false, children }: { text: string, className: string, isSection?: boolean, children?: React.ReactNode }) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full py-2 mx-auto overflow-hidden sm:py-0 ${isSection ? 'text-left' : 'text-center'}`} >
      <motion.h1
        className={`${className} inline-block text-dark dark:text-light font-bold w-full text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-6xl 2xl:text-6xl`}
        variants={quote}
        initial="hidden"
        animate="visible"
      >
        {text.split(" ").map((char, index) => {
          return (
            <motion.span
              className="inline-block"
              key={char + "-" + index}
              variants={singleWord}
            >
              {char}&nbsp;
            </motion.span>
          );
        })}
      </motion.h1>
      {children}
    </div >
  );
};

export default AnimatedText;
