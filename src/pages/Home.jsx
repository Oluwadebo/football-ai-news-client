import { MessageSquare, Search, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/common/ArticleCard";

export default function Home({ articles = [] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [leagueSearch, setLeagueSearch] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("Premier League");

  // --- RESTRUCTURED LEAGUE DATA ---
  const leagueData = [
    {
      name: "Premier League",
      teams: [
        { pos: "01", name: "Man City", p: 28, pts: 65 },
        { pos: "02", name: "Arsenal", p: 28, pts: 64 },
        { pos: "03", name: "Liverpool", p: 28, pts: 63 },
      ],
    },
    {
      name: "Ligue 1",
      teams: [
        { pos: "01", name: "PSG", p: 25, pts: 59 },
        { pos: "02", name: "Brest", p: 25, pts: 46 },
        { pos: "03", name: "Monaco", p: 25, pts: 45 },
      ],
    },
    {
      name: "La Liga",
      teams: [
        { pos: "01", name: "Real Madrid", p: 28, pts: 72 },
        { pos: "02", name: "Girona", p: 28, pts: 65 },
        { pos: "03", name: "Barcelona", p: 28, pts: 64 },
      ],
    },
  ];

  // 1. FILTER LOGIC FOR SEARCH
  const filteredLeagues = leagueData.filter((l) =>
    l.name.toLowerCase().includes(leagueSearch.toLowerCase()),
  );

  // Get current league object based on selection
  const currentLeague =
    leagueData.find((l) => l.name === selectedLeague) || leagueData[0];

  const activeLeague = leagueData.find((l) => l.name === selectedLeague);

  // 2. ARTICLE FILTERING
  const filteredUpdates = articles.filter((a) => {
    if (activeTab === "all") return true;
    return a.eventType.toLowerCase().includes(activeTab.toLowerCase());
  });

  const filteredTeams =
    activeLeague?.teams.filter((team) =>
      team.name.toLowerCase().includes(leagueSearch.toLowerCase()),
    ) || [];

  if (!articles || !Array.isArray(articles)) return null;

  const trendingArticles =
    articles.filter((a) => a.isTrending).length > 0
      ? articles.filter((a) => a.isTrending).slice(0, 3)
      : articles.slice(0, 3);

  return (
    <div className="bg-black min-vh-100">
      {/* --- HERO CAROUSEL SECTION --- */}
      <section className="container-fluid px-0 mb-5">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <div className="carousel-indicators mb-4">
            {trendingArticles.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "0",
                  backgroundColor: "#198754",
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
                style={{ height: "75vh" }}
              >
                <div
                  className="position-absolute w-100 h-100 bg-gradient-to-t from-black via-black/40 to-transparent"
                  style={{ zIndex: 1 }}
                ></div>
                <img
                  src={article.imageUrl}
                  className="d-block w-100 h-100 object-fit-cover"
                  alt={article.title}
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
                    <p className="lead fw-bold text-white-50 mb-4 d-none d-md-block max-w-2xl">
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

      {/* --- MAIN CONTENT GRID --- */}
      <div className="container py-4">
        <div className="row g-4">
          {/* Left Column: Feed */}
          <div className="col-12 col-lg-8">
            {/* Header with Category Tabs */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
              <h2
                className="display-4 fw-black text-uppercase italic tracking-tighter mb-0"
                style={{ fontFamily: "'Anton', sans-serif", lineHeight: "0.8" }}
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

            <div className="row g-3">
              {filteredUpdates.length > 0 ? (
                filteredUpdates.slice(0, 6).map((article) => (
                  <div key={article.id} className="col-md-4">
                    <ArticleCard article={article} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5 border border-secondary border-dashed">
                  <p className="text-secondary fw-bold text-uppercase tracking-widest mb-0">
                    No {activeTab} news yet <br /> Check back soon or try
                    another tab
                  </p>
                </div>
              )}
            </div>
            {/* Bottom of Left Column Feed */}
            <div className="mt-5 text-center">
              <Link
                to="/news"
                className="btn btn-outline-success rounded-0 px-5 py-3 text-uppercase fw-black italic tracking-widest w-50 transition-all hover-bg-success hover-text-black"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  borderWidth: "2px",
                }}
              >
                load more News
              </Link>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="col-12 col-lg-4">
            {/* League Table Mock */}
            <div className="card bg-dark border-0 rounded-0 mb-5 overflow-hidden shadow-lg">
              <div className="card-header bg-success border-0 py-3 px-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0 fw-black text-uppercase italic text-black">
                    {selectedLeague}
                  </h6>
                  <Search size={16} className="text-black opacity-50" />
                </div>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-sm bg-black bg-opacity-25 border-0 text-black placeholder-dark rounded-0 fw-bold"
                    placeholder="Search League (e.g. La Liga)..."
                    value={leagueSearch}
                    onChange={(e) => setLeagueSearch(e.target.value)}
                  />
                  {leagueSearch && (
                    <div className="position-absolute top-100 start-0 w-100 bg-dark shadow-xl z-50 mt-1 border border-secondary">
                      {filteredLeagues.map((l) => (
                        <button
                          key={l.name}
                          className="btn btn-dark w-100 text-start rounded-0 border-0 border-bottom border-secondary py-2 small fw-bold text-success"
                          onClick={() => {
                            setSelectedLeague(l.name);
                            setLeagueSearch("");
                          }}
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="card-body p-0">
                <table className="table table-dark table-hover mb-0 small">
                  <thead>
                    <tr
                      className="text-secondary"
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <th className="ps-4 border-0 opacity-50">#</th>
                      <th className="border-0 opacity-50">Team</th>
                      <th className="border-0 opacity-50 text-center">P</th>
                      <th className="pe-4 border-0 text-end opacity-50">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeague.teams.map((team, idx) => (
                      <tr
                        key={team.name}
                        className="border-bottom border-secondary border-opacity-10"
                      >
                        <td className="ps-4 align-middle text-secondary fw-bold">
                          {String(idx + 1).padStart(2, "0")}
                        </td>
                        <td className="py-3">
                          <span className="fw-bold d-block text-white mb-0">
                            {team.name}
                          </span>
                          {/* <span className="text-success fw-black text-uppercase x-small tracking-widest">
                            {selectedLeague}
                          </span> */}
                        </td>
                        <td className="align-middle text-center fw-bold">
                          {team.p}
                        </td>
                        <td className="pe-4 align-middle text-end fw-black text-success fs-6">
                          {team.pts}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer bg-transparent border-top border-secondary text-center py-3">
                <Link
                  to="/"
                  className="text-success text-decoration-none x-small fw-black text-uppercase tracking-widest"
                >
                  Full Standings &rarr;
                </Link>
              </div>
            </div>

            {/* RUMORS SECTION */}
            <div className="bg-dark p-4 border border-secondary mb-4">
              <h4 className="fw-black text-uppercase italic text-warning mb-3 d-flex align-items-center gap-2">
                <MessageSquare size={20} /> Wire Rumors
              </h4>
              <div className="small border-start border-warning border-3 ps-3 py-1 mb-3">
                <p className="mb-1 fw-bold">
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
              <p className="small fw-bold mb-3">
                Get the technical briefing in your inbox at 06:00 UTC.
              </p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control rounded-0 border-black bg-transparent placeholder-dark text-black fw-bold"
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
