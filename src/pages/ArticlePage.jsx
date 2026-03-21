import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Share2, Clock } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { format } from "date-fns";

export default function ArticlePage({ articles }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === id);

  // Reading progress bar logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-black text-uppercase italic">Article Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="btn btn-success rounded-0 mt-4"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Estimate reading time (Average 200 words per minute)
  const readingTime = Math.ceil(article.content.split(" ").length / 200);

  return (
    <div className="bg-black min-vh-100 pb-5">
      {/* Progress Bar */}
      <motion.div
        className="position-fixed top-0 start-0 end-0 bg-success z-3"
        style={{ height: "4px", scaleX, transformOrigin: "0%" }}
      />

      {/* Hero Header */}
      <header className="container py-5">
        <button
          onClick={() => navigate(-1)}
          className="btn text-secondary p-0 mb-4 d-flex align-items-center gap-2 hover-success"
        >
          <ArrowLeft size={20} />{" "}
          <span className="fw-bold text-uppercase small">Back to Feed</span>
        </button>

        <div className="row g-4 align-items-end">
          <div className="col-lg-8">
            <div className="d-flex gap-3 mb-3">
              <span className="badge bg-success text-black fw-black text-uppercase rounded-0 px-3 py-2">
                {article.eventType}
              </span>
              <div className="text-secondary d-flex align-items-center gap-2 small fw-bold">
                <Clock size={16} /> {readingTime} MIN READ
              </div>
            </div>
            <h1 className="display-4 fw-black text-uppercase italic tracking-tighter lh-1 mb-4">
              {article.title}
            </h1>
            <div className="d-flex align-items-center gap-4 text-secondary small fw-bold text-uppercase tracking-widest">
              <span className="d-flex align-items-center gap-2">
                <Calendar size={16} />{" "}
                {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
              </span>
              <span>By PitchAI News Bot</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mb-5">
        <div className="ratio ratio-21x9 overflow-hidden border border-secondary border-opacity-25">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="object-fit-cover shadow-lg"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="article-body fs-5 text-white-50 lh-lg"
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {/* This renders the 600-900 word text perfectly */}
              {article.content}
            </div>

            {/* Tags & Sharing */}
            <hr className="my-5 border-secondary border-opacity-25" />
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
              <div className="d-flex gap-2">
                {article.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="badge border border-secondary text-secondary rounded-0 px-3 py-2"
                  >
                    <Tag size={12} className="me-2" /> {tag}
                  </span>
                ))}
              </div>
              <button className="btn btn-outline-secondary rounded-0 d-flex align-items-center gap-2 px-4 py-2 hover-success">
                <Share2 size={18} /> Share News
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
