"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';


let MotionLink = motion(Link);

const Logo = () => {

  return (
    <div
      className='flex flex-col items-center justify-center mt-2'>
      <MotionLink href="/"
        className='flex items-center justify-center w-16 h-16 text-2xl font-bold text-white rounded-full bg-dark dark:border-2 dark:border-solid dark:border-light'
        whileHover={{
          backgroundColor: [
            "#080A40",
            "#59082E",
            "#010326",
            "#D9CEB0",
            "#F2935C",
            "#D95D41",
            "#000",
            "#FFC745"
          ],
          transition: { duration: 1, repeat: Infinity }
        }}
      >TP</MotionLink>
    </div>
  )
}

export default Logo