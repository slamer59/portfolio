import { getAllPhotoProjects } from "@/sanity/queries/articles";
import { AlbumProject } from "./AlbumProject";
import { FeaturedAlbumProject } from "./FeaturedAlbum";

export default async function PhotoProjectLayout() {
    const allPhotoProjects = await getAllPhotoProjects()

    const photoProjects = allPhotoProjects.map((project) => {
        return {
            "type": project.featured,
            "title": project.title,
            "summary": project.description,
            "date": project.publishedAt,
            "img": {
                "asset": project.mainImage.asset[0],
                "dimensions": project.mainImage.dimensions[0],
                "lqip": project.mainImage.lqip[0],
            },
            "link": `/photographie/${project.currentSlug}`
        }
    }
    )

    return (
        <>
            <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
                {photoProjects.map((project, index) => {
                    if (project.type === true) {
                        return (
                            <FeaturedAlbumProject
                                title={project.title}
                                summary={project.summary}
                                date={project.date}
                                img={project.img}
                                link={project.link}
                                key={index}
                            />
                        )
                    } else {
                        return (
                            <AlbumProject
                                title={project.title}
                                summary={project.summary}
                                date={project.date}
                                img={project.img}
                                link={project.link}
                                key={index}
                            />
                        )
                    }
                })}
            </div>
        </>
    );
}
