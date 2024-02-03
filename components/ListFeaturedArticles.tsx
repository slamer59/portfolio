import { FeaturedArticle } from "@/components/FeaturedArticle";
import { urlFor } from "@/sanity/lib/client";

// import TransitionEffect from "components/TransitionEffect";
export function ListFeaturedArticles({ articles }: { articles: any }) {
  return (

    <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
      {articles &&
        articles.map((article, index) => <FeaturedArticle
          key={index}
          img={urlFor(article.mainImage).url()}
          title={article.title}
          time={article.readingTime || "8 min read"}
          summary={article.description}
          link={`/articles/${article.currentSlug}`} />
        )}
    </ul>

  );
}
