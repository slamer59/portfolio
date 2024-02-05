import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import AboutIcon from "./LiIcon";

const educationData = [
  {
    type: "PhD",
    time: "2008 - 2011",
    place: "University of Toulouse",
    info: "Energy transfers: Focused on studying energy transfers, specifically in the context of the research topic.",
  },
  {
    type: "Ingénieur",
    time: "2005 - 2008",
    place: "ENSEEIHT",
    info: "Hydraulique et mécanique des fluides (Energie): Specialized in hydraulic and fluid mechanics with a focus on energy-related applications.",
  },
  {
    type: "Master",
    time: "2008",
    place: "University of Toulouse",
    info: "Dynamique des Fluides, Energétique et Transferts (DET): Studied fluid dynamics, energetics, and transfers as part of the master's program.",
  },
  {
    type: "Exchange Erasmus",
    time: "2007",
    place: "TU Hamburg-Harburg",
    info: "Energie et Mécanique des Fluides: Participated in an exchange program at TU Hamburg-Harburg, focusing on energy and fluid mechanics.",
  },
];

const Details = ({ type, time, place, info }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <AboutIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="text-2xl font-bold capitalize sm:text-xl xs:text-lg">
          {type}
        </h3>
        <span className="font-medium capitalize text-dark/75 dark:text-light/50 xs:text-sm">
          {time} | {place}
        </span>
        <p className="w-full font-medium md:text-sm">{info}</p>
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-64">
      <h2 className="w-full mb-32 font-bold text-center text-8xl md:text-6xl xs:text-4xl md:mb-16">
        Education
      </h2>

      <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark  origin-top rounded-full dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />
        <ul className="flex flex-col items-start justify-between w-full ml-4">
          {educationData.map((details, index) => (
            <Details
              key={index}
              type={details.type}
              time={details.time}
              place={details.place}
              info={details.info}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Education;
