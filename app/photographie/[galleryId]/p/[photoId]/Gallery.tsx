"use client"

import Modal from "@/components/Modal";
import { useLastViewedPhoto } from "@/lib/useLastViewedPhoto";
import { useEffect, useRef } from "react";

// async function getImages(params) {
//   return galleryImageData
// }

export default function Gallery({ galleryImageData, galleryData, photoId
}) {
    console.log("🚀 ~ galleryData:", galleryData)

    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
            setLastViewedPhoto(null);
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

    // const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;
    return (
        <>
            {photoId && (
                <Modal
                    images={galleryData.gallery.images}
                    returnTo={`/photographie/${galleryData.slug.current}`}
                    onClose={() => {
                        setLastViewedPhoto(Number(photoId));
                    }} />
            )}
            {/* <Carousel images={galleryData.gallery.images} currentPhoto={galleryImageData.image[0]} index={Number(photoId)} /> */}
        </>
    );
}
