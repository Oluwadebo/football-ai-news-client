import React, { useState } from "react";
import ArticleCard from "../components/common/ArticleCard";

const NewsArchive = ({ allArticles }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="container-fluid bg-black min-vh-100 py-5 px-lg-5">
      {/* Archive Header */}
      <div className="border-bottom border-secondary pb-4 mb-5">
        <h1
          className="display-3 fw-black text-uppercase italic text-white mb-4"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          Intelligence <span className="text-success">Archive</span>
        </h1>

        {/* Search/Filter Bar */}
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg bg-dark border-secondary text-white rounded-0"
              placeholder="Filter by keyword or team..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="row g-4">
        {filtered.map((article) => (
          <div key={article.id} className="col-sm-6 col-md-4 col-xl-3">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArchive;
