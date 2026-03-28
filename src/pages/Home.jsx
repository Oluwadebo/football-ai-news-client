// src/pages/Home.jsx - Optimized
import {
  ChevronDown,
  Loader2,
  MessageSquare,
  Search,
  Send,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/common/ArticleCard";
import { API_URLS } from "../config/api";

export default function Home({ articles = [] }) {
  const [standings, setStandings] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [leagueSearch, setLeagueSearch] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("Premier League");
  const [loading, setLoading] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const carouselArticles = useMemo(() => {
    const trending = articles.filter((a) => a.isTrending);
    const pool = trending.length >= 3 ? trending : articles;
    console.log(pool.slice(0, 6));

    return pool.slice(0, 6); // Max 6
  }, [articles]);

  // Memoized league filtering
  // const filteredLeagues = useMemo(
  //   () =>
  //     leagueData.filter((l) =>
  //       l.name.toLowerCase().includes(leagueSearch.toLowerCase()),
  //     ),
  //   [leagueSearch],
  // );
  const handleSearch = (e) => {
    if (e) e.preventDefault(); // Prevent page reload if wrapped in form
    if (leagueSearch.trim()) {
      setSelectedLeague(leagueSearch); // This triggers the useEffect below
      setLeagueSearch(""); // Clear input after search
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      // Trigger your search logic here
      console.log("Searching for:", leagueSearch);
      // If you have a filter function, call it here
    }
  };

  const fetchStandings = async (name) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URLS.standings}/${name}`);
      // const res = await fetch(`http://localhost:5000/api/standings/${name}`);
      const data = await res.json();
      if (data.table) {
        setStandings(data.table);
        setVisibleCount(10); // Reset count when league changes
        console.log(data.table);
      }
      // setStandings(data.table);
    } catch (err) {
      console.error("Standings error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings(selectedLeague);
  }, [selectedLeague]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  // const currentLeague =
  //   leagueData.find((l) => l.name === selectedLeague) || leagueData[0];

  // Memoized article filtering for tabs
  const filteredUpdates = useMemo(() => {
    if (activeTab === "all") return articles.slice(6);

    const tab = activeTab.toLowerCase();
    return articles.filter((a) => {
      const event = (a.eventType || "").toLowerCase();
      return event.includes(tab) || event === tab;
    });
  }, [articles, activeTab]);

  // const trendingArticles = useMemo(
  //   () =>
  //     articles.filter((a) => a.isTrending).slice(0, 3) || articles.slice(0, 3),
  //   [articles],
  // );

  return (
    <div className="bg-black min-vh-100">
      {/* Hero Carousel */}
      <section className="container-fluid px-0 mb-5">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <div className="carousel-indicators mb-4">
            {carouselArticles.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
              />
            ))}
          </div>
          <div className="carousel-inner">
            {carouselArticles.map((article, index) => (
              <div
                key={article.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                style={{ height: "75vh" }}
              >
                <div
                  className="position-absolute w-100 h-100 bg-gradient-to-t from-black via-black/40 to-transparent"
                  style={{ zIndex: 1 }}
                />
                <img
                  src={article.imageUrl}
                  className="d-block w-100 h-100 object-fit-cover"
                  alt={article.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/1200x675?text=PitchPulse+News";
                  }}
                  style={{
                    objectFit: "cover",
                    height: "500px",
                    filter: "brightness(0.6)", // Makes text more readable
                  }}
                />
                <div
                  className="carousel-caption text-start start-0 end-0 px-4 px-md-5 pb-5"
                  style={{ zIndex: 2 }}
                >
                  <div className="container">
                    <span className="badge bg-success text-black fw-black text-uppercase mb-3 px-3 py-2">
                      {article.isTrending ? "Breaking News" : article.eventType}
                    </span>
                    <h1
                      className="display-3 fw-black text-uppercase italic tracking-tighter lh-1 mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {article.title}
                    </h1>
                    <p className="lead  text-white-50 mb-4 d-none d-md-block max-w-2xl">
                      {article.summary}
                    </p>
                    <Link
                      to={`/article/${article.id}`}
                      className="btn btn-success rounded-0 fw-black text-uppercase px-4 py-2"
                    >
                      Read full story
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-4">
        <div className="row g-4">
          {/* Left Column - Feed */}
          <div className="col-12 col-lg-7">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
              <h2
                className="display-4 fw-black text-uppercase italic tracking-tighter mb-0"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                Latest <span className="text-success">Updates</span>
              </h2>

              <div className="d-flex gap-2 overflow-auto pb-2 no-scrollbar">
                {["all", "transfer", "match", "club"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`btn btn-sm rounded-0 text-uppercase fw-black tracking-widest px-3 py-2 ${
                      activeTab === tab
                        ? "btn-success text-black"
                        : "btn-outline-secondary text-white opacity-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-4">
              {filteredUpdates.length > 0 ? (
                filteredUpdates.slice(0, 6).map((article) => (
                  <div key={article.id} className="col-md-4">
                    <ArticleCard article={article} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5 border border-secondary border-dashed">
                  <p className="text-secondary  text-uppercase tracking-widest mb-0">
                    No {activeTab} news yet
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 text-center">
              <Link
                to="/news"
                className="btn btn-outline-success rounded-0 px-5 py-3 text-uppercase fw-black italic tracking-widest w-50"
              >
                Load More News
              </Link>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-12 col-lg-5">
            {/* League Table */}
            <div className="card bg-dark border-0 rounded-0 mb-5 overflow-hidden shadow-lg">
              <div className="card-header bg-success border-0 py-3 px-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0  text-uppercase italic text-white">
                    Live Standings: {selectedLeague}
                  </h6>
                </div>
                <div className="position-relative">
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control form-control-sm bg-black bg-opacity-25 border-0 text-white placeholder-dark rounded-0 w-90"
                      placeholder="Search league (e.g. La Liga)"
                      value={leagueSearch}
                      onChange={(e) => setLeagueSearch(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      className="btn btn-black text-white rounded-0 border-black"
                      onClick={handleSearch}
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                  <Loader2 className="animate-spin text-primary" size={40} />
                  <p className=" mt-2 text-uppercase small">
                    {selectedLeague} Table...
                  </p>
                </div>
              ) : (
                <div className="card-body p-0">
                  <table className="table table-dark table-hover mb-0 small">
                    <thead>
                      <tr className="text-secondary">
                        <th className="ps-3 text-center">#</th>
                        <th>Team</th>
                        <th className="text-center">P</th>
                        <th className="text-center">W</th>
                        <th className="text-center">D</th>
                        <th className="text-center">L</th>
                        <th className="text-center">GF</th>
                        <th className="text-center">GA</th>
                        <th className="text-center">GD</th>
                        <th className="pe-3 text-end">PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.slice(0, visibleCount).map((team, idx) => (
                        <tr
                          key={team.pos}
                          className="border-bottom border-secondary border-opacity-10"
                        >
                          <td className="ps-4 text-secondary text-center">
                            {String(idx + 1).padStart(2, "0")}
                          </td>
                          <td className="d-flex align-items-center gap-2 py-3 ">
                            <img src={team.logo} width="20" alt="" />
                            <span
                              className="text-truncate"
                              style={{ maxWidth: "100px" }}
                            >
                              {team.name}
                            </span>
                          </td>
                          <td className="text-center">{team.p}</td>
                          <td className="text-center small">{team.w}</td>{" "}
                          <td className="text-center small">{team.d}</td>{" "}
                          <td className="text-center small">{team.l}</td>{" "}
                          <td className="text-center x-small">{team.gf}</td>{" "}
                          <td className="text-center x-small ">{team.ga}</td>{" "}
                          <td className="text-center small">{team.gd}</td>
                          <td className="pe-3 text-end text-primary">
                            {team.pts}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {visibleCount < standings.length && (
                    <button
                      onClick={handleLoadMore}
                      // className="btn btn-black w-100 text-white rounded-0 mt-2 fw-black text-uppercase d-flex align-items-center justify-content-center gap-2"
                      className="btn btn-outline-success rounded-0 px-5 py-3 text-uppercase align-items-center justify-content-center text-white italic tracking-widest w-100 gap-2"
                    >
                      Load More <ChevronDown size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* RUMORS SECTION */}
            <div className="bg-dark p-4 border border-secondary mb-4">
              <h4 className="fw-black text-uppercase italic text-warning mb-3 d-flex align-items-center gap-2">
                <MessageSquare size={20} /> Wire Rumors
              </h4>
              <div className="small border-start border-warning border-3 ps-3 py-1 mb-3">
                <p className="mb-1 ">
                  Bayern Munich preparing €90m package for Theo Hernandez.
                </p>
                <span className="x-small text-secondary text-uppercase tracking-widest">
                  Source: Sky Germany
                </span>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="bg-success p-4 border border-black text-black">
              <h4 className="fw-black text-uppercase italic mb-2">
                Extra Time
              </h4>
              <p className="small  mb-3">
                Get the technical briefing in your inbox at 06:00 UTC.
              </p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control rounded-0 border-black bg-transparent placeholder-dark text-black "
                  placeholder="Email"
                />
                <button className="btn btn-dark rounded-0 px-3">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
