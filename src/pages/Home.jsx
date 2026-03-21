import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ChevronRight, Calendar, Search } from "lucide-react";
import { motion } from "motion/react";
import ArticleCard from "../components/common/ArticleCard";

export default function Home({ articles = [] }) {
  if (!articles || !Array.isArray(articles)) return null;
  const trendingArticles = articles.filter((a) => a.isTrending).slice(0, 3);
  const latestArticles = articles.slice(0, 10);

  return (
    <div className="bg-black min-vh-100">
      {/* --- HERO CAROUSEL SECTION --- */}
      <section className="container-fluid px-0 mb-5">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-indicators mb-4">
            {trendingArticles.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "0" /* Square for that sharp tech look */,
                  backgroundColor: "#198754" /* Neon Green */,
                  border: "2px solid black",
                  margin: "0 6px",
                }}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {trendingArticles.map((article, index) => (
              <div
                key={article.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                style={{ height: "70vh" }}
              >
                <div className="position-absolute w-100 h-100 bg-gradient-to-t from-black via-transparent to-transparent z-1"></div>
                <img
                  src={article.imageUrl}
                  className="d-block w-100 h-100 object-fit-cover"
                  alt={article.title}
                />
                <div className="carousel-caption text-start start-0 end-0 px-4 px-md-5 pb-5 z-2">
                  <div className="container">
                    <span className="badge bg-success text-black fw-black text-uppercase mb-3 px-3 py-2">
                      Trending
                    </span>
                    <h1 className="display-3 fw-black text-uppercase italic tracking-tighter lh-1 mb-3">
                      {article.title}
                    </h1>
                    <p className="lead fw-bold text-white-50 mb-4 d-none d-md-block">
                      {article.summary}
                    </p>
                    <Link
                      to={`/article/${article.id}`}
                      className="btn btn-success rounded-0 fw-black text-uppercase px-4 py-2"
                    >
                      Read Story
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="container">
        <div className="row g-5">
          {/* Left Column: Feed */}
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-3 mb-5">
              <div className="bg-success p-2">
                <TrendingUp size={24} className="text-black" />
              </div>
              <h2 className="display-6 fw-black text-uppercase italic tracking-tighter mb-0">
                The <span className="text-success">Feed</span>
              </h2>
            </div>

            <div className="row g-4">
              {latestArticles.map((article) => (
                <div key={article.id} className="col-12">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar (League Table & Tags) */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "100px" }}>
              {/* League Table Mockup */}
              <div className="bg-dark border border-secondary p-4 mb-4">
                <h4 className="fw-black text-uppercase italic tracking-tighter mb-4 border-bottom border-secondary pb-2">
                  Premier <span className="text-success">League</span>
                </h4>
                <div className="small fw-bold text-uppercase tracking-widest text-secondary d-flex justify-content-between mb-2 px-2">
                  <span>Team</span>
                  <span>PTS</span>
                </div>
                {[
                  { name: "Liverpool", pts: 67 },
                  { name: "Man City", pts: 64 },
                  { name: "Arsenal", pts: 64 },
                ].map((team, i) => (
                  <div
                    key={team.name}
                    className="d-flex justify-content-between align-items-center p-2 mb-1 bg-black border border-secondary border-opacity-25"
                  >
                    <span className="fw-black">
                      {i + 1}. {team.name}
                    </span>
                    <span className="text-success">{team.pts}</span>
                  </div>
                ))}
              </div>

              {/* Tags Cloud */}
              <div className="bg-dark border border-secondary p-4">
                <h4 className="fw-black text-uppercase italic tracking-tighter mb-4">
                  Hot <span className="text-success">Topics</span>
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {["Transfer", "Champions League", "Injury", "Contract"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="badge border border-secondary text-secondary rounded-0 p-2 hover-success cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
