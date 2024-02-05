"use client"

import { useLastViewedPhoto } from "@/lib/useLastViewedPhoto";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";

export default function Carousel({
  index,
  currentPhoto,
  images,
}: {
  index: number;
  currentPhoto, //: ImageProps;
  images, //: ImageProps[];
}) {
  const router = useRouter();
  const [, setLastViewedPhoto] = useLastViewedPhoto();

  function closeModal() {
    setLastViewedPhoto(currentPhoto.id);
    router.push("/", undefined, { shallow: true });
  }

  function changePhotoId(newVal: number) {
    return newVal;
  }

  useKeypress("Escape", () => {
    closeModal();
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 bg-black cursor-default backdrop-blur-2xl"
        onClick={closeModal}
      >
        <Image
          src={urlFor(currentPhoto).format("webp").url()}
          className="w-full h-full pointer-events-none"
          alt="blurred background"
          fill
          priority
        />
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  );
}
