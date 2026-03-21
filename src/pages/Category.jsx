import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Filter } from "lucide-react";
import ArticleCard from "../components/common/ArticleCard";

export default function Category({ articles }) {
  const { category } = useParams();

  // Filter articles based on the eventType (Transfer, Match, Club, etc.)
  // const filteredArticles = articles.filter(
  //   (article) => article.eventType.toLowerCase() === category.toLowerCase(),
  // );
  const filteredArticles = articles.filter((article) => {
    const articleType = article.eventType.toLowerCase().replace(/[\s-]/g, "");
    const urlCategory = category.toLowerCase().replace(/[\s-]/g, "");

    return articleType === urlCategory;
  });

  return (
    <div className="bg-black min-vh-100 py-5">
      <div className="container">
        {/* Category Header */}
        <div className="d-flex align-items-center gap-3 mb-5 border-bottom border-secondary pb-4">
          <div className="bg-success p-2">
            <Filter size={24} className="text-black" />
          </div>
          <h1 className="display-5 fw-black text-uppercase italic tracking-tighter mb-0">
            {category} <span className="text-success">News</span>
          </h1>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="row g-4">
            {filteredArticles.map((article) => (
              <div key={article.id} className="col-12">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 border border-secondary border-dashed">
            <p className="text-secondary fw-bold text-uppercase tracking-widest mb-0">
              No articles found in this category yet.
            </p>
            <Link
              to="/"
              className="btn btn-outline-success btn-sm rounded-0 mt-4 px-4"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
