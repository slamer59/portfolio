import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { ListFeaturedArticles } from "@/components/ListFeaturedArticles";
import { getFeaturedArticles } from "@/sanity/queries/articles";
import TransitionEffect from "components/TransitionEffect";
import Head from "next/head";
export default async function Articles() {
  const featuredArticles = await getFeaturedArticles();

  return (
    <>
      <Head>
        <title>Simple Portfolio Built with Nextjs | Articles Page</title>
        <meta
          name="description"
          content="Browse through CodeBucks's collection of software engineering articles and 
        tutorials on Next.js, React.js, web development, and more. 
        Gain valuable insights and stay up-to-date with SEO tips for building a developer portfolio."
        />
      </Head>
      <TransitionEffect />
      <main
        className={`w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Words Can Change the World!"
            className="!text-8xl !leading-tight mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <ListFeaturedArticles articles={featuredArticles} />

          <h2 className="w-full my-16 mt-32 text-4xl font-bold text-center">
            Tous les articles
          </h2>

          {/* <ul className="relative flex flex-col items-center">
            <Article
              title="form validation in reactjs: build a reusable custom hook for inputs and error handling"
              img={blog3}
              date="January 27, 2023"
              link="https://devdreaming.com/blogs/react-form-validation-custom-hook"
            />
            <Article
              title="silky smooth scrolling in reactjs: a step-by-step guide for react developers"
              img={blog4}
              date="January 30, 2023"
              link="https://devdreaming.com/blogs/smooth-scrolling-in-react-js"
            />
            <Article
              title="creating an efficient modal component in react using hooks and portals"
              img={blog5}
              date="January 29, 2023"
              link="https://devdreaming.com/blogs/create-efficient-modal-react-portals"
            />
            <Article
              title="build a fabulous todo list app with react, redux and framer-motion"
              img={blog6}
              date="January 28, 2023"
              link="https://devdreaming.com/blogs/build-react-redux-framer-motion-todo-app"
            />
            <Article
              title="redux simplified: a beginner's guide for web developers"
              img={blog7}
              date="January 31, 2023"
              link="https://devdreaming.com/blogs/redux-simply-explained"
            />
            <Article
              title="what is higher order component (hoc) in react?"
              date="January 4, 2023"
              img={blog8}
              link="https://devdreaming.com/blogs/higher-order-component-hoc-react"
            />
          </ul> */}
        </Layout>
      </main>
    </>
  );
}
