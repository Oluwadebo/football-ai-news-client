import React, { useState, useMemo } from "react";
import ArticleCard from "../components/common/ArticleCard";

const NewsArchive = ({
  articles = [],
  currentPage = 1,
  paginationInfo = {},
  onPageChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized filtering for better performance
  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return articles;

    const term = searchTerm.toLowerCase().trim();
    return articles.filter(
      (a) =>
        a.title?.toLowerCase().includes(term) ||
        a.tags?.some((t) => t.toLowerCase().includes(term)),
    );
  }, [articles, searchTerm]);

  const {
    totalPages = 1,
    totalArticles = 0,
    hasNext = false,
    hasPrev = false,
  } = paginationInfo;

  const generatePageNumbers = (current, total) => {
    const pages = [];
    const delta = 2;

    pages.push(1);

    if (current > delta + 2) pages.push("...");

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      pages.push(i);
    }

    if (current < total - delta - 1) pages.push("...");

    if (total > 1 && pages[pages.length - 1] !== total) {
      pages.push(total);
    }

    return pages;
  };

  return (
    <div className="container-fluid bg-black min-vh-100 py-5 px-lg-5">
      <div className="border-bottom border-secondary pb-4 mb-5">
        <h1
          className="display-3 fw-black text-uppercase italic text-white mb-4"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Intelligence <span className="text-success">Archive</span>
        </h1>

        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg bg-dark border-secondary text-white rounded-0"
              placeholder="Filter by keyword or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <p className="text-secondary mb-0">
          Showing {filtered.length} of {totalArticles} articles — Page{" "}
          {currentPage} of {totalPages}
          {searchTerm && ` (filtered by "${searchTerm}")`}
        </p>
      </div>

      <div className="row g-4 mb-5">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <div
              key={article.id}
              className="col-12 col-md-4 col-lg-3 col-xl-3 col-xxl-2"
            >
              <ArticleCard article={article} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4 className="text-secondary">No articles match your search</h4>
            <p className="text-muted">
              Try clearing the filter or changing page
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mt-5">
          <button
            className="btn btn-outline-success rounded-0 px-4 py-2"
            disabled={!hasPrev}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>

          {generatePageNumbers(currentPage, totalPages).map((page, index) => (
            <button
              key={index}
              className={`btn rounded-0 px-3 py-2 fw-bold ${
                page === currentPage
                  ? "btn-success text-black"
                  : "btn-outline-secondary text-white"
              }`}
              disabled={page === "..." || page === currentPage}
              onClick={() => typeof page === "number" && onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-outline-success rounded-0 px-4 py-2"
            disabled={!hasNext}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsArchive;
