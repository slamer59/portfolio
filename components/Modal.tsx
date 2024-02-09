// "use client"

import type { ImageProps } from "@/lib/types";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./Photo/SharedModal";

export default function Modal({
  photoId,
  images,
  returnTo,
  onClose,
}: {
  photoId: string;
  images: ImageProps[];
  returnTo: string;
  onClose: () => void;
}) {
  let overlayRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname()

  let index = Number(photoId);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    router.push(returnTo);
    onClose();
  }


  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    router.push(pathname)
    //`${pathname}?${createQueryString('photoId', `${newVal}`)}`)
  }

  useKeypress("ArrowRight", () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef as React.RefObject<HTMLDivElement>}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog >
  );
}
