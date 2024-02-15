import { urlFor } from "@/sanity/lib/client";
import { Article } from "./Article";

export function ListArticles({ articles }: { articles: any }) {

  return (
    <ul className="relative flex flex-col items-center">
      {articles &&
        articles.map((article, index) => <Article
          key={index}
          title={article.title}
          img={urlFor(article.mainImage).format("webp").url()}
          date={`${new Date(article.publisedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`}
          link={`/articles/${article.currentSlug}`}
          summary={article.description}
        />
        )}
    </ul>
  );
}