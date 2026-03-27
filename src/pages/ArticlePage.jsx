// src/pages/ArticlePage.jsx
import { format } from "date-fns";
import { Share2, Tag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "../components/common/ArticleCard";
import { API_URLS } from "../config/api";

const ArticlePage = ({ articles }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoized related articles
  const related = React.useMemo(() => {
    return articles?.filter((a) => a.id !== id && a._id !== id).slice(0, 3);
  }, [articles, id]);

  useEffect(() => {
    const found = articles?.find((a) => a.id === id || a._id === id);

    if (found) {
      setArticle(found);
      setLoading(false);
    } else {
      // Fallback: fetch single article directly
      fetch(`${API_URLS.articles}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setArticle(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    window.scrollTo(0, 0);
  }, [id, articles]);

  if (loading) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <h2 className="text-white">Loading article...</h2>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-5 text-center bg-black text-white min-vh-100">
        <h2 className="display-1 fw-black">404</h2>
        <p className="text-secondary">Article not found</p>
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
                style={{ fontFamily: "'Anton', sans-serif" }}
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

            {/* Featured Image */}
            <div className="position-relative mb-5">
              <img
                src={
                  article.imageUrl ||
                  `https://picsum.photos/seed/${article.id}/1200/675`
                }
                className="img-fluid w-100 object-fit-cover shadow-lg"
                style={{ maxHeight: "600px" }}
                alt={article.title}
                onError={(e) =>
                  (e.target.src = `https://picsum.photos/seed/${article.id}/1200/675`)
                }
              />
              <div className="position-absolute bottom-0 start-0 bg-success text-black fw-black text-uppercase px-3 py-2 small m-4">
                Exclusive Coverage
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div
                  className="article-content fs-4 text-light opacity-90 mb-5"
                  style={{ lineHeight: "1.7" }}
                >
                  {article.content}
                </div>

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

            {/* Related Stories */}
            <section>
              <h2
                className="display-6 fw-black text-uppercase italic mb-5 tracking-tighter"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                Related <span className="text-success">Stories</span>
              </h2>
              <div className="row g-4">
                {related?.map((a) => (
                  <div key={a.id} className="col-md-4">
                    <ArticleCard article={a} />
                  </div>
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
