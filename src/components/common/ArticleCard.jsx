import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function ArticleCard({ article }) {
  return (
    <Link to={`/article/${article.id}`} className="text-decoration-none group">
      <div className="row g-0 bg-dark border border-secondary hover-translate-y overflow-hidden">
        <div className="col-md-4">
          <img
            src={article.imageUrl}
            className="w-100 h-100 object-fit-cover group-hover-scale"
            alt={article.title}
          />
        </div>
        <div className="col-md-8 p-4 d-flex flex-column justify-content-center">
          <div className="d-flex align-items-center gap-2 mb-2 text-success x-small fw-black text-uppercase">
            <span>{article.eventType}</span>
            <span className="text-secondary">•</span>
            <span className="text-secondary">
              {format(new Date(article.publishedAt), "MMM dd, yyyy")}
            </span>
          </div>
          <h3 className="h4 fw-black text-uppercase italic tracking-tighter text-white mb-2 group-hover-text-success transition">
            {article.title}
          </h3>
          <p className="text-secondary small mb-0 line-clamp-2">
            {article.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
