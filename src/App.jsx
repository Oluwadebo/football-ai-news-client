// src/App.jsx - Final Optimized Version
import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import ArticlePage from "./pages/ArticlePage";
import Category from "./pages/Category";
import Home from "./pages/Home";
import NewsArchive from "./pages/NewsArchive";
import { API_URLS } from "./config/api";

import "./index.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalArticles: 0,
    hasNext: false,
    hasPrev: false,
  });

  const [pendingNews, setPendingNews] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState({ automationEnabled: true });

  // Memoized fetch function
  const fetchArticles = useCallback(async (page = 1) => {
    try {
      const res = await fetch(`${API_URLS.articles}?page=${page}&limit=12`);
      const data = await res.json();
      console.log(data);
      

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
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }, []);

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paginationInfo.totalPages) {
      fetchArticles(newPage);
    }
  };

  const handleRefreshDiscovery = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(API_URLS.discover, { method: "POST" });
      const data = await response.json();
      if (response.ok) setPendingNews(data);
    } catch (error) {
      console.error("Discovery failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this article?\n\nThis action cannot be undone.",
    );

    if (!confirmed) return;

    try {
     const response = await fetch(API_URLS.deleteArticle(id), {
       method: "DELETE",
     });

      if (response.ok) {
        setArticles((prev) => prev.filter((article) => article.id !== id));
        alert("Article deleted successfully.");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Delete failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Network error. Please try again.");
    }
  };

  const handleToggleAutomation = (status) => {
    setSettings({ ...settings, automationEnabled: status });
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
                  onRefreshDiscovery={handleRefreshDiscovery}
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
