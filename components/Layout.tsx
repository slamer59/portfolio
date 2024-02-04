import lightBulb from "@/public/images/svgs/miscellaneous_icons_1.svg";

import Image from 'next/image';
import { HireMe } from './HireMe';

const Layout = ({ children, className = "" }) => {
  return (
    <>
    <div
      className={`z-0 inline-block h-full w-full bg-light p-32 dark:bg-dark xl:p-24 lg:p-16 
      md:p-12 sm:p-8 ${className}`}
    >
      {children}
    </div>
            <HireMe />
            <div className="fixed inline-block w-24 right-8 bottom-8 md:hidden">
              <Image
                className="relative w-full h-auto"
                src={lightBulb}
                alt="Thomas PEDOT"
              />
            </div>
</>    
  );
};

export default Layout;
