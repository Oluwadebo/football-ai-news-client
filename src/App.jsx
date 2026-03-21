// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// Components & Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import AdminPanel from "./pages/AdminPanel";
import Category from "./pages/Category";
import NewsArchive from "./pages/NewsArchive";

// Styles
import "./index.css";

function App() {
  // --- MOCK DATA: ARTICLES ---
  const [articles, setArticles] = useState([
    {
      id: "1",
      title: "Mbappe's 'Here We Go' Moment",
      summary: "The transfer saga finally reaches its conclusion...",
      content: "Full 600-word content here...",
      imageUrl: "https://picsum.photos/seed/mbappe/1200/675",
      publishedAt: new Date().toISOString(),
      eventType: "transfer",
      tags: ["Real Madrid", "Ligue 1"],
      isTrending: true,
    },
    {
      id: "2",
      title: "Arsenal's Title Charge: The Arteta Effect",
      summary:
        "A deep dive into the tactical genius behind the Gunners' recent form...",
      content: "600-word analysis here...",
      imageUrl: "https://picsum.photos/seed/arsenal/1200/675",
      publishedAt: new Date().toISOString(),
      eventType: "club-news",
      tags: ["Premier League", "Arsenal"],
      isTrending: true,
    },
    {
      id: "3",
      title: "Champions League: Real Madrid vs Man City Preview",
      summary:
        "The two giants meet again in the quarter-finals. Here is everything you need to know...",
      content:
        "Tactical breakdowns, predicted lineups, and key player matchups for the biggest game of the season...",
      imageUrl: "https://picsum.photos/seed/ucl/1200/675",
      publishedAt: new Date().toISOString(),
      eventType: "match",
      tags: ["UCL", "Real Madrid", "Man City"],
      isTrending: false,
    },
  ]);

  // --- MOCK DATA: PENDING QUEUE ---
  const [pendingNews, setPendingNews] = useState([
    {
      id: "p1",
      title: "Man City prepare record bid for Jamal Musiala",
      content:
        "Pep Guardiola has identified Musiala as the top target for the summer. Internal talks are ongoing...",
      source: "The Athletic",
      score: 5,
      status: "discovered",
      discoveredAt: new Date().toISOString(),
    },
    {
      id: "p2",
      title: "Victor Osimhen release clause details leaked",
      content:
        "New documents suggest the release clause for the Nigerian star is slightly lower for Premier League clubs...",
      source: "Fabrizio Romano",
      score: 4,
      status: "discovered",
      discoveredAt: new Date().toISOString(),
    },
    {
      id: "p3",
      title: "Mo Salah contract talks hit unexpected delay",
      content:
        "Liverpool and Salah are still apart on the final structure of the deal. No agreement imminent.",
      source: "Sky Sports",
      score: 3,
      status: "discovered",
      discoveredAt: new Date().toISOString(),
    },
  ]);

  const [notifications, setNotifications] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState({ automationEnabled: true });

  // Handlers
  // const handleDelete = (id) => {
  //   setPendingNews((prev) => prev.filter((item) => item.id !== id));
  // };
  // 1. Refresh Discovery (Triggers the AI Scraper)
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

  // 2. Delete Live Article (Removes from MongoDB)
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

  // --- BACKEND READINESS ---
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/articles");
        const data = await res.json();
        console.log("🔥 PITCHPULSE DATA RECEIVED:", data);
        // const res = await axios.get("/api/articles");
        // Only update if we actually get valid data back from a running server
        if (data && Array.isArray(data) && data.length > 0) {
          setArticles(data);
        }
      } catch (err) {
        // Silent catch: If backend is down, we keep the mock data above
        console.warn("Backend not reachable. Using local mock data.", err);
      }
    };
    fetchArticles();
  }, []);

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
              element={<NewsArchive allArticles={articles} />}
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
