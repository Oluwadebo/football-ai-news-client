// src/App.jsx
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import axios from "axios";

// Components & Pages
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import ArticlePage from "./pages/ArticlePage";
import Category from "./pages/Category";
import Home from "./pages/Home";
import NewsArchive from "./pages/NewsArchive";

// Styles
import "./index.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [pendingNews, setPendingNews] = useState([]);
  // const [notifications, setNotifications] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState({ automationEnabled: true });

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalArticles: 0,
    hasNext: false,
    hasPrev: false,
  });

  const handleRefreshDiscovery = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:5000/api/discover-news", {
        method: "POST", // Usually a POST because you're triggering an action
      });
      const data = await response.json();

      if (response.ok) {
        setPendingNews(data); // Update the queue with fresh discoveries
      }
    } catch (error) {
      console.error("AI Agent unreachable:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    // Brutalist confirmation
    if (!window.confirm("CONFIRM DELETION: THIS ACTION IS PERMANENT.")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Optimistic UI update: remove from local state immediately
        setArticles((prev) => prev.filter((article) => article.id !== id));
      } else {
        alert("System Error: Failed to delete article.");
      }
    } catch (error) {
      console.error("Database Error:", error);
    }
  };

  const handleToggleAutomation = (status) => {
    setSettings({ ...settings, automationEnabled: status });
  };

  const fetchArticles = async (page = 1) => {
    try {
      // const res = await fetch("http://localhost:5000/api/articles");
      const res = await fetch(
        `http://localhost:5000/api/articles?page=${page}&limit=12`,
      );
      const data = await res.json();

      if (res.ok && Array.isArray(data.articles)) {
        setArticles(data.articles);
        setPaginationInfo({
          totalPages: data.pagination.totalPages,
          totalArticles: data.pagination.totalArticles,
          hasNext: data.pagination.hasNext,
          hasPrev: data.pagination.hasPrev,
        });
        setCurrentPage(page);
        console.log(`Page ${page} loaded: ${data.articles.length} articles`);
        console.log("🔥 Live News Loaded:", data.length);
        console.log("🔥 Live News Loaded:", data);
      }
    } catch (err) {
      console.warn("Backend not reachable. Using local mock data.", err);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paginationInfo.totalPages) {
      fetchArticles(newPage);
    }
  };

  return (
    <Router>
      <div className="bg-black text-white min-vh-100 font-sans">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home articles={articles} />} />

            <Route
              path="/article/:id"
              element={<ArticlePage articles={articles} />}
            />
            <Route
              path="/news"
              element={
                <NewsArchive
                  articles={articles}
                  currentPage={currentPage}
                  paginationInfo={paginationInfo}
                  onPageChange={handlePageChange}
                />
              }
            />
            <Route
              path="/category/:category"
              element={<Category articles={articles} />}
            />

            <Route
              path="/admin"
              element={
                <AdminPanel
                  articles={articles}
                  pendingNews={pendingNews}
                  settings={settings}
                  onDelete={handleDelete}
                  onToggleAutomation={handleToggleAutomation}
                  isProcessing={isProcessing}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
