import {
    motion,
    useScroll,
} from "framer-motion";
import { useRef } from "react";
import LiIcon from "./LiIcon";

const detailsData =[
  {
    position: "Chief Technical Officer",
    company: "Jokosun",
    companyLink: "https://www.jokosun.com",
    time: "September 2021 - Present (2 years 5 months)",
    address: "Toulouse, Occitanie, France",
    work: "Responsible for all activities related to the Jokosun solar technology roadmap and Research & Development programs. Provide industry level insight and vision on technology trends. Drive scientific direction of the business unit to seek out and evaluate new technology, conduct feasibility testing and proof of concept, oversee product development process. Manage, implement, and ensure usability of information and computer technologies. Analyze various technologies' benefits for the company and integrate systems to realize improvements. Focus on EasyEnergyEverywhere."
  },
  {
    position: "Powerplant Computational Physics Methods and Tools",
    company: "Airbus",
    companyLink: "https://www.airbus.com",
    time: "October 2019 - Present (4 years 4 months)",
    address: "Toulouse, France",
    work: "Define high-level design choices related to overall system structure and behavior in systems such as legacy information extraction from documents. Provide insights on DevOps setup. Balance between IT architecture definition and development with technologies like Kubernetes, Docker, Python, and NodeJS. Embrace a full end-to-end vision on digital topics."
  },
  {
    position: "Head of Numerical Method for Fluid Mechanics",
    company: "boostHEAT",
    companyLink: "https://www.boostheat-group.com/fr/",
    time: "March 2015 - October 2019 (4 years 8 months)",
    address: "Ramonville-Saint-Agne",
    work: "Developed efficient heating and hot water systems fueled by natural gas and renewable energy. Led detailed knowledge acquisition about thermodynamic cycles and fluid flow control. Implemented simulation tools including CFD, Modelica, Digital Lab, and continuous technological intelligence using Machine Learning. Focused on reproducible research and multidisciplinary design optimization."
  },
  {
    position: "Thermal Engineer in R&D Fields",
    company: "EPSILON Ingénierie",
    companyLink: "https://www.epsyl-alcen.com/en",
    time: "February 2012 - February 2015 (3 years 1 month)",
    address: "Toulouse",
    work: "In charge of developing coupling solutions between CFD software and Thermal software with autonomy. Tested Open Source technologies like OpenFOAM, OpenModelica, SALOME, CANTERA. Supervised thermal simulations support for industrial engines design. Wrote technical reports and specifications. Developed multi-physics code coupling interface for thermal analysis of systems."
  },
  {
    position: "PhD: Modelling of the coupling between combustion and fouling inside furnace pipes",
    company: "CERFACS",
    companyLink: "https://cerfacs.fr/",
    time: "October 2008 - February 2012 (3 years 5 months)",
    address: "Toulouse",
    work: "Researched fouling in crude oil processing, focusing on heat exchanger performance degradation due to deposits formation. Developed a solid background in heat transfer phenomena. Collaborated with TOTAL group. Enhanced CERFACS codes for efficient coupling in parallel architecture."
  },
  {
    position: "Topology analysis and Optimization of Double Swirl Burner in a combustion Chamber",
    company: "Turbomeca | Safran Helicopter Engine",
    companyLink: "https://www.safran-group.com/companies/safran-helicopter-engines",
    time: "May 2008 - September 2008 (5 months)",
    address: "Toulouse",
    work: "Developed tools to predict Swirl Number of a Double Swirl Burner. Improved topology using RANS and LES codes."
  },
  {
    position: "Realisation of a graphic interface",
    company: "CERFACS",
    companyLink: "https://cerfacs.fr/",
    time: "February 2007 - March 2007 (2 months)",
    address: "Toulouse",
    work: "Developed a graphic interface in Tcl/Tk for an Acoustic codes."
  }
];
const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="text-2xl font-bold capitalize sm:text-xl xs:text-lg">
          {position}{" "}
          <a
            className="capitalize text-primary dark:text-primaryDark"
            href={companyLink}
            // target={"_blank"}
          >
            @{company}
          </a>
        </h3>
        <span className="font-medium capitalize text-dark/75 dark:text-light/50 xs:text-sm">
          {time} | {address}
        </span>
        <p className="w-full font-medium md:text-sm"> {work}</p>
      </motion.div>
    </li>
  );
};


const Experience = () => {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (

      <div className="my-64">
        <h2 className="w-full mb-32 font-bold text-center text-8xl md:text-6xl xs:text-4xl md:mb-16">
          Experience
        </h2>

        <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
          <motion.div
            className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark 
            origin-top  dark:bg-primaryDark dark:shadow-3xl"
            style={{ scaleY: scrollYProgress }}
          />
          <ul className="flex flex-col items-start justify-between w-full ml-4 xs:ml-2">
          {detailsData.map((details) => (
            <Details
              position={details.position}
              company={details.company}
              companyLink={details.companyLink}
              time={details.time}
              address={details.address}
              work={details.work}
            />
            ))}
          </ul>
        </div>
        </div>
    );
};

export default Experience;
