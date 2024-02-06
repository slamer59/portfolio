import { getGalleryImageByIndex, getGalleryImages } from "@/sanity/queries/galleries";
import GalleryPage from "./GalleryPage";

// export async function generateStaticParams({
//   params,
// }: {
//   params: { galleryId: string };
// }) {
//   const imageRefs = await getGalleryImageRefs(params.galleryId)


//   let fullPaths = [];
//   for (let i = 0; i < imageRefs.length; i++) {
//     fullPaths.push({ params: { photoId: i.toString() } });
//   }

//   return {
//     paths: fullPaths,
//     fallback: false,
//   };

// return galleryData.gallery.images.map((image) => ({
//   params: { photoId: image.asset._ref },
// }))
// }

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export default async function ImageGalleryPage({
  params,
}: {
  params: { galleryId: string, photoId: string }
}) {
  let id = Number(params.photoId);
  const galleryImageData = await getGalleryImageByIndex(params.galleryId, id)
  const galleryData = await getGalleryImages(params.galleryId)

  // const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      {/* <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head> */}
      <main className="mx-auto max-w-[1960px] p-4">
        <GalleryPage galleryData={galleryData} galleryImageData={galleryImageData} photoId={params.photoId} />
      </main>
    </>
  );
}