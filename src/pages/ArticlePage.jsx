import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Share2, Tag } from "lucide-react";
import { format } from "date-fns";
import ArticleCard from "../components/common/ArticleCard"; // Adjusted path to your new folders

const ArticlePage = ({ articles }) => {
  const { id } = useParams();

  // Defensive check: If articles isn't an array yet, don't crash
  const article = articles?.find((a) => a.id === id);
  const related = articles?.filter((a) => a.id !== id).slice(0, 3);

  // Simplified image error handler for JavaScript
  const handleImageError = (e, articleId) => {
    const target = e.target;
    if (!target.src.includes("picsum.photos")) {
      target.src = `https://picsum.photos/seed/${articleId}/1200/675`;
    }
  };

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="container py-5 text-center bg-black text-white min-vh-100">
        <h2 className="display-1 fw-black">404</h2>
        <p className="text-secondary fw-bold text-uppercase tracking-widest">
          Article not found
        </p>
        <Link to="/" className="btn btn-outline-success mt-4">
          BACK TO FEED
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-vh-100">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Navigation Back Link */}
            <Link
              to="/"
              className="text-success text-decoration-none fw-black text-uppercase small tracking-widest mb-5 d-inline-block"
            >
              &larr; BACK TO FEED
            </Link>

            <header className="mb-5">
              <div className="mb-4">
                {article.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-success fw-black text-uppercase small tracking-widest me-3"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1
                className="display-2 fw-black text-uppercase italic mb-4 tracking-tighter"
                style={{ fontFamily: "'Anton', sans-serif", lineHeight: "0.9" }}
              >
                {article.title}
              </h1>
              <div className="d-flex align-items-center gap-4 text-secondary small fw-bold text-uppercase tracking-widest border-top border-secondary pt-4">
                <span>
                  {article.publishedAt
                    ? format(new Date(article.publishedAt), "MMMM dd, yyyy")
                    : "Today"}
                </span>
                <span className="text-success">•</span>
                <span>{article.eventType || "Analysis"}</span>
              </div>
            </header>

            {/* Featured Hero Image */}
            <div className="position-relative mb-5">
              <img
                src={
                  article.imageUrl ||
                  `https://picsum.photos/seed/${article.id}/1200/675`
                }
                className="img-fluid w-100 object-fit-cover shadow-lg"
                style={{ maxHeight: "600px" }}
                alt={article.title}
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, article.id)}
              />
              <div className="position-absolute bottom-0 start-0 bg-success text-black fw-black text-uppercase px-3 py-2 small m-4">
                Exclusive Coverage
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-9">
                {/* Main Article Content */}
                <div
                  className="article-content fs-4 text-light opacity-90 mb-5"
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.6",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {article.content}
                </div>

                {/* Interaction Buttons */}
                <div className="d-flex gap-3 mb-5">
                  <button className="btn btn-outline-secondary rounded-0 flex-grow-1 fw-black text-uppercase small py-3">
                    <Share2 size={18} className="me-2" /> Share
                  </button>
                  <button className="btn btn-outline-secondary rounded-0 flex-grow-1 fw-black text-uppercase small py-3">
                    <Tag size={18} className="me-2" /> Save
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-secondary my-5" />

            {/* Related Stories Section */}
            <section>
              <h2
                className="display-6 fw-black text-uppercase italic mb-5 tracking-tighter"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                Related <span className="text-success">Stories</span>
              </h2>
              <div className="row">
                {related?.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
