import { getAllPhotoProjects } from "@/sanity/queries/articles";
import { FeaturedPhotoProject } from "./FeaturedProject";
import { PhotoProject } from "./PhotoProject";


export default async function PhotoProjectLayout() {
    const allPhotoProjects = await getAllPhotoProjects()
    const photoProjects = allPhotoProjects.map((project) => {
        return {
            "type": project.featured,
            "title": project.title,
            "summary": project.description,
            "date": project._updatedAt,
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
                            <FeaturedPhotoProject
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
                            <PhotoProject
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
                {/* <FeaturedPhotoProject
                    type="Featured Project"
                    title="Crypto Screener Application"
                    summary="A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, React Router and Recharts. It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your local currency."
                    img={proj1}
                    link="https://devdreaming.com/videos/build-crypto-screener-app-with-react-tailwind-css"
                /> */}
                {/* <PhotoProject
                    type="Website Template"
                    title="NFT collection Website"
                    img={proj2}
                    link="https://devdreaming.com/videos/create-nft-collection-website-reactjs"
                />
                <PhotoProject
                    type="Website"
                    title="Fashion Studio Website"
                    img={proj3}
                    link="https://devdreaming.com/videos/build-stunning-fashion-studio-website-with-reactJS-locomotive-scroll-gsap"
                /> */}
                {/* <FeaturedPhotoProject
                    type="Portfolio Website"
                    title="React Portfolio Website"
                    summary="A professional portfolio website using React JS, Framer-motion, and Styled-components. It has smooth page transitions, cool background effects, unique design and it is mobile responsive."
                    img={proj4}
                    link="https://devdreaming.com/videos/build-stunning-portfolio-website-react-js-framer-motion"
                /> */}
                {/* <PhotoProject
                    type="Website Template"
                    img={proj5}
                    title="Agency Website Template"
                    link="https://devdreaming.com/videos/build-stunning-fashion-studio-website-with-reactJS-locomotive-scroll-gsap"
                />
                <PhotoProject
                    type="Blog Website"
                    img={proj6}
                    title="DevDreaming"
                    link="https://devdreaming.com"
                /> */}
            </div>
        </>
    );
}
