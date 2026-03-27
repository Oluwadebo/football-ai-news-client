// src/pages/Category.jsx
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleCard from "../components/common/ArticleCard";

const Category = ({ articles = [] }) => {
  const { category } = useParams();

  const filteredArticles = useMemo(() => {
    if (!category) return articles;

    const cat = category.toLowerCase().trim();

    return articles.filter((article) => {
      const type = (article.eventType || "").toLowerCase();
      const tags = article.tags?.map((t) => t.toLowerCase()) || [];
      const title = (article.title || "").toLowerCase();

      return (
        type === cat ||
        type.includes(cat) ||
        tags.includes(cat) ||
        title.includes(cat)
      );
    });
  }, [articles, category]);

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

      <div className="row g-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="col-md-4">
              <ArticleCard article={article} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h3 className="text-secondary fw-black text-uppercase italic">
              No Reports Found in the {category} Sector
            </h3>
            <Link to="/" className="btn btn-outline-success rounded-0 mt-4">
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
