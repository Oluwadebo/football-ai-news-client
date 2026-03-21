import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const handleImageError = (e, id) => {
    const target = e.target;
    if (!target.src.includes("picsum.photos")) {
      target.src = `https://picsum.photos/seed/${id}/400/225`;
    }
  };

  if (!article) return null;

  return (
    <div className="h-100">
      <Link
        to={`/article/${article.id}`}
        className="text-decoration-none group"
      >
        {/* THE CARD CONTAINER */}
        <div
          className="card border-0 rounded-1 h-100 transition-all duration-300 hover-translate-y"
          style={{
            backgroundColor: "#111111", // Slightly lighter than pure black to create the "card"
            overflow: "hidden",
          }}
        >
          {/* IMAGE SECTION */}
          <div className="position-relative overflow-hidden">
            <img
              src={
                article.imageUrl ||
                `https://picsum.photos/seed/${article.id}/400/225`
              }
              className="w-100 object-fit-cover transition-transform duration-700 group-hover-scale"
              style={{ height: "200px" }}
              alt={article.title}
              onError={(e) => handleImageError(e, article.id)}
            />

            {article.isTrending && (
              <span
                className="position-absolute top-0 start-0 m-3 badge bg-danger text-uppercase fw-black italic px-2 py-2"
                style={{ fontSize: "10px", borderRadius: "2px", zIndex: 2 }}
              >
                Trending
              </span>
            )}

            {/* Subtle Gradient Overlay on Image */}
            <div className="position-absolute bottom-0 start-0 w-100 h-50 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* CARD CONTENT */}
          <div className="card-body px-3 py-3">
            {/* TAGS */}
            <div className="mb-2 d-flex flex-wrap gap-2">
              {article.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-success fw-black text-uppercase tracking-widest"
                  style={{ fontSize: "13px", borderBottom: "1px solid #198754" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* TITLE */}
            <h5
              className="text-white fw-black text-uppercase italic mb-2 group-hover-text-success transition-colors"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "1.15rem",
                lineHeight: "1.1",
                letterSpacing: "-0.01em",
              }}
            >
              {article.title}
            </h5>

            {/* SUMMARY */}
            <p
              className="text-secondary mb-0 line-clamp-2 opacity-50 fw-medium"
              style={{ fontSize: "13px", lineHeight: "1.4" }}
            >
              {article.summary}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
