"use client"

import { motion } from "framer-motion";
import { MovingImg } from "./MovingImg";

export const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative flex items-center justify-between w-full p-4 py-6 my-2 border border-b-4 border-r-4 border-solid rounded-xl sm:flex-col bg-light text-dark first:mt-0 border-dark dark:bg-dark dark:border-light "
    >
      <MovingImg img={img} title={title} link={link} />
      <span className="pl-4 font-semibold text-primary dark:text-primaryDark min-w-max sm:self-start sm:pl-0 xs:text-sm">
        {date}
      </span>
    </motion.li>
  );
};
