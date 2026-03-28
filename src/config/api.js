// src/config/api.js

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://football-ai-news-server.onrender.com" // ← Change this when deploying
    : "http://localhost:5000";

export const API_URLS = {
  articles: `${API_BASE_URL}/api/articles`,
  discover: `${API_BASE_URL}/api/discover-news`,
  deleteArticle: (id) => `${API_BASE_URL}/api/articles/${id}`,
  adminRunNow: `${API_BASE_URL}/api/admin/run-now`,
  toggleAutomation: `${API_BASE_URL}/api/admin/toggle-automation`,
  pending: `${API_BASE_URL}/api/admin/pending`,
  standings: `${API_BASE_URL}/api/standings`,
};

export default API_BASE_URL;
