// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import AdminPanel from "./pages/AdminPanel";
import axios from "axios";
import Category from "./pages/Category";

// Import your custom CSS for the "Black/Success" vibe
import "./index.css";

function App() {
  // const [articles, setArticles] = useState([]);
  // src/App.jsx

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
      eventType: "match", // This matches your Navbar path: /category/match
      tags: ["UCL", "Real Madrid", "Man City"],
      isTrending: false,
    },
  ]);
  // src/App.jsx - Update your state variables
  // const [pendingNews, setPendingNews] = useState([]); // Added this
  const [pendingNews, setPendingNews] = useState([
    {
      id: "p1",
      title: "Man City prepare record bid for Jamal Musiala",
      content:
        "Pep Guardiola has identified Musiala as the top target for the summer. Internal talks are ongoing...",
      source: "The Athletic",
      score: 5, // High score for big news
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
  const [notifications, setNotifications] = useState([]); // Added this
  const [isProcessing, setIsProcessing] = useState(false); // Added this
  const [settings, setSettings] = useState({ automationEnabled: true });

  const handleDelete = (id) => {
    setPendingNews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleAutomation = (status) => {
    setSettings({ ...settings, automationEnabled: status });
  };
  // Fetch articles from your Node backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("/api/articles");
        // setArticles(res.data);
        // setArticles(Array.isArray(res.data) ? res.data : []);
        if (res.data && Array.isArray(res.data)) {
          setArticles(res.data);
        }
      } catch (err) {
        console.warn("Backend not connected yet. Showing local state.");
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
