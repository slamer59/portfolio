import { DevProject } from "./DevProject";
import { FeaturedDevProject } from "./FeaturedDevProject";

// https://seeklogo.com/search?q=dagster
const devProject = [
    {
        "featured": true,
        "type": "portfolio",
        "title": "mage-ai",
        "summary": "The modern replacement for Airflow. Build, run, and manage data pipelines for integrating and transforming data.",
        "date": "2023-11-16",
        "img": "",
        "link": "",
        "github": "https://github.com/mage-ai/mage-ai",
        "technologies": ["python"],
        "license": "Apache License 2.0"
    },
    {
        "featured": false,
        "type": "portfolio",
        "title": "langcorn",
        "summary": "Serving LangChain LLM apps automatically with FastApi.",
        "date": "2023-08-24",
        "img": "",
        "link": "",
        "github": "https://github.com/msoedov/langcorn",
        "technologies": ["python"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "portfolio",
        "title": "dagster-meltano",
        "summary": "A Dagster plugin that allows you to run Meltano in Dagster.",
        "date": "2023-01-15",
        "img": "",
        "link": "",
        "github": "https://github.com/quantile-development/dagster-meltano",
        "technologies": ["python", "dagster", "nextjs"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "portfolio",
        "title": "hvplot_panel",
        "summary": "Combine hvplot graphs with panel functionalities.",
        "date": "2022-12-27",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["jupyter"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "portfolio",
        "title": "saleor",
        "summary": "A modular, high performance, headless e-commerce platform built with python, GraphQL, Django, and React.",
        "date": "2022-02-09",
        "img": "",
        "link": "",
        "github": "https://github.com/saleor/saleor",
        "technologies": ["python"],
        "license": "Not specified"
    },
    {
        "featured": false,
        "type": "documentation",
        "title": "documentation",
        "summary": "Strapi Documentation mono-repo.",
        "date": "2022-04-27",
        "img": "",
        "link": "",
        "github": "https://github.com/strapi/documentation",
        "technologies": ["javascript"],
        "license": "Other"
    },
    {
        "featured": false,
        "type": "private",
        "title": "cash-flow-dashboard",
        "summary": "",
        "date": "2022-04-03",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["html"],
        "license": ""
    },
    {
        "featured": false,
        "type": "private",
        "title": "helm-chart-viz",
        "summary": "",
        "date": "2022-03-23",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["python"],
        "license": ""
    },
    {
        "featured": false,
        "type": "public",
        "title": "dagster-argocd-configuration",
        "summary": "",
        "date": "2022-02-23",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["mustache"],
        "license": ""
    },
    {
        "featured": false,
        "type": "private",
        "title": "openxml-document",
        "summary": "Parser for docx with schema and xsdata",
        "date": "2022-02-19",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["python"],
        "license": ""
    },
    {
        "featured": false,
        "type": "public",
        "title": "strapi-docker",
        "summary": "Install and run your first Strapi project using Docker.",
        "date": "2022-02-12",
        "img": "",
        "link": "",
        "github": "https://github.com/strapi/strapi-docker",
        "technologies": ["javascript", "docker"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "public",
        "title": "dagster",
        "summary": "A data orchestrator for machine learning, analytics, and ETL.",
        "date": "2022-01-27",
        "img": "",
        "link": "",
        "github": "https://github.com/dagster-io/dagster",
        "technologies": ["python", "dagster"],
        "license": "Apache License 2.0"
    },
    {
        "featured": false,
        "type": "template",
        "title": "api-platform",
        "summary": "Create REST and GraphQL APIs, scaffold Jamstack webapps, stream changes in real-time.",
        "date": "2021-12-24",
        "img": "",
        "link": "",
        "github": "https://github.com/api-platform/api-platform",
        "technologies": ["typescript"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "public",
        "title": "xmldiff",
        "summary": "A library and command line utility for diffing xml",
        "date": "2021-11-26",
        "img": "",
        "link": "",
        "github": "https://github.com/Shoobx/xmldiff",
        "technologies": ["python"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "public",
        "title": "pdf2docxnogui",
        "summary": "Parse PDF file with PyMuPDF and generate docx with python-docx",
        "date": "2021-10-29",
        "img": "",
        "link": "",
        "github": "https://github.com/mateusmb/pdf2docxnogui",
        "technologies": ["python"],
        "license": "GNU General Public License v3.0"
    },
    {
        "featured": false,
        "type": "public",
        "title": "sphinx-material",
        "summary": "A material-based, responsive theme inspired by mkdocs-material",
        "date": "2021-10-06",
        "img": "",
        "link": "",
        "github": "https://github.com/bashtage/sphinx-material",
        "technologies": ["css"],
        "license": "Other"
    },
    {
        "featured": false,
        "type": "public",
        "title": "fastapi-crudrouter",
        "summary": "A dynamic FastAPI router that automatically creates CRUD routes for your models",
        "date": "2021-09-06",
        "img": "",
        "link": "",
        "github": "https://github.com/awtkns/fastapi-crudrouter",
        "technologies": ["python"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "public",
        "title": "scikit-decide",
        "summary": "AI framework for Reinforcement Learning, Automated Planning and Scheduling",
        "date": "2021-06-23",
        "img": "",
        "link": "",
        "github": "https://github.com/airbus/scikit-decide",
        "technologies": ["c++"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "public",
        "title": "dagster-multifilesprocessing",
        "summary": "Multifilesprocessing of documents",
        "date": "2021-05-22",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["python", "dagster"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "public",
        "title": "flowchartstorm",
        "summary": "Use of react-diagrams from stormproject",
        "date": "2021-05-12",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["javascript"],
        "license": ""
    },
    {
        "featured": false,
        "type": "public",
        "title": "dagster-central",
        "summary": "",
        "date": "2021-05-11",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["python", "dagster"],
        "license": ""
    },
    {
        "featured": false,
        "type": "public",
        "title": "dagster-another-user-code",
        "summary": "Test dagster-central",
        "date": "2021-05-10",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["python", "dagster"],
        "license": ""
    },
    {
        "featured": false,
        "type": "template",
        "title": "dagster-user-code",
        "summary": "",
        "date": "2021-05-09",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["python", "dagster"],
        "license": ""
    },
    {
        "featured": false,
        "type": "public",
        "title": "energies-domestique",
        "summary": "",
        "date": "2021-04-20",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["jupyter"],
        "license": "Apache License 2.0"
    },
    {
        "featured": false,
        "type": "public",
        "title": "energies_domestiques",
        "summary": "Setup Consumer for MQTT",
        "date": "2021-03-25",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["python"],
        "license": ""
    },
    {
        "featured": false,
        "type": "public",
        "title": "dagster-mlflow",
        "summary": "Trial for dagster - mlflow",
        "date": "2021-03-09",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["python", "dagster"],
        "license": "MIT License"
    },
    {
        "featured": false,
        "type": "public",
        "title": "awesome-panel",
        "summary": "A repository for sharing knowledge on Panel by HoloViz in order to build awesome analytics apps in python",
        "date": "2021-01-19",
        "img": "",
        "link": "",
        "github": "https://github.com/awesome-panel/awesome-panel",
        "technologies": ["jupyter"],
        "license": "Apache License 2.0"
    },
    {
        "featured": false,
        "type": "private",
        "title": "jetson-containers",
        "summary": "Small docker for Jetson Xavier",
        "date": "2020-12-20",
        "img": "",
        "link": "",
        "github": "",
        "technologies": ["Shell"],
        "license": "MIT License"
    }
]

export default async function DevProjectLayout() {
    return (
        <>
            <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
                {devProject.map((project, index) => {
                    if (project.featured === true) {
                        return (
                            <FeaturedDevProject
                                title={project.title}
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
