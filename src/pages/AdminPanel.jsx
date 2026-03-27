// src/pages/AdminPanel.jsx
import React from "react";
import {
  TrendingUp,
  Trash2,
  RefreshCw,
  Bell,
  Zap,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";

const AdminPanel = ({
  articles = [],
  pendingNews = [],
  settings = { automationEnabled: false },
  onDelete,
  onToggleAutomation,
  onRefreshDiscovery,
  isProcessing,
}) => {
  const safeFormat = (dateString) => {
    try {
      return dateString ? format(new Date(dateString), "HH:mm") : "--:--";
    } catch {
      return "00:00";
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 mb-5">
        <div>
          <h1 className="display-4 fw-black text-uppercase italic tracking-tighter mb-1">
            Admin Automation <span className="text-success">CENTER</span>
          </h1>
          <p
            className={`text-uppercase fw-bold tracking-widest small mb-0 ${isProcessing ? "status-active" : "text-secondary"}`}
          >
            System Status: {isProcessing ? "SCANNING..." : "IDLE"}
          </p>
        </div>

        <div className="d-flex gap-3">
          <button
            onClick={onRefreshDiscovery}
            disabled={isProcessing}
            className="btn btn-outline-secondary rounded-0 fw-black text-uppercase px-4 d-flex align-items-center gap-2"
          >
            <RefreshCw
              size={18}
              className={isProcessing ? "animate-spin" : ""}
            />
            Refresh Queue
          </button>
          <button
            onClick={() => onToggleAutomation(!settings.automationEnabled)}
            className={`btn ${settings.automationEnabled ? "btn-success text-black" : "btn-outline-success"} rounded-0 fw-black text-uppercase px-4 d-flex align-items-center gap-2`}
          >
            <Zap
              size={18}
              fill={settings.automationEnabled ? "currentColor" : "none"}
            />
            {settings.automationEnabled ? "AUTOMATION ON" : "ENABLE AUTO"}
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Intelligence Queue */}
        <div className="col-lg-8">
          <div className="bg-dark border border-secondary p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-4">
              <TrendingUp className="text-success" size={20} />
              <h3 className="fw-black text-uppercase italic mb-0 h4">
                Intelligence Queue
              </h3>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle">
                <thead>
                  <tr className="text-secondary x-small fw-black text-uppercase tracking-widest border-bottom border-secondary">
                    <th>Source</th>
                    <th>News Title</th>
                    <th className="text-center">Score</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingNews.length > 0 ? (
                    pendingNews.map((item) => (
                      <tr
                        key={item.id}
                        className="border-bottom border-secondary-subtle"
                      >
                        <td className="small fw-bold text-success">
                          {item.source}
                        </td>
                        <td className="fw-bold small">{item.title}</td>
                        <td className="text-center">
                          <span
                            className={`badge rounded-0 ${item.score > 80 ? "bg-danger" : "bg-secondary"}`}
                          >
                            {item.score}
                          </span>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-link text-white p-0 me-2">
                            <ExternalLink size={16} />
                          </button>
                          <button className="btn btn-link text-danger p-0">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-5 text-secondary fw-bold"
                      >
                        {isProcessing ? "Scanning feeds..." : "Queue is empty"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Impact Alerts */}
        <div className="col-lg-4">
          <div className="bg-dark border border-secondary p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Bell className="text-success" size={20} />
              <h3 className="fw-black text-uppercase italic mb-0 h4">
                Impact Alerts
              </h3>
            </div>
            <div className="p-3 border-start border-success bg-black border-2 text-secondary small">
              No alerts at the moment
            </div>
          </div>
        </div>
      </div>

      {/* Live Database - Show more articles */}
      <div className="mt-5">
        <h3 className="fw-black text-uppercase italic mb-4">
          Live Database ({articles.length} articles)
        </h3>
        <div className="row g-3">
          {(articles || []).map((article) => (
            <div key={article.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="bg-dark p-3 border border-secondary h-100 d-flex flex-column">
                <div className="fw-bold text-white mb-2 line-clamp-2">
                  {article.title}
                </div>
                <div className="text-secondary x-small mb-3">
                  {article.eventType} • {safeFormat(article.publishedAt)}
                </div>
                <button
                  onClick={() => onDelete(article.id)}
                  className="btn btn-sm btn-outline-danger mt-auto"
                >
                  <Trash2 size={16} className="me-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
