
import { devProject } from "portfolio.config";
import { DevProject } from "./DevProject";
import { FeaturedDevProject } from "./FeaturedDevProject";

export default async function DevProjectLayout() {
    return (
        <>
            <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
                {devProject.map((project, index) => {
                    if (project.featured === true) {
                        return (
                            <FeaturedDevProject
                                title={project.title}
                                type={project.type}
                                summary={project.summary}
                                date={project.date}
                                img={project.img}
                                link={project.link}
                                github={project.github}
                                technologies={project.technologies}
                                key={index}
                            />
                        )
                    } else {
                        return (
                            <DevProject
                                title={project.title}
                                type={project.type}
                                summary={project.summary}
                                date={project.date}
                                img={project.img}
                                link={project.link}
                                github={project.github}
                                technologies={project.technologies}
                                key={index}
                            />
                        )
                    }
                })}
            </div>
        </>
    );
}
