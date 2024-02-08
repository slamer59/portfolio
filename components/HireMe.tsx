import Link from "next/link";
import { CircularText } from "./Icons";

export const HireMe = () => {
  return (
    <div className="fixed z-20 flex flex-col items-center justify-center overflow-hidden left-4 bottom-4">
      <div className="relative flex items-center justify-center w-48 h-auto md:w-24">
        <CircularText
          className={"fill-dark dark:fill-light animate-spin-slow duration-200"}
        />
        <Link
          href="mailto:thomas.pedot@gmail.com"
          className="flex items-center justify-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md border border-solid
bg-dark rounded-full text-white w-20 h-20 font-semibold hover:bg-light hover:border-dark hover:text-dark dark:text-dark dark:bg-light dark:hover:bg-dark
dark:hover:text-light dark:hover:border-light dark:shadow-light/25 md:w-12 md:h-12 md:text-[10px]
"
        >
          Contact!
        </Link>
      </div>
    </div>
  );
};


{/* <div className="fixed inline-block w-24 right-8 bottom-8 md:hidden">
<Image
  className="relative w-full h-auto"
  src={lightBulb}
  alt="Thomas PEDOT"
/>
</div> */}