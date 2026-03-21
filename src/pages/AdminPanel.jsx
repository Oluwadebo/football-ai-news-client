import React from "react";
import {
  Settings,
  Bell,
  Trash2,
  RefreshCw,
  Plus,
  CheckCircle,
  AlertCircle,
  Zap,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AdminPanel({
  pendingNews,
  articles,
  settings,
  onToggleAutomation,
  onDelete,
  onRefreshDiscovery,
  isProcessing,
}) {
  return (
    <div className="container py-5">
      {/* Header & Automation Toggle */}
      <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary pb-4">
        <div>
          <h1 className="fw-black text-uppercase italic tracking-tighter mb-1">
            Control <span className="text-success">Center</span>
          </h1>
          <p className="text-secondary small fw-bold text-uppercase tracking-widest mb-0">
            System Status:{" "}
            <span
              className={
                settings.automationEnabled ? "text-success" : "text-danger"
              }
            >
              {settings.automationEnabled ? "FULLY AUTOMATED" : "PAUSED"}
            </span>
          </p>
        </div>
        <div className="form-check form-switch bg-dark p-3 border border-secondary">
          <label className="form-check-label me-5 fw-black text-uppercase small">
            Auto-Publish
          </label>
          <input
            className="form-check-input ms-0"
            type="checkbox"
            checked={settings.automationEnabled}
            onChange={(e) => onToggleAutomation(e.target.checked)}
          />
        </div>
      </div>

      <div className="row g-4">
        {/* News Discovery Queue */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-black text-uppercase italic tracking-tighter mb-0">
              Trend <span className="text-success">Queue</span>
            </h3>
            <button
              onClick={onRefreshDiscovery}
              className="btn btn-outline-secondary btn-sm rounded-0"
            >
              <RefreshCw
                size={14}
                className={`me-2 ${isProcessing ? "spin" : ""}`}
              />
              Scan Sources
            </button>
          </div>

          <div className="list-group gap-3">
            <AnimatePresence>
              {pendingNews.map((news) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="list-group-item bg-dark border-secondary p-4 rounded-0"
                >
                  <div className="d-flex justify-content-between">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span
                          className={`badge ${news.score >= 4 ? "bg-success" : "bg-warning"} text-black fw-black rounded-0`}
                        >
                          SCORE: +{news.score}
                        </span>
                        <span className="text-secondary x-small fw-bold text-uppercase">
                          {news.source}
                        </span>
                      </div>
                      <h5 className="fw-bold text-white mb-2">{news.title}</h5>
                      <p className="text-secondary small mb-0">
                        {news.content.substring(0, 120)}...
                      </p>
                    </div>
                    <div className="d-flex flex-column gap-2 ms-4">
                      <button className="btn btn-success btn-sm rounded-0 text-black fw-black">
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(news.id)}
                        className="btn btn-outline-danger btn-sm rounded-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* System Logs & Stats */}
        <div className="col-lg-4">
          <div className="bg-dark border border-secondary p-4 mb-4">
            <h4 className="fw-black text-uppercase italic tracking-tighter mb-4 border-bottom border-secondary pb-2">
              Live <span className="text-success">Stats</span>
            </h4>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary small fw-bold">
                PUBLISHED ARTICLES
              </span>
              <span className="fw-black">{articles.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary small fw-bold">
                AI GENERATIONS (24H)
              </span>
              <span className="fw-black text-success">12</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-secondary small fw-bold">API STATUS</span>
              <span className="text-success fw-black small">HEALTHY</span>
            </div>
          </div>

          <div className="bg-dark border border-secondary p-4">
            <h4 className="fw-black text-uppercase italic tracking-tighter mb-4 border-bottom border-secondary pb-2">
              Recent <span className="text-success">Activity</span>
            </h4>
            <div className="small fw-bold text-uppercase tracking-widest text-secondary">
              <p className="mb-2 border-start border-success ps-2 py-1 bg-black bg-opacity-50">
                [16:05] AI Rewriting "Mbappe Transfer..."
              </p>
              <p className="mb-2 border-start border-secondary ps-2 py-1">
                [15:40] Scanned 12 RSS feeds
              </p>
              <p className="mb-0 border-start border-success ps-2 py-1 bg-black bg-opacity-50">
                [15:10] Image Gen successful for "Arteta Interview"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
