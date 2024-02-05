"use client";

import { motion } from "framer-motion";
import { MovingImg } from "./MovingImg";

export const Article = ({ img, title, summary, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative items-center justify-between w-full p-4 py-6 my-2 border border-b-4 border-r-4 border-solid sm:flex-row rounded-xl bg-light text-dark dark:text-light first:mt-0 border-dark dark:bg-dark dark:border-light"
    >
      <div className="relative flex items-center justify-between w-full my-2 sm:flex-row first:mt-0">
        <MovingImg img={img} title={title} link={link} />
        <span className="pl-4 font-semibold text-primary dark:text-primaryDark min-w-max sm:self-start sm:pl-0 xs:text-sm">
          {date}
        </span>
      </div>
      <p className="mb-2 text-sm ">{summary}</p>
    </motion.li>
  );
};
