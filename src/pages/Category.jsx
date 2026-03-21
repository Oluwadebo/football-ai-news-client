import React from "react";
import { useParams, Link } from "react-router-dom";
import ArticleCard from "../components/common/ArticleCard";

const CategoryPage = ({ articles }) => {
  const { category } = useParams();

  // Updated filter logic to be more flexible (e.g., "club" matches "club-news")
  const filteredArticles = articles.filter((article) => {
    const categoryLower = category?.toLowerCase();
    const eventTypeLower = article.eventType.toLowerCase();

    return (
      eventTypeLower === categoryLower ||
      eventTypeLower.includes(categoryLower) || // This allows "club" to match "club-news"
      article.tags.some((tag) => tag.toLowerCase() === categoryLower)
    );
  });

  return (
    <div className="container py-5">
      <div className="mb-5 border-bottom border-secondary pb-4">
        <Link
          to="/"
          className="text-success text-decoration-none fw-black text-uppercase x-small tracking-widest mb-3 d-inline-block"
        >
          &larr; Return to Intelligence Feed
        </Link>
        <h1 className="display-3 fw-black text-uppercase italic tracking-tighter mb-0">
          Sector: <span className="text-success">{category}</span>
        </h1>
        <p className="text-secondary fw-bold text-uppercase tracking-widest small mt-2">
          {filteredArticles.length} Intel Reports Found
        </p>
      </div>

      <div className="row">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div className="col-12 py-5 text-center">
            {/* Debug Info (Only shows if empty) */}
            <h3 className="text-secondary fw-black text-uppercase italic">
              No Reports Found in the {category} Sector
            </h3>
            <p className="text-muted small">
              Check if eventType matches the URL parameter.
            </p>
            <Link
              to="/"
              className="btn btn-outline-success rounded-0 mt-4 fw-black text-uppercase px-4"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
